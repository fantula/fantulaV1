import os
import re

mobile_dirs = [
    '/Users/dalin/fantula/nuxt-frontend/pages/mobile',
    '/Users/dalin/fantula/nuxt-frontend/components/mobile',
    '/Users/dalin/fantula/nuxt-frontend/composables/mobile',
    '/Users/dalin/fantula/nuxt-frontend/layouts'
]

violations = {
    'element_plus': [],
    'el_message': [],
    'el_icon': [],
    'unprotected_console': [],
    'missing_lazy_img': [],
    'hardcoded_currency': [],
    'unprotected_amount': []
}

for d in mobile_dirs:
    if not os.path.exists(d): continue
    for root, _, files in os.walk(d):
        for f in files:
            if not f.endswith(('.vue', '.ts', '.js')): continue
            # Exclude pc layouts in layouts dir
            if 'layouts' in d and f != 'mobile.vue': continue
            
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                lines = file.readlines()
            
            for i, line in enumerate(lines):
                line_num = i + 1
                
                # Element Plus component tags (excluding el-icon)
                if re.search(r'<el-(?!icon)', line):
                    violations['element_plus'].append((filepath.replace('/Users/dalin/fantula/nuxt-frontend/', ''), line_num, line.strip()))
                
                # El-Icon usage
                if re.search(r'<el-icon', line):
                    violations['el_icon'].append((filepath.replace('/Users/dalin/fantula/nuxt-frontend/', ''), line_num, line.strip()))
                    
                # ElMessage
                if 'ElMessage' in line and 'import' not in line:
                    violations['el_message'].append((filepath.replace('/Users/dalin/fantula/nuxt-frontend/', ''), line_num, line.strip()))
                    
                # Unprotected console
                if 'console.' in line and 'import.meta.dev' not in line:
                    if not line.strip().startswith('//'):
                        violations['unprotected_console'].append((filepath.replace('/Users/dalin/fantula/nuxt-frontend/', ''), line_num, line.strip()))
                            
                # Missing lazy loading
                if '<img' in line and 'loading=' not in line:
                    violations['missing_lazy_img'].append((filepath.replace('/Users/dalin/fantula/nuxt-frontend/', ''), line_num, line.strip()))
                    
                # Hardcoded currency
                if '¥' in line or '￥' in line:
                    violations['hardcoded_currency'].append((filepath.replace('/Users/dalin/fantula/nuxt-frontend/', ''), line_num, line.strip()))
                    
                # Unprotected amount parsing
                if re.search(r'Number\([^)]+\)\.toFixed', line):
                    violations['unprotected_amount'].append((filepath.replace('/Users/dalin/fantula/nuxt-frontend/', ''), line_num, line.strip()))

# Output results to stdout
for cat, items in violations.items():
    print(f"=== {cat} ===")
    for item in items:
        print(f"{item[0]}:{item[1]} -> {item[2]}")
        
print("END_OF_SCAN")
