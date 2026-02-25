import re
import os

TARGET_DIRS = [
    '/Users/dalin/fantula/nuxt-frontend/pages',
    '/Users/dalin/fantula/nuxt-frontend/components'
]

def reskin_currency(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content

    # 1. Direct template replacements: ¥{{ var }} -> {{ var }}点
    content = re.sub(r'¥\s*\{\{([^}]+)\}\}', r'{{\1}}点', content)
    
    # 2. Hardcoded specific spans/divs with ¥ string prefix
    content = re.sub(r'(>)\s*¥\s*([0-9.]+)', r'\1\2点', content)
    
    # 3. Element plus templates: <template #prefix>¥</template> -> <template #suffix>点</template>
    content = re.sub(r'<template #prefix>\s*¥\s*</template>', r'<template #suffix>点</template>', content)
    content = re.sub(r'prefix="¥"', r'suffix="点"', content)
    
    # 4. In JS literals: `¥${var}` -> `${var}点`
    content = re.sub(r'`\s*¥\s*\$\{([^}]+)\}`', r'`${\1}点`', content)
    
    # 5. String concatenation: '¥' + var -> var + '点'
    content = re.sub(r"'¥'\s*\+\s*([a-zA-Z0-9_\.]+)", r"\1 + '点'", content)
    
    # 6. Some leftover spans with raw ¥ symbol without variable
    content = re.sub(r'<span[^>]*>\s*¥\s*</span>', r'<span class="currency-unit">点</span>', content)
    content = re.sub(r'<small>\s*¥\s*</small>', r'<small>点</small>', content)
    
    # 7. Use of useBizFormat sometimes is bare: {{ formatPrice(val) }} (with no ¥)
    # But wait, we shouldn't blindly append "点" to every {{ formatPrice() }} if we already handled the ¥ prefix.
    # The previous regex (1) handled `¥{{ formatPrice() }}` -> `{{ formatPrice() }}点`.
    # Let's see if there are naked formatPrice that need '点'.
    # In MobileProductCard: `<span class="price-val text-price">{{ formatPrice(goods.display_price || goods.price) }}</span>` 
    # That one has no ¥ currently ? Actually let me check. 

    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Reskinned: {file_path}")

for d in TARGET_DIRS:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.vue') or file.endswith('.ts'):
                reskin_currency(os.path.join(root, file))
