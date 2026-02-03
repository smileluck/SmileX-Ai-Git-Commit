import * as vscode from 'vscode';
import { ChangeGroup, GroupType } from '../grouper/codeGrouper';

/**
 * 提交消息生成器
 * 用于为代码变更生成符合规范的git提交消息
 */
export class CommitMessageGenerator {
    private aiEnabled: boolean;
    private commitTemplate: string;

    /**
     * 构造函数
     */
    constructor() {
        // 从配置中读取设置
        const config = vscode.workspace.getConfiguration('smilex-git-commit');
        this.aiEnabled = config.get<boolean>('aiEnabled', true);
        this.commitTemplate = config.get<string>('commitTemplate', '${type}(${scope}): ${subject}');
    }

    /**
     * 为变更分组生成提交消息
     * @param groups 变更分组数组
     * @returns 生成的提交消息数组
     */
    async generateMessages(groups: ChangeGroup[]): Promise<string[]> {
        const messages: string[] = [];
        
        for (const group of groups) {
            // 生成提交消息
            const message = await this.generateMessageForGroup(group);
            messages.push(message);
        }
        
        return messages;
    }

    /**
     * 为单个变更分组生成提交消息
     * @param group 变更分组
     * @returns 生成的提交消息
     */
    private async generateMessageForGroup(group: ChangeGroup): Promise<string> {
        // 确定提交类型
        const type = this.mapGroupTypeToCommitType(group.type);
        
        // 确定作用域
        const scope = this.generateScope(group);
        
        // 生成主题
        let subject: string;
        if (this.aiEnabled) {
            // 使用AI生成主题
            subject = await this.generateSubjectWithAI(group);
        } else {
            // 使用传统方法生成主题
            subject = this.generateSubject(group);
        }
        
        // 生成详细描述
        const body = this.generateBody(group);
        
        // 生成页脚（如果有）
        const footer = this.generateFooter(group);
        
        // 组合提交消息
        let message = this.commitTemplate
            .replace('${type}', type)
            .replace('${scope}', scope)
            .replace('${subject}', subject);
        
        // 添加详细描述
        if (body) {
            message += '\n\n' + body;
        }
        
        // 添加页脚
        if (footer) {
            message += '\n\n' + footer;
        }
        
        return message;
    }

    /**
     * 将分组类型映射为提交类型
     * @param groupType 分组类型
     * @returns 提交类型
     */
    private mapGroupTypeToCommitType(groupType: GroupType): string {
        switch (groupType) {
            case GroupType.NEW_FEATURE:
                return 'feat';
            case GroupType.BUG_FIX:
                return 'fix';
            case GroupType.REFACTOR:
                return 'refactor';
            case GroupType.ENHANCEMENT:
                return 'chore';
            case GroupType.CLEANUP:
                return 'chore';
            case GroupType.CONFIG:
                return 'config';
            default:
                return 'chore';
        }
    }

    /**
     * 生成作用域
     * @param group 变更分组
     * @returns 作用域
     */
    private generateScope(group: ChangeGroup): string {
        // 使用分组名称作为作用域
        return group.name.toLowerCase().replace(/\s+/g, '-');
    }

    /**
     * 生成主题
     * @param group 变更分组
     * @returns 主题
     */
    private generateSubject(group: ChangeGroup): string {
        // 基于分组描述生成主题
        let subject = group.description;
        
        // 限制主题长度
        if (subject.length > 50) {
            subject = subject.substring(0, 47) + '...';
        }
        
        // 确保首字母小写
        subject = subject.charAt(0).toLowerCase() + subject.slice(1);
        
        return subject;
    }

