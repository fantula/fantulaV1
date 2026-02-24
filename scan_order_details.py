import os
import re

# 订单详情页相关的目录
ORDER_DIRS = [
    '/Users/dalin/fantula/nuxt-frontend/pages/pc/profile/order',
    '/Users/dalin/fantula/nuxt-frontend/pages/mobile/profile/order',
    '/Users/dalin/fantula/nuxt-frontend/components/pc/order',
    '/Users/dalin/fantula/nuxt-frontend/components/mobile/order',
    '/Users/dalin/fantula/nuxt-frontend/composables/client'
]

# 检查项的正则表达式
RULES = {
    'unprotected_console': re.compile(r'console\.(log|warn|error)\('), # Will filter false positives in scan_file
    'hardcoded_mobileRoutes': re.compile(r'navigateTo\(([\'"])/mobile/.*?([\'"])\)'),
    'hardcoded_pcRoutes': re.compile(r'navigateTo\(([\'"])/(pc|profile|index|help|faq).*?([\'"])\)'),
    'raw_price': re.compile(r'\{\{\s*price\s*\}\}|\{\{\s*total_amount\s*\}\}|\{\{\s*amount\s*\}\}'),
    'empty_div': re.compile(r'<div\s+class="[^"]*"\s*>\s*</div>'),
    'set_timeout': re.compile(r'setTimeout\(')
}

def scan_file(filepath):
    issues = {k: [] for k in RULES}
    
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for i, line in enumerate(lines):
        for rule_name, pattern in RULES.items():
            # 过滤掉注释
            if line.strip().startswith('//') or line.strip().startswith('<!--'):
                continue
                
            if pattern.search(line):
                # 针对特定规则进行过滤
                if rule_name == 'unprotected_console' and 'import.meta.dev' in line:
                    continue
                if rule_name == 'empty_div' and ('spinner' in line or 'radio' in line or 'clear' in line):
                    continue
                issues[rule_name].append((i + 1, line.strip()))
                
    return issues

def main():
    print("🚀 开始扫描订单详情相关文件...\n")
    
    total_issues = 0
    all_files = []
    
    for dirpath in ORDER_DIRS:
        if not os.path.exists(dirpath):
            continue
        for root, _, files in os.walk(dirpath):
            for file in files:
                if file.endswith('.vue') or file.endswith('.ts'):
                    # 针对 composables，只扫相关的
                    if 'composables' in dirpath and 'Order' not in file:
                        continue
                    all_files.append(os.path.join(root, file))
                    
    for filepath in all_files:
        issues = scan_file(filepath)
        has_issue = any(len(v) > 0 for v in issues.values())
        
        if has_issue:
            rel_path = os.path.relpath(filepath, '/Users/dalin/fantula/nuxt-frontend')
            print(f"📄 {rel_path}:")
            
            for rule_name, matched in issues.items():
                if matched:
                    print(f"  [{rule_name}] 发现 {len(matched)} 处:")
                    for line_num, content in matched:
                        print(f"    Line {line_num}: {content[:100]}")
                        total_issues += 1
            print("-" * 40)
            
    print(f"\n✅ 扫描完毕，发现 {total_issues} 个潜在问题。")

if __name__ == '__main__':
    main()
