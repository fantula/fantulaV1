import os
import re
import json

TARGET_DIRS = [
    '/Users/dalin/fantula/nuxt-frontend/pages/manager_portal/coupons'
]

def scan_vue_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the script block
    script_match = re.search(r'<script.*?>.*?</script>', content, re.DOTALL)
    script_content = script_match.group(0) if script_match else ""

    # Find all buttons
    button_pattern = re.compile(r'<el-button([^>]*?)>(.*?)</el-button>|<button([^>]*?)>(.*?)</button>', re.DOTALL)
    
    results = []
    
    for match in button_pattern.finditer(content):
        attrs = match.group(1) or match.group(3) or ""
        text_content = match.group(2) or match.group(4) or ""
        
        # Clean text
        text_clean = re.sub(r'<[^>]+>', '', text_content).strip()
        
        # Extract click binding
        click_match = re.search(r'@click[a-zA-Z\.]*="([^"]+)"', attrs)
        click_handler = click_match.group(1) if click_match else None
        
        # Determine base handler name (e.g., handleSave() -> handleSave, handleDel(row) -> handleDel)
        base_handler = None
        if click_handler:
            base_handler_match = re.match(r'^([a-zA-Z0-9_\$]+)', click_handler)
            if base_handler_match:
                base_handler = base_handler_match.group(1)
        
        # Extract loading binding
        loading_match = re.search(r':loading="([^"]+)"', attrs)
        has_loading = bool(loading_match)
        
        # Check if handler exists and has logic
        handler_exists = False
        has_error_handling = False
        has_loading_logic = False
        
        if base_handler and script_content:
            handler_exists = f"const {base_handler}" in script_content or f"function {base_handler}" in script_content
            
            # Try to grab the handler body roughly
            body_pattern = re.compile(f'(const {base_handler}\\s*=\\s*.*?{{.*?}})', re.DOTALL)
            body_match = body_pattern.search(script_content)
            if body_match:
                body = body_match.group(1)
                if 'try' in body and 'catch' in body or 'ElMessage' in body or 'error' in body:
                    has_error_handling = True
                if 'Loading' in body or 'loading' in body or 'value = true' in body:
                    has_loading_logic = True

        status = {
            'text': text_clean[:20].replace('\n', ' '),
            'attrs': attrs.strip(),
            'handler': click_handler,
            'has_click': bool(click_handler),
            'handler_exists': handler_exists,
            'has_loading_prop': has_loading,
            'has_error_handling': has_error_handling
        }
        
        # Only log meaningful action buttons
        if click_handler or text_clean:
            results.append(status)
            
    return results

def main():
    report = []
    for d in TARGET_DIRS:
        for root, dirs, files in os.walk(d):
            for file in files:
                if file.endswith('.vue'):
                    path = os.path.join(root, file)
                    rel_path = os.path.relpath(path, '/Users/dalin/fantula/nuxt-frontend')
                    buttons = scan_vue_file(path)
                    if buttons:
                        report.append(f"\\n### File: {rel_path}")
                        for idx, b in enumerate(buttons):
                            # Skip common pagination or irrelevant pure dialog close buttons
                            if not b['text'] and not b['handler']: continue
                            if 'dialogVisible = false' in (b['handler'] or ''): continue
                            
                            row = f"- Button: `{b['text'] or 'Icon/Empty'}`"
                            row += f"\\n  - @click: `{b['handler']}` {'✅' if b['has_click'] else '❌ Missing'}"
                            if b['has_click']:
                                row += f"\\n  - Function Defined: {'✅' if b['handler_exists'] else '❌ No (or inline)'}"
                            row += f"\\n  - Loading Prop: {'✅' if b['has_loading_prop'] else '❌ Missing'}"
                            if b['handler_exists']:
                                row += f"\\n  - Error Handling/Try-Catch: {'✅' if b['has_error_handling'] else '❌ Missing'}"
                            report.append(row)
                            
    with open('/Users/dalin/fantula/audit_report.md', 'w') as f:
        f.write("# Admin Operation Button Audit Report\\n\\n")
        f.write("\\n".join(report))
        
    print("Report generated at /Users/dalin/fantula/audit_report.md")

if __name__ == '__main__':
    main()