    /**
     * 使用AI生成主题
     * @param group 变更分组
     * @returns AI生成的主题
     */
    private async generateSubjectWithAI(group: ChangeGroup): Promise<string> {
        try {
            // 构建AI提示
            const prompt = this.buildAIPrompt(group);
            
            // 这里应该调用真实的AI API，现在返回模拟结果
            // 实际项目中可以集成OpenAI、Anthropic等API
            console.log('AI提示:', prompt);
            
            // 模拟AI生成结果
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // 基于分组信息生成模拟的AI结果
            let subject = '';
            switch (group.type) {
                case GroupType.NEW_FEATURE:
                    subject = `add new ${group.name} module`;
                    break;
                case GroupType.BUG_FIX:
                    subject = `fix ${group.name} module issues`;
                    break;
                case GroupType.REFACTOR:
                    subject = `refactor ${group.name} module`;
                    break;
                default:
                    subject = `update ${group.name} module`;
            }
            
            return subject;
        } catch (error) {
            console.error('AI生成失败:', error);
            // 失败时回退到传统方法
            return this.generateSubject(group);
        }
    }

    /**
     * 构建AI提示
     * @param group 变更分组
     * @returns AI提示
     */
    private buildAIPrompt(group: ChangeGroup): string {
        let prompt = `请为以下git代码变更生成一个简洁的提交消息主题（不超过50个字符）：\n`;
        prompt += `变更类型: ${group.type}\n`;
        prompt += `模块名称: ${group.name}\n`;
        prompt += `变更描述: ${group.description}\n`;
        prompt += `请遵循Angular提交规范，使用小写字母，不要以句号结尾。`;
        
        return prompt;
    }

    /**
     * 生成详细描述
     * @param group 变更分组
     * @returns 详细描述
     */
    private generateBody(group: ChangeGroup): string {
        const bodyLines: string[] = [];
        
        // 添加变更描述
        bodyLines.push('详细变更:');
        
        // 列出变更的文件
        for (const change of group.changes) {
            const fileName = change.filePath.split('/').pop();
            let changeDescription = '';
            
            switch (change.changeType) {
                case 'added':
                    changeDescription = `+ ${fileName}: 新增文件`;
                    break;
                case 'modified':
                    changeDescription = `~ ${fileName}: 修改 ${change.addedLines} 行，删除 ${change.deletedLines} 行`;
                    break;
                case 'deleted':
                    changeDescription = `- ${fileName}: 删除文件`;
                    break;
            }
            
            bodyLines.push(changeDescription);
        }
        
        return bodyLines.join('\n');
    }

    /**
     * 生成页脚
     * @param group 变更分组
     * @returns 页脚
     */
    private generateFooter(group: ChangeGroup): string {
        const footers: string[] = [];
        
        // 检查是否有破坏性变更
        if (this.containsBreakingChanges(group)) {
            footers.push('BREAKING CHANGE: 包含破坏性变更');
        }
        
        // 检查是否关闭了issue
        const issueReferences = this.extractIssueReferences(group);
        if (issueReferences.length > 0) {
            footers.push(`Closes ${issueReferences.join(', ')}`);
        }
        
        return footers.join('\n');
    }

    /**
     * 检查是否包含破坏性变更
     * @param group 变更分组
     * @returns 是否包含破坏性变更
     */
    private containsBreakingChanges(group: ChangeGroup): boolean {
        // 简单检查变更描述中是否包含破坏性变更关键词
        const breakingKeywords = ['breaking', 'remove', 'delete', 'deprecate'];
        
        for (const change of group.changes) {
            const summaryLower = change.summary.toLowerCase();
            if (breakingKeywords.some(keyword => summaryLower.includes(keyword))) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * 提取issue引用
     * @param group 变更分组
     * @returns issue引用数组
     */
    private extractIssueReferences(group: ChangeGroup): string[] {
        const references: string[] = [];
        const issueRegex = /#(\d+)/g;
        
        for (const change of group.changes) {
            let match;
            while ((match = issueRegex.exec(change.summary)) !== null) {
                references.push(`#${match[1]}`);
            }
        }
        
        // 去重
        return [...new Set(references)];
    }
}
