"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheManager = exports.CacheManager = void 0;
/**
 * 缓存管理器
 * 用于缓存分析结果，提高插件性能
 */
class CacheManager {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5分钟缓存过期
    }
    /**
     * 获取缓存项
     * @param key 缓存键
     * @returns 缓存值或null
     */
    get(key) {
        const item = this.cache.get(key);
        if (!item) {
            return null;
        }
        // 检查缓存是否过期
        if (Date.now() - item.timestamp > this.cacheTimeout) {
            this.cache.delete(key);
            return null;
        }
        return item.value;
    }
    /**
     * 设置缓存项
     * @param key 缓存键
     * @param value 缓存值
     */
    set(key, value) {
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }
    /**
     * 删除缓存项
     * @param key 缓存键
     */
    delete(key) {
        this.cache.delete(key);
    }
    /**
     * 清空缓存
     */
    clear() {
        this.cache.clear();
    }
    /**
     * 获取缓存大小
     * @returns 缓存大小
     */
    size() {
        return this.cache.size;
    }
}
exports.CacheManager = CacheManager;
// 导出单例实例
exports.cacheManager = new CacheManager();
//# sourceMappingURL=cacheManager.js.map