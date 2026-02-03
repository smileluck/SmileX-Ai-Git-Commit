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
exports.FileType = exports.ChangeType = exports.GitAnalyzer = void 0;
const vscode = __importStar(require("vscode"));
/**
 * 代码变更分析器
 * 用于分析git暂存区的代码变更
 */
class GitAnalyzer {
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
     * 分析代码变更
     * @returns 变更信息数组
     */
    analyzeChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 模拟git变更分析
                // 实际项目中应该使用simple-git库获取真实的git变更
                console.log('分析代码变更...');
                // 模拟变更数据
                const changes = [
                    {
                        filePath: 'src/components/Button.tsx',
                        changeType: ChangeType.MODIFIED,
                        addedLines: 5,
                        deletedLines: 2,
                        fileType: FileType.FRONTEND,
                        summary: '添加按钮点击事件处理',
                        diff: '修改了按钮组件'
                    },
                    {
                        filePath: 'src/utils/helper.ts',
                        changeType: ChangeType.ADDED,
                        addedLines: 10,
                        deletedLines: 0,
                        fileType: FileType.BACKEND,
                        summary: '新增工具函数',
                        diff: '新增了工具函数文件'
                    }
                ];
                return changes;
            }
            catch (error) {
                console.error('分析变更失败:', error);
                throw new Error(`分析变更失败: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * 提交代码变更
     * @param message 提交消息
     */
    commitChanges(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 模拟git提交
                console.log('提交代码变更:', message);
            }
            catch (error) {
                console.error('提交失败:', error);
                throw new Error(`提交失败: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
}
exports.GitAnalyzer = GitAnalyzer;
/**
 * 变更类型枚举
 */
var ChangeType;
(function (ChangeType) {
    ChangeType["ADDED"] = "added";
    ChangeType["MODIFIED"] = "modified";
    ChangeType["DELETED"] = "deleted";
})(ChangeType || (exports.ChangeType = ChangeType = {}));
/**
 * 文件类型枚举
 */
var FileType;
(function (FileType) {
    FileType["FRONTEND"] = "frontend";
    FileType["BACKEND"] = "backend";
    FileType["CONFIG"] = "config";
    FileType["DOCUMENTATION"] = "documentation";
    FileType["OTHER"] = "other";
})(FileType || (exports.FileType = FileType = {}));
//# sourceMappingURL=gitAnalyzer.js.map