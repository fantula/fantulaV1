# 个人中心文案与弹窗审计报告 (Profile Copy Audit)

## 1. 弹窗统计 (Total: 7)

| 组件名 | 当前标题 (Current Title) | 当前状态 | 优化建议 (Soulful Proposal) |
| :--- | :--- | :--- | :--- |
| `ChangeNicknameModal` | **修改昵称** | ✅ BaseModal | **重塑代号** (Rebrand Identity) |
| `ChangeAvatarModal` | **修改头像** | ✅ BaseModal | **源相重构** (Avatar Reconstruction) |
| `BindEmailModal` | **换绑邮箱** | ✅ Premium BaseModal | **神经连结** (Neurolink Binding) |
| `ChangePasswordModal` | **更新密码** | ✅ BaseModal | **密钥重置** (Key Override) |
| `DeleteAccountModal` | **注销账号** | ✅ BaseModal | **数据焚毁** (Protocol: PURGE) |
| `BindGoogleModal` | **绑定谷歌邮箱** | ⚠️ Custom Modal (不统一) | **天网接入** (Skynet Link) <br> *(需重构为 BaseModal)* |
| `WalletRechargeModal` | **购置额度** | ⚠️ Custom Modal (不统一) | **能量注入** (Power Injection) <br> *(需重构为 BaseModal)* |

---

## 2. 提示消息 (Notifications Audit)

您目前的提示 (ElMessage) 比较“官方/生硬”。以下是扫描到的主要提示及“抽象化”建议：

### A. 成功类 (Success)
| 场景 | 当前文案 | 抽象/搞怪建议 (Soulful Copy) |
| :--- | :--- | :--- |
| 头像更新 | "头像更新成功" | **"新形象已写入矩阵。"** |
| 昵称更新 | "昵称更新成功" | **"代号重置完毕，请勿再次更名。"** |
| 邮箱验证 | "验证码已发送" | **"安全信标已发射，请捕获。"** |
| 复制UID | "UID已复制" | **"身份序列已在剪贴板中就绪。"** |
| 充值成功 | (未找到，可能在逻辑中) | **"能量充盈。去创造奇迹吧。"** |

### B. 错误/警告类 (Error/Warning)
| 场景 | 当前文案 | 抽象/搞怪建议 (Soulful Copy) |
| :--- | :--- | :--- |
| 验证失败 | "验证码错误" | **"访问拒绝。您的信标似乎已损坏。"** |
| 发送失败 | "发送失败" | **"信号干扰严重，请稍后重试。"** |
| 注销警告 | "账号注销是不可恢复的操作..." | **"警告：此操作将执行数据清除程序。不可逆转。"** |
| 表单验证 | "新邮箱不能与当前邮箱相同" | **"逻辑错误：请输入一个 *不* 一样的目标。"** |

---

## 3. 下一步行动计划 (Action Plan)

1.  **全局样式统一**: 
    - 强制重写 `ElMessage` 样式，让所有提示变成“悬浮玻璃条”。
2.  **弹窗重构**:
    - 将 `BindGoogleModal` 和 `WalletRechargeModal` 迁移到 `BaseModal`，统一视觉风格。
3.  **文案注入**:
    - 如果您喜欢上面的“抽象建议”，我将直接修改代码中的文案。
