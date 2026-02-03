import * as vscode from 'vscode';

/**
 * 进度管理器
 * 用于显示插件执行操作的进度信息
 */
export class ProgressManager {
    /**
     * 显示进度并执行操作
     * @param title 进度标题
     * @param operation 要执行的操作
     * @returns 操作结果
     */
    async withProgress<T>(title: string, operation: (progress: vscode.Progress<{ message?: string; increment?: number }>) => Promise<T>): Promise<T> {
        return vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title,
                cancellable: true
            },
            async (progress, token) => {
                // 设置取消令牌监听
                token.onCancellationRequested(() => {
                    console.log('操作被用户取消');
                });

                // 执行操作
                return operation(progress);
            }
        );
    }

    /**
     * 显示分析进度
     * @param operation 分析操作
     * @returns 分析结果
     */
    async showAnalysisProgress<T>(operation: (progress: vscode.Progress<{ message?: string; increment?: number }>) => Promise<T>): Promise<T> {
        return this.withProgress('分析代码变更...', operation);
    }

    /**
     * 显示提交进度
     * @param operation 提交操作
     * @returns 提交结果
     */
    async showCommitProgress<T>(operation: (progress: vscode.Progress<{ message?: string; increment?: number }>) => Promise<T>): Promise<T> {
        return this.withProgress('执行git提交...', operation);
    }

    /**
     * 显示AI生成进度
     * @param operation AI生成操作
     * @returns 生成结果
     */
    async showAiProgress<T>(operation: (progress: vscode.Progress<{ message?: string; increment?: number }>) => Promise<T>): Promise<T> {
        return this.withProgress('AI生成提交消息...', operation);
    }
}

// 导出单例实例
export const progressManager = new ProgressManager();
