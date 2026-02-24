import os
import re

components_dir = '/Users/dalin/fantula/nuxt-frontend/components'
pages_dir = '/Users/dalin/fantula/nuxt-frontend/pages'

files = []
for d in [components_dir, pages_dir]:
    for root, _, filenames in os.walk(d):
        for f in filenames:
            if f.endswith('.vue'):
                files.append(os.path.join(root, f))

report = []

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    imports = re.findall(r'import\s+([A-Z]\w*(?:Modal|Sheet|Dialog))\s+from', content)
    
    issues = []
    for imp in imports:
        kebab_case = re.sub(r'(?<!^)(?=[A-Z])', '-', imp).lower()
        if f'<{imp}' not in content and f'<{kebab_case}' not in content:
            issues.append(f"Imported popup '{imp}' but not rendered in template")
            
    if issues:
         report.append(f"File: {file}\n" + "\n".join(issues))
         
if report:
    print("\n\n".join(report))
else:
    print("All imported modals/sheets/dialogs are rendered.")
