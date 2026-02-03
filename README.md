# Git Commit Assistant

项目已废弃，TRAE本身能够提供支持了，不需要单独安装插件，另外TRAE不提供对外的AI能力，所以需要依赖其它的方式（比如OpenAI的API）来实现AI能力。

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
   git clone https://github.com/smileluck/SmileX-Ai-Git-Commit.git
   ```

2. **进入目录**
   ```bash
   cd SmileX-Ai-Git-Commit
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

## 上传插件到插件库

### 准备工作

1. **安装 vsce 工具**（如果尚未安装）
   ```bash
   npm install -g vsce
   ```

2. **创建插件发布者账号**
   - 访问 https://marketplace.visualstudio.com/manage/createpublisher
   - 登录并创建发布者账号
   - 记录发布者 ID

3. **更新 package.json 文件**
   - 添加 `publisher` 字段，设置为你的发布者 ID
   - 确保 `name` 字段是唯一的
   - 检查版本号是否正确

### 上传步骤

1. **登录到插件市场**
   ```bash
   vsce login <publisher-id>
   ```
   按照提示输入个人访问令牌

2. **打包插件**
   ```bash
   vsce package
   ```

3. **发布插件**
   ```bash
   vsce publish
   ```
   或指定版本发布
   ```bash
   vsce publish <version>
   ```

4. **验证发布**
   - 访问 https://marketplace.visualstudio.com/manage/publishers/<publisher-id>
   - 确认插件已成功发布
   - 等待插件市场索引更新（通常需要几分钟）

### 发布注意事项

- **版本号**：遵循语义化版本规范（Major.Minor.Patch）
- **插件图标**：建议添加 `icon` 字段到 package.json 并提供 128x128px 的图标
- **README 格式**：确保 README.md 格式正确，包含必要的信息
- **许可证**：确保已添加正确的许可证文件
- **测试**：在发布前充分测试插件功能

## 本地开发与测试

### 开发模式

1. **克隆仓库**（如果尚未克隆）
   ```bash
   git clone https://github.com/smileluck/SmileX-Ai-Git-Commit.git
   cd SmileX-Ai-Git-Commit
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动监视模式**
   ```bash
   npm run watch
   ```

4. **在 Trae 中加载开发版本**
   - 打开 Trae
   - 按下 `Ctrl+Shift+P` 打开命令面板
   - 输入并选择 "Extensions: Install from VSIX..."
   - 选择生成的 `.vsix` 文件
   - 或使用 "Extensions: Reload Window" 重新加载窗口以应用更改

### 调试技巧

- **使用 VS Code 调试**：在 VS Code 中打开项目，按 `F5` 启动调试会话
- **查看输出**：在 Trae 的 "输出" 面板中选择 "Git Commit Assistant" 查看日志
- **错误排查**：检查 Trae 的 "开发者工具" 控制台查看详细错误信息

## 常见问题与解决方案

### 安装问题

**Q: 安装插件时出现 "Installation failed" 错误**
A: 确保你使用的是最新版本的 Trae，并且插件版本与 Trae 版本兼容

**Q: 从 VSIX 安装后插件不显示**
A: 尝试重新加载 Trae 窗口（按下 `Ctrl+Shift+P` 并选择 "Developer: Reload Window"）

### 上传问题

**Q: 发布插件时出现 "Error: Failed to publish extension" 错误**
A: 检查你的个人访问令牌是否有效，以及是否具有发布权限

**Q: 插件在市场中搜索不到**
A: 发布后需要等待几分钟时间让市场索引更新，然后再尝试搜索

### 使用问题

**Q: 插件命令不显示在命令面板中**
A: 确保插件已正确激活，尝试重新加载窗口或重启 Trae

**Q: 生成的提交消息不符合预期**
A: 检查你的配置设置，确保 AI 功能已启用，并且代码变更有足够的信息供 AI 分析

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

本项目采用 Apache-2.0 许可证。详见 [LICENSE](LICENSE) 文件。

## 联系方式

- **项目链接**：https://github.com/smileluck/SmileX-Ai-Git-Commit
- **问题反馈**：https://github.com/smileluck/SmileX-Ai-Git-Commit/issues
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