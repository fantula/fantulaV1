import os
import re

directories = [
    '/Users/dalin/fantula/nuxt-frontend/pages/pc',
    '/Users/dalin/fantula/nuxt-frontend/pages/mobile',
    '/Users/dalin/fantula/nuxt-frontend/components/pc',
    '/Users/dalin/fantula/nuxt-frontend/components/mobile',
    '/Users/dalin/fantula/nuxt-frontend/composables/client',
    '/Users/dalin/fantula/nuxt-frontend/composables/mobile',
]

issues = {
    'hardcoded_routes': [],
    'raw_price': [],
    'set_timeout': [],
    'unprotected_console': [],
    'missing_mobile_scroll': [],
    'unused_components': [],
    'empty_div': []
}

for d in directories:
    if not os.path.exists(d): continue
    for root, _, files in os.walk(d):
        for f in files:
            if not f.endswith(('.vue', '.ts')): continue
            is_mobile_page = 'pages/mobile' in root
            
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
                lines = content.split('\n')
            
            short_path = filepath.replace('/Users/dalin/fantula/nuxt-frontend/', '')
            
            # For unused components
            script_imports = re.findall(r'import\s+([A-Z]\w+)\s+from\s+[\'"](?:components|\.|~)', content)
            template_content = ''
            template_match = re.search(r'<template>(.*?)</template>', content, re.DOTALL)
            if template_match:
                template_content = template_match.group(1)
            
            for comp in script_imports:
                # Check if it's used in template (kebab-case or PascalCase)
                kebab_comp = re.sub(r'(?<!^)(?=[A-Z])', '-', comp).lower()
                if comp not in template_content and kebab_comp not in template_content:
                    issues['unused_components'].append(f"{short_path} - {comp}")

            # Missing mobile scroll
            if is_mobile_page and f.endswith('.vue'):
                if 'min-height: 100vh' in content and 'overflow-y: auto' not in content:
                    issues['missing_mobile_scroll'].append(f"{short_path} - missing overflow-y: auto")

            for i, line in enumerate(lines):
                line_num = i + 1
                line_strip = line.strip()
                if line_strip.startswith('//') or line_strip.startswith('<!--'): continue
                
                # Unprotected console
                if bool(re.search(r'console\.(log|error|warn)', line)) and 'import.meta.dev' not in line:
                    issues['unprotected_console'].append(f"{short_path}:{line_num} - {line_strip}")
                
                # Hardcoded routes
                if bool(re.search(r'(router\.push|navigateTo)\s*\(\s*[\'"`]/', line)):
                    issues['hardcoded_routes'].append(f"{short_path}:{line_num} - {line_strip}")
                
                # setTimeout
                if bool(re.search(r'setTimeout\s*\(', line)):
                    issues['set_timeout'].append(f"{short_path}:{line_num} - {line_strip}")
                    
                # Empty div
                if bool(re.search(r'<div[^>]*>\s*</div>', line)):
                    issues['empty_div'].append(f"{short_path}:{line_num} - {line_strip}")
                
                # Raw price
                if '{{' in line and '}}' in line and ('price' in line.lower() or 'amount' in line.lower()) and 'toFixed' not in line:
                    issues['raw_price'].append(f"{short_path}:{line_num} - {line_strip}")

for cat, item_list in issues.items():
    print(f"=== {cat} ===")
    for item in sorted(list(set(item_list))): # deduplicate
        print(item)
print("END_OF_SCAN")
