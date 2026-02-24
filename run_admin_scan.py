import os
import re

directories = [
    '/Users/dalin/fantula/nuxt-frontend/pages/manager_portal',
    '/Users/dalin/fantula/nuxt-frontend/components/admin',
    '/Users/dalin/fantula/nuxt-frontend/composables/admin'
]

issues = {
    'hardcoded_routes': [],
    'unprotected_console': [],
    'unused_components': [],
    'empty_div': [],
    'missing_try_catch': [],
    'router_view_usage': [],
    'commented_dead_code': []
}

for d in directories:
    if not os.path.exists(d): continue
    for root, _, files in os.walk(d):
        for f in files:
            if not f.endswith(('.vue', '.ts')): continue
            
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
                lines = content.split('\n')
            
            short_path = filepath.replace('/Users/dalin/fantula/nuxt-frontend/', '')
            
            # For unused components
            script_imports = re.findall(r'import\s+([A-Z]\w+)\s+from\s+[\'"](?:components|\.|~|@)', content)
            template_content = ''
            template_match = re.search(r'<template>(.*?)</template>', content, re.DOTALL)
            if template_match:
                template_content = template_match.group(1)
            
            for comp in script_imports:
                kebab_comp = re.sub(r'(?<!^)(?=[A-Z])', '-', comp).lower()
                if comp not in template_content and kebab_comp not in template_content:
                    # Ignore icons commonly imported dynamically or components not meant for template
                    if 'Icon' not in comp and 'Cell' not in comp:
                        issues['unused_components'].append(f"{short_path} - {comp}")

            # Check logic in file
            has_api_call = 'Api.' in content or 'api.' in content
            has_try_catch = 'try {' in content or 'try{' in content
            
            if has_api_call and not has_try_catch and f.endswith('.vue'):
                issues['missing_try_catch'].append(f"{short_path} - missing try/catch for API call")

            in_comment_block = False
            for i, line in enumerate(lines):
                line_num = i + 1
                line_strip = line.strip()
                
                # router-view usage
                if '<router-view' in line_strip:
                    issues['router_view_usage'].append(f"{short_path}:{line_num} - {line_strip}")
                
                # block comments
                if line_strip.startswith('/*'): in_comment_block = True
                if in_comment_block:
                    if '*/' in line_strip: in_comment_block = False
                    continue
                    
                if line_strip.startswith('//') or line_strip.startswith('<!--'): 
                    # dead code check heuristically (starts with comment but looks like code)
                    if bool(re.search(r'//\s*(const|let|var|if|function|return|import|export)\s+', line_strip)):
                        issues['commented_dead_code'].append(f"{short_path}:{line_num} - {line_strip}")
                    elif bool(re.search(r'<!--\s*<[A-Za-z]+', line_strip)):
                        issues['commented_dead_code'].append(f"{short_path}:{line_num} - {line_strip}")
                    continue
                
                # Unprotected console
                if bool(re.search(r'console\.(log|error|warn)', line)) and 'import.meta.dev' not in line:
                    issues['unprotected_console'].append(f"{short_path}:{line_num} - {line_strip}")
                
                # Hardcoded routes
                if bool(re.search(r'(router\.push|navigateTo)\s*\(\s*[\'"`]/', line)):
                    issues['hardcoded_routes'].append(f"{short_path}:{line_num} - {line_strip}")
                    
                # Empty div
                if bool(re.search(r'<div[^>]*>\s*</div>', line)) or bool(re.search(r'<el-[a-z-]+[^>]*>\s*</el-[a-z-]+>', line)):
                    # Allow structural elements to be empty sometimes, but basic div is bad
                    if bool(re.search(r'<div[^>]*>\s*</div>', line)):
                        issues['empty_div'].append(f"{short_path}:{line_num} - {line_strip}")

for cat, item_list in issues.items():
    print(f"=== {cat} ===")
    for item in sorted(list(set(item_list))): # deduplicate
        print(item)
print("END_OF_SCAN")
