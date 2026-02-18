const fs = require('fs');
const path = require('path');

const envPath = '/opt/fantula/nuxt-frontend/.env';
const envConfig = {};

try {
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach(line => {
            const match = line.match(/^\s*([^=]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                let value = match[2] || '';
                if (value && value.length > 0 &&
                    ((value.startsWith('"') && value.endsWith('"')) ||
                        (value.startsWith("'") && value.endsWith("'")))) {
                    value = value.substring(1, value.length - 1);
                }
                if (match[1] && value) {
                    envConfig[match[1]] = value;
                }
            }
        });
        console.log('Loaded env vars from:', envPath);
    }
} catch (e) {
    console.error('Failed to load .env file:', e);
}

module.exports = {
    apps: [
        {
            name: 'fantula',
            port: 3000,
            exec_mode: 'fork',
            instances: 1,
            script: '/opt/fantula/nuxt-frontend/.output/server/index.mjs',
            env: {
                ...envConfig,
                NODE_ENV: 'production',
                PORT: 3000,
                NITRO_PORT: 3000,
                NITRO_HOST: '127.0.0.1',
                // NUXT_ 前缀映射，确保 runtimeConfig 在运行时被正确覆盖
                // （即使构建时烘焙了错误的本地值）
                NUXT_PUBLIC_API_BASE: envConfig.SUPABASE_URL || '',
                NUXT_PUBLIC_SUPABASE_URL: envConfig.SUPABASE_URL || '',
                NUXT_PUBLIC_SUPABASE_ANON_KEY: envConfig.SUPABASE_KEY || '',
                NUXT_SUPABASE_KEY: envConfig.SUPABASE_KEY || '',
                NUXT_SUPABASE_SERVICE_KEY: envConfig.SUPABASE_SERVICE_KEY || '',
                // 微信支付配置
                NUXT_WECHAT_PAY_MCHID: envConfig.WECHAT_PAY_MCHID || '',
                NUXT_WECHAT_PAY_APPID: envConfig.WECHAT_PAY_APPID || '',
                NUXT_WECHAT_PAY_API_V3_KEY: envConfig.WECHAT_PAY_API_V3_KEY || '',
                NUXT_WECHAT_PAY_SERIAL_NO: envConfig.WECHAT_PAY_SERIAL_NO || '',
                NUXT_WECHAT_PAY_PRIVATE_KEY: envConfig.WECHAT_PAY_PRIVATE_KEY || '',
                NUXT_WECHAT_PAY_NOTIFY_URL: envConfig.WECHAT_PAY_NOTIFY_URL || '',
                NUXT_WECHAT_APP_SECRET: envConfig.WECHAT_APP_SECRET || '',
                NUXT_PUBLIC_WECHAT_APPID: envConfig.WECHAT_PAY_APPID || '',
            }
        }
    ]
}
