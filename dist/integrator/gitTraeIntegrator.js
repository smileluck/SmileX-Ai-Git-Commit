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
exports.GitTraeIntegrator = void 0;
const vscode = __importStar(require("vscode"));
/**
 * Git和Trae集成器
 * 用于处理与git和Trae的集成逻辑
 */
class GitTraeIntegrator {
    /**
     * 构造函数
     */
    constructor() {
        var _a;
        // 获取当前工作目录
        const workspaceFolder = (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a[0];
        if (!workspaceFolder) {
            throw new Error('没有打开的工作目录');
        }
    }
    /**
     * 检查git仓库状态
     * @returns git状态信息
     */
    checkGitStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 模拟git状态检查
                console.log('检查git状态...');
                return {
                    isGitRepository: true,
                    staged: ['src/components/Button.tsx', 'src/utils/helper.ts'],
                    modified: [],
                    created: ['src/utils/helper.ts'],
                    deleted: []
                };
            }
            catch (error) {
                console.error('检查git状态失败:', error);
                throw new Error(`检查git状态失败: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * 暂存所有变更
     */
    stageAllChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 模拟暂存变更
                console.log('所有变更已暂存');
            }
            catch (error) {
                console.error('暂存变更失败:', error);
                throw new Error(`暂存变更失败: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * 执行git提交
     * @param message 提交消息
     */
    executeGitCommit(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 模拟git提交
                console.log('提交成功:', message);
            }
            catch (error) {
                console.error('提交失败:', error);
                throw new Error(`提交失败: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * 获取当前分支名称
     * @returns 分支名称
     */
    getCurrentBranch() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 模拟获取分支名称
                return 'main';
            }
            catch (error) {
                console.error('获取分支名称失败:', error);
                throw new Error(`获取分支名称失败: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * 推送提交到远程仓库
     * @param branch 分支名称
     */
    pushChanges(branch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 模拟推送变更
                console.log('推送成功到分支:', branch);
            }
            catch (error) {
                console.error('推送失败:', error);
                throw new Error(`推送失败: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * 显示提交预览
     * @param messages 提交消息数组
     * @returns 用户是否确认提交
     */
    showCommitPreview(messages) {
        return __awaiter(this, void 0, void 0, function* () {
            // 构建预览内容
            let previewContent = '即将提交以下变更:\n\n';
            messages.forEach((message, index) => {
                previewContent += `=== 提交 ${index + 1} ===\n`;
                previewContent += message + '\n\n';
            });
            // 显示预览对话框
            const result = yield vscode.window.showInformationMessage(`准备提交 ${messages.length} 个变更组`, '确认提交', '取消');
            return result === '确认提交';
        });
    }
    /**
     * 与Trae集成，获取AI能力
     * @param prompt AI提示
     * @returns AI生成的内容
     */
    getAiCompletion(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 这里应该调用Trae的AI API
                // 目前返回模拟结果
                console.log('调用Trae AI API:', prompt);
                // 模拟AI响应
                yield new Promise(resolve => setTimeout(resolve, 1000));
                // 返回模拟结果
                return 'AI生成的内容';
            }
            catch (error) {
                console.error('AI调用失败:', error);
                throw new Error(`AI调用失败: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * 注册Trae命令
     * @param context 扩展上下文
     */
    registerTraeCommands(context) {
        // 注册命令的逻辑已经在extension.ts中实现
        // 这里可以添加额外的Trae特定命令
        console.log('Trae命令已注册');
    }
    /**
     * 检查是否安装了git
     * @returns 是否安装了git
     */
    isGitInstalled() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 模拟检查git安装状态
                return true;
            }
            catch (error) {
                console.error('git未安装:', error);
                return false;
            }
        });
    }
    /**
     * 检查是否在git仓库中
     * @returns 是否在git仓库中
     */
    isInGitRepository() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 模拟检查是否在git仓库中
                return true;
            }
            catch (error) {
                console.error('检查git仓库失败:', error);
                return false;
            }
        });
    }
    /**
     * 初始化git仓库
     */
    initGitRepository() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 模拟初始化git仓库
                console.log('git仓库初始化成功');
            }
            catch (error) {
                console.error('初始化git仓库失败:', error);
                throw new Error(`初始化git仓库失败: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
}
exports.GitTraeIntegrator = GitTraeIntegrator;
//# sourceMappingURL=gitTraeIntegrator.js.map