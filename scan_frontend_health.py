import os
import re

TARGET_DIRS = [
    '/Users/dalin/fantula/nuxt-frontend/pages/pc',
    '/Users/dalin/fantula/nuxt-frontend/pages/mobile',
    '/Users/dalin/fantula/nuxt-frontend/components/pc',
    '/Users/dalin/fantula/nuxt-frontend/components/mobile',
    '/Users/dalin/fantula/nuxt-frontend/composables/client'
]

def scan_files():
    console_pattern = re.compile(r'[^a-zA-Z_](console\.(log|error|warn|info)\()')
    dev_guard_pattern = re.compile(r'if\s*\(\s*import\.meta\.dev\s*\)')
    timeout_pattern = re.compile(r'setTimeout\(')
    
    findings = {
        'unprotected_console': [],
        'set_timeout': [],
    }

    for d in TARGET_DIRS:
        for root, _, files in os.walk(d):
            for file in files:
                if file.endswith(('.vue', '.ts', '.js')):
                    path = os.path.join(root, file)
                    with open(path, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        
                    for i, line in enumerate(lines):
                        # 1. Check Console
                        if console_pattern.search(line):
                            # Check if current line or previous line has dev guard
                            has_guard = dev_guard_pattern.search(line)
                            if not has_guard and i > 0:
                                has_guard = dev_guard_pattern.search(lines[i-1])
                            
                            # Additional check for commented out consoles
                            if not line.strip().startswith('//') and not has_guard:
                                findings['unprotected_console'].append(f"{path}:{i+1} -> {line.strip()}")
                                
                        # 2. Check SetTimeout
                        if timeout_pattern.search(line) and not line.strip().startswith('//'):
                             findings['set_timeout'].append(f"{path}:{i+1} -> {line.strip()}")

    return findings

if __name__ == "__main__":
    results = scan_files()
    
    print("=== Unprotected Console Statements ===")
    for r in results['unprotected_console']:
        print(r)
        
    print("\n=== setTimeout (Potential Fake API Delays) ===")
    for r in results['set_timeout']:
        print(r)
