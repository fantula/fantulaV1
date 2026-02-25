import re
import os

TARGET_FILES = [
    '/Users/dalin/fantula/nuxt-frontend/components/pc/PcProductCard.vue',
    '/Users/dalin/fantula/nuxt-frontend/components/mobile/goods/MobileProductCard.vue',
    '/Users/dalin/fantula/nuxt-frontend/pages/pc/goods/[id].vue',
    '/Users/dalin/fantula/nuxt-frontend/components/mobile/goods/ProductDetailSheet.vue'
]

def map_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    # For PcProductCard.vue
    content = content.replace('<span class="price-unit">/起</span>', '<span class="price-unit">点/起</span>')
    
    # For MobileProductCard.vue
    content = re.sub(r'(<span class="price-val text-price">.*?</span>)', r'\1<span class="currency">点</span>', content)
    
    # For pages/pc/goods/[id].vue
    content = content.replace('<span class="p-amount">{{ formatPrice(currentPrice) }}</span>', '<span class="p-amount">{{ formatPrice(currentPrice) }}点</span>')
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Patched manually: {filepath}")

for f in TARGET_FILES:
    map_file(f)
