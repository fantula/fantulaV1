# 微信支付 Supabase Secrets 配置指南

## 本地开发环境配置

在 `supabase/functions/.env` 文件中添加以下环境变量：

```bash
# 微信支付配置
WECHAT_PAY_MCHID=1716074381
WECHAT_PAY_APPID=wxc2042fae927b28b8
WECHAT_PAY_API_V3_KEY=lWm9tNYwCIDsnzhedfqz1QVvK4pmAoBb
WECHAT_PAY_SERIAL_NO=53245181B4BB24F7AC58045148ED958C04057735F9
WECHAT_PAY_NOTIFY_URL=https://www.fantula.com/functions/v1/wechat-notify

# 商户私钥（将 apiclient_key.pem 内容转为单行）
WECHAT_PAY_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...（完整私钥内容，换行符替换为\n）...-----END PRIVATE KEY-----"
```

## 生产环境配置

使用 Supabase CLI 设置 Secrets：

```bash
# 设置各项配置
supabase secrets set WECHAT_PAY_MCHID=1716074381
supabase secrets set WECHAT_PAY_APPID=wxc2042fae927b28b8
supabase secrets set WECHAT_PAY_API_V3_KEY=lWm9tNYwCIDsnzhedfqz1QVvK4pmAoBb
supabase secrets set WECHAT_PAY_SERIAL_NO=53245181B4BB24F7AC58045148ED958C04057735F9
supabase secrets set WECHAT_PAY_NOTIFY_URL=https://www.fantula.com/functions/v1/wechat-notify

# 设置私钥（从文件读取）
supabase secrets set WECHAT_PAY_PRIVATE_KEY="$(cat /path/to/apiclient_key.pem)"
```

## 微信商户后台配置

1. **支付授权目录**（Native/JSAPI 都需要）：
   - 登录 [微信商户平台](https://pay.weixin.qq.com)
   - 产品中心 → 开发配置 → 支付授权目录
   - 添加：`https://www.fantula.com/`

2. **Native 支付回调地址**：
   - 在代码中已配置为：`https://www.fantula.com/functions/v1/wechat-notify`

## 本地测试

1. 运行数据库迁移：
   ```bash
   cd supabase
   supabase db push
   ```

2. 启动 Edge Functions：
   ```bash
   supabase functions serve
   ```

3. 启动前端：
   ```bash
   cd nuxt-frontend
   npm run dev
   ```

4. 访问充值页面测试
