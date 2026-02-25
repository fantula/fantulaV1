import re
import os

TARGET_DIRS = [
    '/Users/dalin/fantula/nuxt-frontend/composables/client',
    '/Users/dalin/fantula/nuxt-frontend/components/pc/modal',
    '/Users/dalin/fantula/nuxt-frontend/pages/mobile',
]

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    console_pattern = re.compile(r'^(\s*)(console\.(log|error|warn|info)\()')
    dev_guard = 'if (import.meta.dev)'
    dev_guard_pattern = re.compile(r'if\s*\(\s*import\.meta\.dev\s*\)')
    
    inline_pattern = re.compile(r'(\}\s*catch\s*\([^)]+\)\s*\{\s*)(console\.(log|error|warn|info)\()')
    
    modified = False
    
    for i in range(len(lines)):
        
        if dev_guard in lines[i] or (i > 0 and dev_guard_pattern.search(lines[i-1])):
            continue
            
        if inline_pattern.search(lines[i]):
            lines[i] = inline_pattern.sub(r'\1' + dev_guard + r' \2', lines[i])
            modified = True
            continue
            
        match = console_pattern.search(lines[i])
        if match:
            indent = match.group(1)
            lines[i] = f"{indent}{dev_guard} {lines[i].lstrip()}"
            modified = True
            
    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print(f"Fixed: {file_path}")

for d in TARGET_DIRS:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith(('.vue', '.ts')):
                process_file(os.path.join(root, file))
