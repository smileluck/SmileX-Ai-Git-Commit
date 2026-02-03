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
exports.progressManager = exports.ProgressManager = void 0;
const vscode = __importStar(require("vscode"));
/**
 * 进度管理器
 * 用于显示插件执行操作的进度信息
 */
class ProgressManager {
    /**
     * 显示进度并执行操作
     * @param title 进度标题
     * @param operation 要执行的操作
     * @returns 操作结果
     */
    withProgress(title, operation) {
        return __awaiter(this, void 0, void 0, function* () {
            return vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title,
                cancellable: true
            }, (progress, token) => __awaiter(this, void 0, void 0, function* () {
                // 设置取消令牌监听
                token.onCancellationRequested(() => {
                    console.log('操作被用户取消');
                });
                // 执行操作
                return operation(progress);
            }));
        });
    }
    /**
     * 显示分析进度
     * @param operation 分析操作
     * @returns 分析结果
     */
    showAnalysisProgress(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.withProgress('分析代码变更...', operation);
        });
    }
    /**
     * 显示提交进度
     * @param operation 提交操作
     * @returns 提交结果
     */
    showCommitProgress(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.withProgress('执行git提交...', operation);
        });
    }
    /**
     * 显示AI生成进度
     * @param operation AI生成操作
     * @returns 生成结果
     */
    showAiProgress(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.withProgress('AI生成提交消息...', operation);
        });
    }
}
exports.ProgressManager = ProgressManager;
// 导出单例实例
exports.progressManager = new ProgressManager();
//# sourceMappingURL=progressManager.js.map