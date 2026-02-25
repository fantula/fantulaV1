import os
import re

TARGET_DIR = '/Users/dalin/fantula/nuxt-frontend/composables/client'

def scan_composables():
    findings = []
    
    init_pattern = re.compile(r'(const|function)\s+(init[a-zA-Z0-9_]*|load[a-zA-Z0-9_]*|fetch[a-zA-Z0-9_]*|fetchData)\s*=?\s*(\(async|async\s*\(|\()')
    assign_pattern = re.compile(r'\.value\s*=\s*([^;]+)')
    
    # Just looking for composables that have an init/load function but don't seem to reset basic states like loading/error/data at the start
    for root, _, files in os.walk(TARGET_DIR):
        for file in files:
            if file.endswith('.ts'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Very basic heuristic: if it has an init function, we check if there are assignments at the top of the function
                lines = content.split('\n')
                in_init = False
                assignments_found = False
                func_name = ""
                
                for i, line in enumerate(lines):
                    if not in_init:
                        match = init_pattern.search(line)
                        if match:
                            in_init = True
                            assignments_found = False
                            func_name = match.group(2)
                            # check the next 5 lines for `.value =` or `.splice` resets
                            lookahead = "\n".join(lines[i:i+6])
                            if '.value =' in lookahead or '.splice' in lookahead or '.clear(' in lookahead:
                                assignments_found = True
                    else:
                        # End of function roughly approximated by '}'
                        if line.strip() == '}':
                            in_init = False
                            if not assignments_found:
                                findings.append(f"{file} -> Function `{func_name}` might be missing state resets at initialization.")
                            
    return findings

if __name__ == "__main__":
    results = scan_composables()
    print("=== Composables Potential State Bleed ===")
    for r in results:
        print(r)
