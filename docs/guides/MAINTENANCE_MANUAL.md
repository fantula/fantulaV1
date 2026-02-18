# 🛠️ 服务器长期维护手册 (Maintenance Manual)

> **目标**：确保服务器长期稳定运行，规范化运维流程。
> **适用范围**：Fantula 线上服务器 (Staging/Prod)。

---

## 一、服务器健康检查 (Health Check)

建议每 **周** 进行一次健康检查。

### 1.1 基础指标检查
登录服务器后执行：

```bash
# 1. 检查磁盘空间 (特别关注 /dev/vda2)
df -h
# ✅ 正常：Used < 80%

# 2. 检查内存与 CPU
htop
# ✅ 正常：内存未跑满，无僵尸进程

# 3. 检查 PM2 守护进程
pm2 status
# ✅ 正常：所有进程 status 为 online，restart 次数无异常增长
```

### 1.2 日志清理
PM2 日志会无限增长，需定期检查：
```bash
ls -lh ~/.pm2/logs/
# 如果日志过大，执行清理：
pm2 flush
```
> **优化建议**：安装 `pm2-logrotate` 插件实现自动轮转。
> `pm2 install pm2-logrotate`

---

## 二、部署与更新流程 (Deployment Workflows)

所有部署必须使用 standardized script: `./deploy.sh`。

### 场景 A：快速修复 (Quick Fix)
**适用**：前端文案、样式、JS 逻辑修改（不涉及依赖变更）。
**操作**：
```bash
./deploy.sh staging quick
```
**原理**：
- 仅同步代码文件 (`.output` 目录，排除 node_modules)
- 保留服务器上已编译好的 Linux 二进制文件
- 重载 PM2 进程

### 场景 B：完整发布 (Full Release)
**适用**：`package.json` 变更、升级依赖、增加新功能模块。
**操作**：
```bash
./deploy.sh staging full
```
**原理**：
- 同步代码
- **清空** 服务器 `node_modules`
- 重写 `package.json` (移除 Mac 专有依赖)
- 使用国内镜像源重新安装所有依赖
- 重载 PM2 进程

---

## 三、灾难恢复 (Disaster Recovery)

如果服务器被意外重置或环境损坏，请按以下步骤重建。

### 3.1 基础环境安装
```bash
# 1. 安装 Node.js (v20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 安装 PM2
npm install -g pm2

# 3. 创建目录
mkdir -p /opt/fantula/nuxt-frontend
mkdir -p /opt/fantula/scripts/scheduler
chown -R root:root /opt/fantula
```

### 3.2 首次部署
在本地执行完整发布：
```bash
./deploy.sh staging full
```

### 3.3 环境变量恢复
必须手动在服务器创建 `.env` 文件（参照 `docs/SERVER_DEPLOYMENT.md` 第六章）。

---

## 四、常见问题 (Troubleshooting)

### Q: 部署后报错 `Exec format error` 或 `invalid ELF header`
**原因**：二进制文件架构不兼容 (Mac ARM64 上传到了 Linux x64)。
**解决**：
1. 不要上传 `node_modules` (deploy.sh 默认已排除)。
2. 执行一次完整部署：`./deploy.sh staging full` 强制重装依赖。

### Q: 部署卡在 `npm install`
**原因**：国内网络连接 GitHub/NPM 官方源超时。
**解决**：
`deploy.sh` 已内置 `registry.npmmirror.com` 和 Sharp 镜像源。如果仍卡住，尝试登录服务器手动执行 `npm install`看报错信息。

### Q: 页面白屏
**解决**：
执行 `pm2 logs fantula --err` 查看报错栈。常见原因是 `.env` 缺失或数据库连接失败。

---

此手册为长期维护的基准文档，任何流程变更请同步更新此文档。
