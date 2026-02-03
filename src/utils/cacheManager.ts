/**
 * 缓存管理器
 * 用于缓存分析结果，提高插件性能
 */
export class CacheManager {
    private cache: Map<string, CacheItem> = new Map();
    private cacheTimeout: number = 5 * 60 * 1000; // 5分钟缓存过期

    /**
     * 获取缓存项
     * @param key 缓存键
     * @returns 缓存值或null
     */
    get<T>(key: string): T | null {
        const item = this.cache.get(key);
        if (!item) {
            return null;
        }

        // 检查缓存是否过期
        if (Date.now() - item.timestamp > this.cacheTimeout) {
            this.cache.delete(key);
            return null;
        }

        return item.value as T;
    }

    /**
     * 设置缓存项
     * @param key 缓存键
     * @param value 缓存值
     */
    set<T>(key: string, value: T): void {
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }

    /**
     * 删除缓存项
     * @param key 缓存键
     */
    delete(key: string): void {
        this.cache.delete(key);
    }

    /**
     * 清空缓存
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * 获取缓存大小
     * @returns 缓存大小
     */
    size(): number {
        return this.cache.size;
    }
}

/**
 * 缓存项接口
 */
interface CacheItem {
    value: any;
    timestamp: number;
}

// 导出单例实例
export const cacheManager = new CacheManager();
