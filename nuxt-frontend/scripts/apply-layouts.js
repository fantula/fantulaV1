const fs = require('fs');
const path = require('path');

const walk = (dir, callback) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        const stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            walk(filepath, callback);
        } else if (file.endsWith('.vue')) {
            callback(filepath);
        }
    }
};

const updateFile = (filepath, layout, middleware = null) => {
    let content = fs.readFileSync(filepath, 'utf8');

    // Check if layout is already defined to avoid double insertion or overwrite if correct
    // Simple check: if it says `layout: '${layout}'` we might skip, but better to be safe.

    const hasDefinePageMeta = content.includes('definePageMeta({');

    if (hasDefinePageMeta) {
        // Try to insert properties into existing Object
        // This is a naive regex replacement but works for standard formatting
        // We look for `definePageMeta({` and add our props right after.

        let newProps = `layout: '${layout}',`;
        if (middleware) {
            newProps += ` middleware: ${JSON.stringify(middleware)},`;
        }

        // Check if layout is already explicitly set
        if (!content.includes(`layout:`)) {
            content = content.replace(/(definePageMeta\(\s*\{)/, `$1\n  ${newProps}`);
            console.log(`Updated existing meta in ${filepath}`);
            fs.writeFileSync(filepath, content);
        } else {
            // If layout exists but might be different or same, we warn/skip. 
            // Ideally we should replace it, but let's assume if it exists it might be intentional or needs manual check if it differs.
            // But for this task, we want STRICT separation. So we should enforce it.
            // Let's replace `layout: '...'` with our layout.
            content = content.replace(/layout:\s*['"][^'"]+['"]/, `layout: '${layout}'`);

            // Handle middleware for admin
            if (middleware) {
                if (!content.includes('middleware:')) {
                    content = content.replace(/(definePageMeta\(\s*\{)/, `$1\n  middleware: ${JSON.stringify(middleware)},`);
                } else {
                    // Check if middleware includes ours. simple string check
                    if (!content.includes('mgmt-auth')) {
                        // This is too complex to regex robustly without AST. 
                        // We will just append logic: if middleware exists, we assume it might be array.
                        // For now, let's just log this case.
                        console.log(`[MANUAL CHECK NEEDED] Middleware already exists in ${filepath}`);
                    }
                }
            }
            console.log(`Enforced layout in existing meta in ${filepath}`);
            fs.writeFileSync(filepath, content);
        }
    } else {
        // No definePageMeta, insert it
        const scriptSetupRegex = /<script\s+setup[^>]*>/;
        const match = content.match(scriptSetupRegex);

        if (match) {
            let metaBlock = `\ndefinePageMeta({\n  layout: '${layout}'`;
            if (middleware) {
                metaBlock += `,\n  middleware: ${JSON.stringify(middleware)}`;
            }
            metaBlock += `\n})\n`;

            content = content.replace(scriptSetupRegex, `${match[0]}${metaBlock}`);
            console.log(`Inserted new meta in ${filepath}`);
            fs.writeFileSync(filepath, content);
        } else {
            console.log(`[SKIP] No <script setup> found in ${filepath}`);
        }
    }
};

// Admin
console.log('--- Processing Admin ---');
walk(path.resolve(__dirname, '../pages/admin'), (f) => updateFile(f, 'mgmt', ['mgmt-auth']));

// PC
console.log('--- Processing PC ---');
walk(path.resolve(__dirname, '../pages/pc'), (f) => updateFile(f, 'pc'));

// Mobile
console.log('--- Processing Mobile ---');
walk(path.resolve(__dirname, '../pages/mobile'), (f) => updateFile(f, 'mobile'));
