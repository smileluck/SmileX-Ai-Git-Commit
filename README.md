# Git Commit Assistant

Trae 插件，用于智能分析代码变更，自动分组并生成符合规范的 git 提交消息。

## 项目概述

Git Commit Assistant 是一个专为 Trae 开发的插件，旨在简化 git 提交流程，提高开发效率。通过智能分析代码变更、自动分组和生成符合规范的提交消息，帮助开发者更专注于代码本身，而不是繁琐的提交流程。

## 功能特性

### 核心功能

- **智能代码变更分析**：自动识别文件变更类型、修改范围和内容
- **智能代码分组**：基于文件类型、功能模块和变更类型自动分组
- **AI 驱动的提交消息生成**：生成符合 Angular 规范的提交消息
- **完整的 git 集成**：支持暂存、提交、推送等操作
- **用户友好的界面**：提供提交预览和交互选项

### 附加功能

- **性能优化**：添加缓存机制，减少重复计算
- **进度提示**：实时显示操作进度，提高用户体验
- **错误处理**：完善的错误捕获和提示机制
- **可配置性**：支持自定义提交模板和 AI 生成选项

## 安装方式

### 通过 Trae 插件市场

1. 打开 Trae
2. 进入插件市场
3. 搜索 "Git Commit Assistant"
4. 点击安装

### 手动安装

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/smilex-git-commit.git
   ```

2. **进入目录**
   ```bash
   cd smilex-git-commit
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **构建插件**
   ```bash
   npm run compile
   ```

5. **打包插件**
   ```bash
   npx vsce package
   ```

6. **安装到 Trae**
   - 打开 Trae
   - 点击左侧边栏的扩展图标
   - 点击右上角的三个点（更多操作）
   - 选择 "从 VSIX 安装..."
   - 浏览并选择生成的 `.vsix` 文件
   - 点击 "安装"

## 使用方法

### 通过命令面板

1. 按下 `Ctrl+Shift+P` 打开命令面板
2. 输入并选择以下命令：
   - `Git Commit Assistant: Analyze Git Changes` - 分析代码变更并生成提交消息
   - `Git Commit Assistant: Commit with Generated Message` - 执行 git 提交

### 通过源代码管理视图

1. 打开源代码管理视图（左侧边栏的 Git 图标）
2. 在工具栏中点击 "Analyze Git Changes" 按钮
3. 查看分析结果和生成的提交消息
4. 点击 "Commit with Generated Message" 按钮执行提交

## 配置选项

在 Trae 设置中搜索 "Git Commit Assistant" 进行配置：

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `commitTemplate` | 字符串 | `${type}(${scope}): ${subject}` | 提交消息模板 |
| `aiEnabled` | 布尔值 | `true` | 是否启用 AI 生成提交消息 |

## 技术实现

### 项目结构

```
smilex-git-commit/
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
├── Trae-plugin.json      # Trae 插件配置
├── src/
│   ├── extension.ts      # 插件入口
│   ├── analyzer/         # 代码变更分析模块
│   ├── grouper/          # 代码分组模块
│   ├── generator/        # 提交消息生成模块
│   ├── integrator/       # 与 git 和 Trae 集成模块
│   └── utils/            # 工具函数（缓存和进度管理）
└── README.md             # 项目文档
```

### 核心技术

- **开发语言**：TypeScript
- **运行环境**：Node.js / VS Code / Trae
- **构建工具**：TypeScript Compiler (tsc)
- **打包工具**：vsce
- **关键依赖**：
  - `vscode` - VS Code 扩展 API
  - `typescript` - 类型检查和编译

### 工作流程

1. **分析阶段**：
   - 获取 git 变更信息
   - 分析变更类型和范围
   - 智能分组变更

2. **消息生成阶段**：
   - 基于变更内容生成提交消息
   - 支持 AI 辅助生成

3. **提交阶段**：
   - 执行 git 提交
   - 处理提交结果
   - 显示操作状态

## 贡献指南

### 开发流程

1. **Fork 仓库**
2. **创建特性分支**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **提交变更**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **推送到分支**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **打开 Pull Request**

### 代码规范

- 遵循 TypeScript 编码规范
- 使用 4 空格缩进
- 为所有函数和类添加注释
- 确保代码通过类型检查

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 联系方式

- **项目链接**：https://github.com/yourusername/smilex-git-commit
- **问题反馈**：https://github.com/yourusername/smilex-git-commit/issues
- **作者**：Your Name
- **邮箱**：your.email@example.com

## 致谢

- 感谢 Trae 团队提供的强大开发工具
- 感谢所有贡献者的努力和支持
- 感谢开源社区的宝贵资源

## 版本历史

### v1.0.0

- ✨ 初始版本
- 🎉 实现核心功能：代码分析、智能分组、提交消息生成
- 🔧 集成 git 操作
- 🎨 添加用户友好的界面
- 🚀 性能优化和错误处理

---

**享受更高效的 git 提交体验！** 🎉