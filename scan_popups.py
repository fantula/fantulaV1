import os
import glob
import re

directories = ['/Users/dalin/fantula/nuxt-frontend/components/pc', '/Users/dalin/fantula/nuxt-frontend/components/mobile', '/Users/dalin/fantula/nuxt-frontend/components/shared']

files = []
for d in directories:
    for root, _, filenames in os.walk(d):
        for f in filenames:
            if ('Modal' in f or 'Sheet' in f or 'Dialog' in f) and f.endswith('.vue'):
                files.append(os.path.join(root, f))

report = []

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        lines = content.split('\n')
        
    issues = []
    
    # Check 1: console.log without import.meta.dev
    for i, line in enumerate(lines):
        if 'console.' in line and 'import.meta.dev' not in line and not line.strip().startswith('//'):
            issues.append(f"Line {i+1}: Unprotected console statement - {line.strip()}")
            
    # Check 2: hardcoded routes
    for i, line in enumerate(lines):
        if re.search(r'(router\.push|navigateTo)\s*\(\s*[\'"`]/', line):
            if 'mobileRoutes' not in line and 'pcRoutes' not in line:
                issues.append(f"Line {i+1}: Hardcoded route string in push/navigateTo - {line.strip()}")
                
    # Check 3: setTimeout
    for i, line in enumerate(lines):
        if re.search(r'setTimeout\s*\(', line) and not line.strip().startswith('//'):
            issues.append(f"Line {i+1}: setTimeout found - {line.strip()}")
            
    # Check 4: empty div
    for i, line in enumerate(lines):
        if re.search(r'<div[^>]*>\s*</div>', line):
             issues.append(f"Line {i+1}: Empty div tag found - {line.strip()}")
             
    # Check 5: price display without toFixed
    for i, line in enumerate(lines):
        if 'price' in line.lower() and '{{' in line and 'toFixed' not in line:
            issues.append(f"Line {i+1}: Potential raw price rendering without formatting - {line.strip()}")

    if issues:
        report.append(f"File: {file}\n" + "\n".join(issues))

if report:
    print("\n\n".join(report))
else:
    print("No issues found base on script criteria.")
