import os
import re

TARGET_DIR = '/Users/dalin/fantula/nuxt-frontend/pages/mobile'

def scan_mobile_pages():
    findings = []
    
    for root, _, files in os.walk(TARGET_DIR):
        for file in files:
            if file.endswith('.vue'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                    # Search for style blocks
                    style_match = re.search(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
                    if style_match:
                        styles = style_match.group(1)
                        # Look for main page container classes (usually stars with .mobile- or .page-)
                        # and check if it has overflow-y: auto
                        
                        has_height_100 = 'height: 100%' in styles or 'height:100%' in styles
                        has_overflow = 'overflow-y: auto' in styles or 'overflow-y:auto' in styles
                        
                        # Only flag files that have a style block but missing these critical scrolling rules
                        # (some might be completely wrapper-less and rely on layouts, but most should have it)
                        if not (has_height_100 and has_overflow):
                            findings.append(f"{path} -> Missing standardized height: 100% and overflow-y: auto")
                    else:
                        findings.append(f"{path} -> No <style> block found")
                        
    return findings

if __name__ == "__main__":
    results = scan_mobile_pages()
    print("=== Mobile Pages Missing Explicit Scroll Containers ===")
    for r in results:
        print(r)
