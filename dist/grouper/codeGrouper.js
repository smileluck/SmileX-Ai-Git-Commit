"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupType = exports.CodeGrouper = void 0;
const gitAnalyzer_1 = require("../analyzer/gitAnalyzer");
/**
 * 代码分组器
 * 用于智能分组代码变更
 */
class CodeGrouper {
    /**
     * 分组代码变更
     * @param changes 变更信息数组
     * @returns 分组后的变更
     */
    groupChanges(changes) {
        // 首先按文件类型分组
        const groupsByFileType = this.groupByFileType(changes);
        // 然后对每个文件类型组进行更细粒度的分组
        const finalGroups = [];
        for (const [fileType, typeChanges] of Object.entries(groupsByFileType)) {
            // 对每个文件类型组按功能模块进一步分组
            const moduleGroups = this.groupByModule(typeChanges);
            finalGroups.push(...moduleGroups);
        }
        return finalGroups;
    }
    /**
     * 按文件类型分组
     * @param changes 变更信息数组
     * @returns 按文件类型分组的变更
     */
    groupByFileType(changes) {
        const groups = {};
        for (const change of changes) {
            const fileType = change.fileType;
            if (!groups[fileType]) {
                groups[fileType] = [];
            }
            groups[fileType].push(change);
        }
        return groups;
    }
    /**
     * 按功能模块分组
     * @param changes 变更信息数组
     * @returns 按功能模块分组的变更
     */
    groupByModule(changes) {
        const groups = [];
        // 模块路径映射
        const moduleMap = {};
        for (const change of changes) {
            // 提取模块路径
            const modulePath = this.extractModulePath(change.filePath);
            if (!moduleMap[modulePath]) {
                moduleMap[modulePath] = [];
            }
            moduleMap[modulePath].push(change);
        }
        // 转换为ChangeGroup
        for (const [modulePath, moduleChanges] of Object.entries(moduleMap)) {
            // 确定分组类型
            const groupType = this.determineGroupType(moduleChanges);
            groups.push({
                id: this.generateGroupId(modulePath, groupType),
                name: modulePath || '根目录',
                type: groupType,
                changes: moduleChanges,
                description: this.generateGroupDescription(moduleChanges)
            });
        }
        return groups;
    }
    /**
     * 提取模块路径
     * @param filePath 文件路径
     * @returns 模块路径
     */
    extractModulePath(filePath) {
        // 简单提取模块路径，实际项目中可以根据具体项目结构调整
        const parts = filePath.split('/');
        // 对于前端项目，通常src下的目录为模块
        if (parts[0] === 'src' && parts.length > 1) {
            return parts[1];
        }
        // 对于其他项目，返回第一个目录
        if (parts.length > 1) {
            return parts[0];
        }
        return '';
    }
    /**
     * 确定分组类型
     * @param changes 变更信息数组
     * @returns 分组类型
     */
    determineGroupType(changes) {
        // 统计变更类型
        const changeTypeCount = {
            [gitAnalyzer_1.ChangeType.ADDED]: 0,
            [gitAnalyzer_1.ChangeType.MODIFIED]: 0,
            [gitAnalyzer_1.ChangeType.DELETED]: 0
        };
        for (const change of changes) {
            changeTypeCount[change.changeType]++;
        }
        // 根据变更类型确定分组类型
        if (changeTypeCount[gitAnalyzer_1.ChangeType.ADDED] > 0 && changeTypeCount[gitAnalyzer_1.ChangeType.MODIFIED] === 0 && changeTypeCount[gitAnalyzer_1.ChangeType.DELETED] === 0) {
            return GroupType.NEW_FEATURE;
        }
        else if (changeTypeCount[gitAnalyzer_1.ChangeType.DELETED] > 0 && changeTypeCount[gitAnalyzer_1.ChangeType.ADDED] === 0) {
            return GroupType.CLEANUP;
        }
        else {
            // 检查是否为bug修复
            if (this.containsBugFix(changes)) {
                return GroupType.BUG_FIX;
            }
            // 检查是否为重构
            if (this.containsRefactoring(changes)) {
                return GroupType.REFACTOR;
            }
            return GroupType.ENHANCEMENT;
        }
    }
    /**
     * 检查是否包含bug修复
     * @param changes 变更信息数组
     * @returns 是否包含bug修复
     */
    containsBugFix(changes) {
        // 简单检查变更摘要中是否包含bug修复相关关键词
        const bugFixKeywords = ['fix', 'bug', 'error', 'issue', 'problem', 'resolve'];
        for (const change of changes) {
            const summaryLower = change.summary.toLowerCase();
            if (bugFixKeywords.some(keyword => summaryLower.includes(keyword))) {
                return true;
            }
        }
        return false;
    }
    /**
     * 检查是否包含重构
     * @param changes 变更信息数组
     * @returns 是否包含重构
     */
    containsRefactoring(changes) {
        // 简单检查变更是否主要是代码结构调整
        // 重构通常表现为修改行数较多但功能不变
        let totalAdded = 0;
        let totalDeleted = 0;
        for (const change of changes) {
            totalAdded += change.addedLines;
            totalDeleted += change.deletedLines;
        }
        // 如果添加和删除的行数相近，可能是重构
        return Math.abs(totalAdded - totalDeleted) / Math.max(totalAdded, totalDeleted, 1) < 0.3;
    }
    /**
     * 生成分组ID
     * @param modulePath 模块路径
     * @param groupType 分组类型
     * @returns 分组ID
     */
    generateGroupId(modulePath, groupType) {
        return `${groupType}-${modulePath || 'root'}`;
    }
    /**
     * 生成分组描述
     * @param changes 变更信息数组
     * @returns 分组描述
     */
    generateGroupDescription(changes) {
        const descriptions = [];
        for (const change of changes) {
            // 提取文件变更的简要描述
            const fileName = change.filePath.split('/').pop();
            let description = `${fileName}: `;
            switch (change.changeType) {
                case gitAnalyzer_1.ChangeType.ADDED:
                    description += '新增文件';
                    break;
                case gitAnalyzer_1.ChangeType.MODIFIED:
                    description += `修改 ${change.addedLines} 行，删除 ${change.deletedLines} 行`;
                    break;
                case gitAnalyzer_1.ChangeType.DELETED:
                    description += '删除文件';
                    break;
            }
            descriptions.push(description);
        }
        return descriptions.join('; ');
    }
}
exports.CodeGrouper = CodeGrouper;
/**
 * 分组类型枚举
 */
var GroupType;
(function (GroupType) {
    GroupType["NEW_FEATURE"] = "feature";
    GroupType["BUG_FIX"] = "fix";
    GroupType["REFACTOR"] = "refactor";
    GroupType["ENHANCEMENT"] = "enhance";
    GroupType["CLEANUP"] = "cleanup";
    GroupType["CONFIG"] = "config";
})(GroupType || (exports.GroupType = GroupType = {}));
//# sourceMappingURL=codeGrouper.js.map