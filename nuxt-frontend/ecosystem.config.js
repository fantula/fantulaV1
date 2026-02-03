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
                NITRO_HOST: '127.0.0.1'
            }
        }
    ]
}
