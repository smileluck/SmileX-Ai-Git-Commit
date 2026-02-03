import * as vscode from 'vscode';
import { GitAnalyzer } from './analyzer/gitAnalyzer';
import { CodeGrouper } from './grouper/codeGrouper';
import { CommitMessageGenerator } from './generator/commitMessageGenerator';
import { GitTraeIntegrator } from './integrator/gitTraeIntegrator';
import { cacheManager } from './utils/cacheManager';
import { progressManager } from './utils/progressManager';

/**
 * Trae Git Commit 插件入口
 * 用于智能分析代码变更并生成符合规范的git提交消息
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('Git Commit Assistant 插件已激活');

    // 初始化集成器
    const integrator = new GitTraeIntegrator();

    // 注册分析命令
    const analyzeCommand = vscode.commands.registerCommand('smilex-git-commit.analyze', async () => {
        try {
            // 检查git安装状态
            const isGitInstalled = await integrator.isGitInstalled();
            if (!isGitInstalled) {
                vscode.window.showErrorMessage('未安装git，请先安装git');
                return;
            }

            // 检查是否在git仓库中
            const isInRepo = await integrator.isInGitRepository();
            if (!isInRepo) {
                vscode.window.showErrorMessage('当前目录不是git仓库');
                return;
            }

            // 使用进度管理器显示分析进度
            await progressManager.showAnalysisProgress(async (progress) => {
                // 检查缓存
                const cacheKey = 'git-changes-' + Date.now().toString().slice(0, -3);
                const cachedResult = cacheManager.get<{ changes: any[], groups: any[], messages: string[] }>(cacheKey);
                
                if (cachedResult) {
                    progress.report({ message: '使用缓存结果', increment: 100 });
                    vscode.window.showInformationMessage(`分析完成，找到 ${cachedResult.changes.length} 个变更，分为 ${cachedResult.groups.length} 组`);
                    console.log('生成的提交消息:', cachedResult.messages);
                    return;
                }

                progress.report({ message: '分析代码变更...', increment: 20 });
                // 初始化分析器
                const analyzer = new GitAnalyzer();
                
                // 分析代码变更
                const changes = await analyzer.analyzeChanges();
                
                // 检查是否有变更
                if (changes.length === 0) {
                    vscode.window.showInformationMessage('没有发现代码变更');
                    return;
                }
                
                progress.report({ message: '智能分组...', increment: 50 });
                // 初始化分组器
                const grouper = new CodeGrouper();
                
                // 智能分组
                const groups = grouper.groupChanges(changes);
                
                progress.report({ message: '生成提交消息...', increment: 80 });
                // 初始化消息生成器
                const generator = new CommitMessageGenerator();
                
                // 生成提交消息
                const messages = await generator.generateMessages(groups);
                
                progress.report({ message: '完成', increment: 100 });
                // 缓存结果
                cacheManager.set(cacheKey, { changes, groups, messages });
                
                // 显示结果
                vscode.window.showInformationMessage(`分析完成，找到 ${changes.length} 个变更，分为 ${groups.length} 组`);
                console.log('生成的提交消息:', messages);
            });
        } catch (error) {
            console.error('分析失败:', error);
            vscode.window.showErrorMessage(`分析失败: ${error instanceof Error ? error.message : String(error)}`);
        }
    });

    // 注册提交命令
    const commitCommand = vscode.commands.registerCommand('smilex-git-commit.commit', async () => {
        try {
            // 检查git安装状态
            const isGitInstalled = await integrator.isGitInstalled();
            if (!isGitInstalled) {
                vscode.window.showErrorMessage('未安装git，请先安装git');
                return;
            }

            // 检查是否在git仓库中
            const isInRepo = await integrator.isInGitRepository();
            if (!isInRepo) {
                // 询问是否初始化git仓库
                const initResult = await vscode.window.showInformationMessage(
                    '当前目录不是git仓库，是否初始化？',
                    '初始化',
                    '取消'
                );
                
                if (initResult === '初始化') {
                    await integrator.initGitRepository();
                    vscode.window.showInformationMessage('git仓库初始化成功');
                } else {
                    return;
                }
            }

            // 使用进度管理器显示提交进度
            await progressManager.showCommitProgress(async (progress) => {
                progress.report({ message: '分析代码变更...', increment: 20 });
                // 初始化分析器
                const analyzer = new GitAnalyzer();
                
                // 分析代码变更
                const changes = await analyzer.analyzeChanges();
                
                // 检查是否有变更
                if (changes.length === 0) {
                    vscode.window.showInformationMessage('没有发现代码变更');
                    return;
                }
                
                progress.report({ message: '暂存变更...', increment: 30 });
                // 暂存所有变更
                await integrator.stageAllChanges();
                
                progress.report({ message: '智能分组...', increment: 40 });
                // 初始化分组器
                const grouper = new CodeGrouper();
                
                // 智能分组
                const groups = grouper.groupChanges(changes);
                
                progress.report({ message: '生成提交消息...', increment: 60 });
                // 初始化消息生成器
                const generator = new CommitMessageGenerator();
                
                // 生成提交消息
                const messages = await generator.generateMessages(groups);
                
                // 显示提交预览
                const shouldCommit = await integrator.showCommitPreview(messages);
                if (!shouldCommit) {
                    return;
                }
                
                progress.report({ message: '执行提交...', increment: 80 });
                // 执行提交
                for (const message of messages) {
                    await integrator.executeGitCommit(message);
                }
                
                progress.report({ message: '完成', increment: 100 });
                // 清空缓存
                cacheManager.clear();
                
                // 询问是否推送
                const pushResult = await vscode.window.showInformationMessage(
                    `提交完成，共提交 ${messages.length} 个分组，是否推送到远程仓库？`,
                    '推送',
                    '取消'
                );
                
                if (pushResult === '推送') {
                    const branch = await integrator.getCurrentBranch();
                    try {
                        await integrator.pushChanges(branch);
                        vscode.window.showInformationMessage('推送成功');
                    } catch (error) {
                        console.error('推送失败:', error);
                        vscode.window.showErrorMessage(`推送失败: ${error instanceof Error ? error.message : String(error)}`);
                    }
                }
            });
        } catch (error) {
            console.error('提交失败:', error);
            vscode.window.showErrorMessage(`提交失败: ${error instanceof Error ? error.message : String(error)}`);
        }
    });

    // 注册Trae命令
    integrator.registerTraeCommands(context);

    // 订阅命令
    context.subscriptions.push(analyzeCommand);
    context.subscriptions.push(commitCommand);
}

export function deactivate() {
    console.log('Git Commit Assistant 插件已停用');
}