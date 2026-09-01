# 小火箭 X 访问优化模块

将 X（Twitter）相关域名及本仓库「推文转 PDF」功能依赖的 API 走代理，减少 App 打不开、图片加载失败、快捷指令/网页版拉取推文失败等问题。

## 文件

| 文件 | 说明 |
|------|------|
| `x-access.sgmodule` | Shadowrocket 模块，导入后追加分流规则 |

## 快速使用

1. 把 `x-access.sgmodule` 传到 iPhone（AirDrop、微信、文件 App 均可）
2. 用 **小火箭** 打开该文件，或：小火箭 → **配置** → **模块** → 右上角 **+** → 从文件导入
3. 打开模块右侧开关，使其生效
4. **重要：** 若你的代理策略组不叫 `PROXY`，请编辑模块，把规则里的 `PROXY` 全部改成你配置中的名称（常见如 `Proxy`、`节点选择`、`🚀 代理` 等）

> 模块规则优先级高于配置文件中的普通规则，适合在已有分流订阅上「补丁式」加强 X 相关域名。

## 覆盖范围

- **X App / 网页：** `x.com`、`twitter.com`、`t.co`、`twimg.com` 等
- **推文转 PDF：** `api.fxtwitter.com`、`api.vxtwitter.com`（与 [ios-shortcuts](../ios-shortcuts/) 及 [网页版](https://nfwater.github.io/Le-Solo-AI-Dev/) 一致）
- **可选：** `nfwater.github.io`（网页版托管；国内多数情况可直连，若打不开可保留该规则）

## 常见问题

### 1. 模块开了但 X 仍打不开

- 确认小火箭 **已连接** 且节点可用
- 检查模块里策略名是否与你的 **代理分组** 一致
- 在 **配置 → 规则** 里看是否有 `GEOIP,CN,DIRECT` 等规则把部分请求误判为直连；本模块域名规则应优先于 GEOIP

### 2. 只想代理 X，不想动其他规则

保持 **全局路由** 为「配置」即可；本模块只追加 X 相关 `DOMAIN` 规则，不会覆盖整份订阅。

### 3. 与「推文转 PDF」配合

| 方式 | 需要代理的域名 |
|------|----------------|
| X App 复制链接 | `x.com`、`twitter.com` |
| 快捷指令 / Scriptable | `api.fxtwitter.com` 或 `api.vxtwitter.com` |
| Safari 网页版 | 上述 API + 可选 `nfwater.github.io` |

## 自定义

编辑 `x-access.sgmodule` 中 `[Rule]` 段即可：

- 删除 `nfwater.github.io` 那一行：网页版走直连
- 将 `PROXY` 改为你的策略组名
- 若使用固定节点，可改为具体节点名称（与配置文件里节点名一致）

## 参考

- [Shadowrocket 使用手册](https://lowertop.github.io/Shadowrocket/)
- 主项目：[X 推文转 PDF](../ios-shortcuts/README.md)
