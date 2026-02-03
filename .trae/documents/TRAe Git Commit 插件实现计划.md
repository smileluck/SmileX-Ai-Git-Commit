# Trae Git Commit 插件实现计划

## 项目概述
开发一个Trae插件，用于在git提交时智能分析代码变更，自动分组并生成符合规范的提交消息。

## 核心功能

### 1. 代码变更分析
- 利用git diff命令获取暂存区的代码变更
- 分析变更文件的类型、修改范围和内容
- 提取关键变更信息，如函数修改、变量变更、文件新增/删除等

### 2. 智能代码分组
- 基于文件类型分组（如前端、后端、配置文件等）
- 基于功能模块分组（如用户认证、数据处理、UI组件等）
- 基于变更类型分组（如bug修复、新功能、重构等）

### 3. 提交消息生成
- 遵循Angular提交规范（type(scope): subject）
- 为每个分组生成独立的提交消息
- 利用AI分析变更内容，生成详细且准确的描述
- 支持自定义提交模板和规则

### 4. 集成与交互
- 作为Trae插件集成到开发环境
- 提供命令行接口和图形界面
- 支持提交前预览和编辑
- 与git hooks集成，实现自动触发

## 技术实现

### 1. 项目结构（符合Trae插件规范）
```
smilex-git-commit/
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript配置
├── Trae-plugin.json      # Trae插件配置文件
├── src/
│   ├── extension.ts      # 插件入口
│   ├── analyzer/         # 代码变更分析模块
│   ├── grouper/          # 代码分组模块
│   ├── generator/        # 提交消息生成模块
│   ├── integrator/       # 与git和Trae集成模块
│   └── utils/            # 工具函数
└── README.md             # 项目文档
```

### 2. 关键技术
- **Node.js**：插件运行环境
- **TypeScript**：代码开发语言
- **Git API**：获取代码变更信息
- **AI API**：生成智能提交消息
- **Trae插件API**：与Trae集成

### 3. 实现流程
1. **初始化项目**：创建插件目录结构，配置package.json和Trae-plugin.json
2. **实现代码分析**：解析git diff输出，提取变更信息
3. **实现智能分组**：基于规则和AI分析对变更进行分组
4. **实现消息生成**：根据分组和变更内容生成提交消息
5. **实现集成**：与git和Trae集成，提供用户界面
6. **测试与优化**：确保插件功能正常，性能良好

## 插件配置

### Trae-plugin.json配置示例
```json
{
  "name": "smilex-git-commit",
  "displayName": "Git Commit Assistant",
  "version": "1.0.0",
  "description": "智能分析代码变更并生成符合规范的git提交消息",
  "main": "dist/extension.js",
  "activationEvents": [
    "onCommand:smilex-git-commit.analyze",
    "onCommand:smilex-git-commit.commit"
  ],
  "contributes": {
    "commands": [
      {
        "command": "smilex-git-commit.analyze",
        "title": "Analyze Git Changes"
      },
      {
        "command": "smilex-git-commit.commit",
        "title": "Commit with Generated Message"
      }
    ],
    "menus": {
      "scm/title": [
        {
          "command": "smilex-git-commit.analyze",
          "group": "navigation"
        }
      ]
    },
    "configuration": {
      "title": "Git Commit Assistant",
      "properties": {
        "smilex-git-commit.commitTemplate": {
          "type": "string",
          "default": "${type}(${scope}): ${subject}",
          "description": "提交消息模板"
        },
        "smilex-git-commit.aiEnabled": {
          "type": "boolean",
          "default": true,
          "description": "启用AI消息生成"
        }
      }
    }
  }
}
```

## 使用方式

### 安装方式
- 通过npm安装：`npm install -g smilex-git-commit`
- 通过Trae插件市场安装

### 命令行使用
```bash
# 分析当前变更并生成提交消息
smilex-git-commit analyze

# 自动提交变更（使用生成的消息）
smilex-git-commit commit

# 配置插件
smilex-git-commit config
```

### Trae集成
- 在Trae中打开插件面板
- 选择"Git Commit Assistant"
- 查看变更分析和生成的提交消息
- 确认或编辑后提交

## 预期效果
- 减少开发者编写提交消息的时间
- 提高提交消息的质量和一致性
- 使代码变更历史更加清晰易读
- 支持团队协作中的提交规范统一

## 后续优化
- 支持更多代码语言和框架的分析
- 提供更多自定义分组和消息模板选项
- 集成更多AI模型以提高消息质量
- 支持团队级别的配置共享