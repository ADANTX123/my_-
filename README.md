# 医护人员心理健康支持小程序

基于微信小程序原生开发 + TDesign Miniprogram 的医护人员心理健康支持应用。项目围绕”筛查 -> 评估 -> 干预 -> 跟踪”闭环设计，支持心理测评、机器学习辅助分析、情绪记录、课程资源、辅导预约和心理档案。

## 功能概览

- 微信登录验证：打开小程序后先进入登录页，登录后才能进入主功能。
- 智能测评：用户填写 SMSHS 风格自评量表，系统计算维度分、总分和压力指数。
- 机器学习辅助分析：基于约 199 份医护人员压力问卷数据，提供辅助压力等级倾向、主要压力因素和建议。
- 情绪记录：记录情绪标签、强度和文字备注。
- 课程资源：提供学业压力、临床实践、睡眠恢复、就业规划等压力调节资源。
- 辅导预约：选择咨询师和时间段，保存预约记录。
- 心理档案：展示最近测评、压力趋势、情绪记录和预约记录。

## 技术栈

- 微信小程序原生框架
- JavaScript
- WXML / LESS
- TDesign Miniprogram
- 本地存储 `wx.setStorageSync`
- 本地轻量机器学习推理模型

## 目录说明

```text
.
├── app.js                         # 小程序入口，包含登录守卫
├── app.json                       # 页面、tabBar、分包配置
├── app.less                       # 全局样式
├── variable.less                  # 全局色彩和尺寸变量
├── components/nav                 # 顶部导航组件
├── custom-tab-bar                 # 自定义底部导航
├── pages/login                    # 微信登录验证页
├── pages/home                     # 首页数据看板
├── pages/assessment               # 心理测评页
├── pages/result                   # 测评结果和 ML 辅助分析页
├── pages/emotion                  # 情绪记录页
├── pages/course                   # 课程资源页
├── pages/appointment              # 辅导预约页
├── pages/profile                  # 心理档案页
├── utils/auth.js                  # 登录态管理
├── utils/mentalHealthData.js      # 测评题目、规则计分、静态数据
├── utils/mlPressureModel.js       # 机器学习辅助分析模型
├── data/medical_student_survey.xlsx # 问卷原始数据
└── miniprogram_npm                # 微信开发者工具构建后的 npm 组件目录
```

## 本地运行步骤

### 1. 克隆项目

```bash
git clone <你的仓库地址>
cd <项目目录>
```

请确认打开的是项目根目录，也就是能看到这些文件的目录：

```text
app.js
app.json
package.json
project.config.json
```

不要打开上一级目录，也不要打开旧的本地副本目录，否则微信开发者工具会编译另一份代码。

### 2. 安装依赖

```bash
npm install
```

如果已经有 `node_modules` 但编译异常，可以重新安装：

```bash
rm -rf node_modules
npm install
```

Windows PowerShell 可以用：

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### 3. 导入微信开发者工具

1. 打开微信开发者工具。
2. 选择“导入项目”。
3. 项目目录选择本仓库根目录。
4. AppID 填写自己的小程序 AppID。
5. 后端服务选择“不使用云服务”。
6. 导入后，点击顶部菜单“工具 -> 构建 npm”。
7. 构建完成后点击“编译”。

当前项目不依赖云开发，先选择“不使用云服务”即可。

## AppID 说明

项目里的 `project.config.json` 可能带有开发者本人的 AppID。朋友 clone 后建议改成自己的 AppID，或者在微信开发者工具导入时手动填写。

AppSecret 不要写进小程序代码。正式上线时，如果要做完整微信登录，需要后端服务器用 `wx.login` 返回的 `code` 去换取 `openid/session_key`。

## 常见编译问题

### 1. 提示找不到 TDesign 组件

例如：

```text
app.json: ["usingComponents"]["t-toast"]: "tdesign-miniprogram/toast/toast"
路径下未找到组件
```

通常是 npm 没有构建成功，按下面顺序处理：

1. 确认已经执行 `npm install`。
2. 在微信开发者工具点击“工具 -> 构建 npm”。
3. 确认项目根目录下存在：

```text
miniprogram_npm/tdesign-miniprogram
```

4. 如果还是报错，关闭微信开发者工具，重新打开项目，再构建 npm。
5. 确认导入的是正确目录，不是旧路径或上一级目录。

### 2. 编译时页面或文字乱码

请确认编辑器和 Git 都使用 UTF-8 编码。不要用非 UTF-8 模式保存 `app.json`、`*.wxml`、`*.js`、`*.less`。

### 3. AppID 网络/TLS 报错

如果看到类似：

```text
Client network socket disconnected before secure TLS connection was established
```

这通常不是项目代码问题，而是微信开发者工具连接微信服务器失败。可以尝试：

- 关闭代理/VPN。
- 换网络或手机热点。
- 重启微信开发者工具。
- 重新登录开发者工具账号。
- 确认电脑时间正确。

### 4. 微信登录只在开发版本地保存

当前登录流程使用 `wx.login` 获取微信会话凭证，并把登录态保存在本地缓存中，方便开发和演示。生产环境需要后端接入微信登录接口，不能只依赖前端本地缓存。

## 开发提示

- 新增页面后需要同步更新 `app.json`。
- 使用 TDesign 组件后，如果开发者工具报组件缺失，优先重新“构建 npm”。
- 测评相关逻辑主要在 `utils/mentalHealthData.js`。
- 机器学习辅助模型主要在 `utils/mlPressureModel.js`。
- 登录相关逻辑主要在 `utils/auth.js` 和 `app.js`。

## 重要声明

本项目用于医护人员心理健康支持与学习场景演示。测评结果和机器学习分析仅作为心理支持参考，不构成医学诊断。如果用户出现持续失眠、明显绝望感、自伤想法或其他高危情况，应及时联系学校心理中心、辅导员、校医院或当地急救资源。
