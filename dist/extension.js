"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const gitAnalyzer_1 = require("./analyzer/gitAnalyzer");
const codeGrouper_1 = require("./grouper/codeGrouper");
const commitMessageGenerator_1 = require("./generator/commitMessageGenerator");
const gitTraeIntegrator_1 = require("./integrator/gitTraeIntegrator");
const cacheManager_1 = require("./utils/cacheManager");
const progressManager_1 = require("./utils/progressManager");
/**
 * Trae Git Commit 插件入口
 * 用于智能分析代码变更并生成符合规范的git提交消息
 */
function activate(context) {
    console.log('Git Commit Assistant 插件已激活');
    // 初始化集成器
    const integrator = new gitTraeIntegrator_1.GitTraeIntegrator();
    // 注册分析命令
    const analyzeCommand = vscode.commands.registerCommand('smilex-git-commit.analyze', () => __awaiter(this, void 0, void 0, function* () {
        try {
            // 检查git安装状态
            const isGitInstalled = yield integrator.isGitInstalled();
            if (!isGitInstalled) {
                vscode.window.showErrorMessage('未安装git，请先安装git');
                return;
            }
            // 检查是否在git仓库中
            const isInRepo = yield integrator.isInGitRepository();
            if (!isInRepo) {
                vscode.window.showErrorMessage('当前目录不是git仓库');
                return;
            }
            // 使用进度管理器显示分析进度
            yield progressManager_1.progressManager.showAnalysisProgress((progress) => __awaiter(this, void 0, void 0, function* () {
                // 检查缓存
                const cacheKey = 'git-changes-' + Date.now().toString().slice(0, -3);
                const cachedResult = cacheManager_1.cacheManager.get(cacheKey);
                if (cachedResult) {
                    progress.report({ message: '使用缓存结果', increment: 100 });
                    vscode.window.showInformationMessage(`分析完成，找到 ${cachedResult.changes.length} 个变更，分为 ${cachedResult.groups.length} 组`);
                    console.log('生成的提交消息:', cachedResult.messages);
                    return;
                }
                progress.report({ message: '分析代码变更...', increment: 20 });
                // 初始化分析器
                const analyzer = new gitAnalyzer_1.GitAnalyzer();
                // 分析代码变更
                const changes = yield analyzer.analyzeChanges();
                // 检查是否有变更
                if (changes.length === 0) {
                    vscode.window.showInformationMessage('没有发现代码变更');
                    return;
                }
                progress.report({ message: '智能分组...', increment: 50 });
                // 初始化分组器
                const grouper = new codeGrouper_1.CodeGrouper();
                // 智能分组
                const groups = grouper.groupChanges(changes);
                progress.report({ message: '生成提交消息...', increment: 80 });
                // 初始化消息生成器
                const generator = new commitMessageGenerator_1.CommitMessageGenerator();
                // 生成提交消息
                const messages = yield generator.generateMessages(groups);
                progress.report({ message: '完成', increment: 100 });
                // 缓存结果
                cacheManager_1.cacheManager.set(cacheKey, { changes, groups, messages });
                // 显示结果
                vscode.window.showInformationMessage(`分析完成，找到 ${changes.length} 个变更，分为 ${groups.length} 组`);
                console.log('生成的提交消息:', messages);
            }));
        }
        catch (error) {
            console.error('分析失败:', error);
            vscode.window.showErrorMessage(`分析失败: ${error instanceof Error ? error.message : String(error)}`);
        }
    }));
    // 注册提交命令
    const commitCommand = vscode.commands.registerCommand('smilex-git-commit.commit', () => __awaiter(this, void 0, void 0, function* () {
        try {
            // 检查git安装状态
            const isGitInstalled = yield integrator.isGitInstalled();
            if (!isGitInstalled) {
                vscode.window.showErrorMessage('未安装git，请先安装git');
                return;
            }
            // 检查是否在git仓库中
            const isInRepo = yield integrator.isInGitRepository();
            if (!isInRepo) {
                // 询问是否初始化git仓库
                const initResult = yield vscode.window.showInformationMessage('当前目录不是git仓库，是否初始化？', '初始化', '取消');
                if (initResult === '初始化') {
                    yield integrator.initGitRepository();
                    vscode.window.showInformationMessage('git仓库初始化成功');
                }
                else {
                    return;
                }
            }
            // 使用进度管理器显示提交进度
            yield progressManager_1.progressManager.showCommitProgress((progress) => __awaiter(this, void 0, void 0, function* () {
                progress.report({ message: '分析代码变更...', increment: 20 });
                // 初始化分析器
                const analyzer = new gitAnalyzer_1.GitAnalyzer();
                // 分析代码变更
                const changes = yield analyzer.analyzeChanges();
                // 检查是否有变更
                if (changes.length === 0) {
                    vscode.window.showInformationMessage('没有发现代码变更');
                    return;
                }
                progress.report({ message: '暂存变更...', increment: 30 });
                // 暂存所有变更
                yield integrator.stageAllChanges();
                progress.report({ message: '智能分组...', increment: 40 });
                // 初始化分组器
                const grouper = new codeGrouper_1.CodeGrouper();
                // 智能分组
                const groups = grouper.groupChanges(changes);
                progress.report({ message: '生成提交消息...', increment: 60 });
                // 初始化消息生成器
                const generator = new commitMessageGenerator_1.CommitMessageGenerator();
                // 生成提交消息
                const messages = yield generator.generateMessages(groups);
                // 显示提交预览
                const shouldCommit = yield integrator.showCommitPreview(messages);
                if (!shouldCommit) {
                    return;
                }
                progress.report({ message: '执行提交...', increment: 80 });
                // 执行提交
                for (const message of messages) {
                    yield integrator.executeGitCommit(message);
                }
                progress.report({ message: '完成', increment: 100 });
                // 清空缓存
                cacheManager_1.cacheManager.clear();
                // 询问是否推送
                const pushResult = yield vscode.window.showInformationMessage(`提交完成，共提交 ${messages.length} 个分组，是否推送到远程仓库？`, '推送', '取消');
                if (pushResult === '推送') {
                    const branch = yield integrator.getCurrentBranch();
                    try {
                        yield integrator.pushChanges(branch);
                        vscode.window.showInformationMessage('推送成功');
                    }
                    catch (error) {
                        console.error('推送失败:', error);
                        vscode.window.showErrorMessage(`推送失败: ${error instanceof Error ? error.message : String(error)}`);
                    }
                }
            }));
        }
        catch (error) {
            console.error('提交失败:', error);
            vscode.window.showErrorMessage(`提交失败: ${error instanceof Error ? error.message : String(error)}`);
        }
    }));
    // 注册Trae命令
    integrator.registerTraeCommands(context);
    // 订阅命令
    context.subscriptions.push(analyzeCommand);
    context.subscriptions.push(commitCommand);
}
function deactivate() {
    console.log('Git Commit Assistant 插件已停用');
}
//# sourceMappingURL=extension.js.map