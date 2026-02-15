import os
import plistlib
import subprocess
import datetime
import json

# --- Configuration ---
APP_DIRS = [
    "/Applications",
    "/System/Applications",
    os.path.expanduser("~/Applications")
]

LIB_DIRS = [
    os.path.expanduser("~/Library/Application Support"),
    os.path.expanduser("~/Library/Caches"),
    os.path.expanduser("~/Library/Preferences"),
    os.path.expanduser("~/Library/Saved Application State"),
    os.path.expanduser("~/Library/Containers"),
    os.path.expanduser("~/Library/Group Containers"),
    os.path.expanduser("~/Library/WebKit"),
    os.path.expanduser("~/Library/Logs"),
]

PLAN_FILE = "/Users/dalin/.gemini/antigravity/brain/6a2e1aa2-599e-4d05-9b51-1f5e08901004/cleanup_plan.md"

def get_app_info(app_path):
    """Extracts Name and Bundle ID from an .app bundle."""
    info_plist = os.path.join(app_path, "Contents", "Info.plist")
    if not os.path.exists(info_plist):
        return None, None
    
    try:
        with open(info_plist, 'rb') as f:
            pl = plistlib.load(f)
            name = pl.get("CFBundleName", os.path.basename(app_path).replace(".app", ""))
            bundle_id = pl.get("CFBundleIdentifier", "")
            return name, bundle_id
    except Exception:
        return os.path.basename(app_path).replace(".app", ""), ""

def collect_installed_apps():
    """Scans for installed apps and builds a knowledge base."""
    apps = {} 
    bundle_ids = set()
    
    for d in APP_DIRS:
        if not os.path.exists(d):
            continue
        try:
            for item in os.listdir(d):
                if item.endswith(".app"):
                    full_path = os.path.join(d, item)
                    name, bid = get_app_info(full_path)
                    if name:
                        key = name.lower()
                        apps[key] = {"path": full_path, "bundle_id": bid, "name": name}
                        if bid:
                            bundle_ids.add(bid.lower())
        except Exception:
            pass
    return apps, bundle_ids

def get_folder_size(path):
    # Use du -sk for accurate size
    try:
        cmd = ["du", "-sk", path]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            kb = int(result.stdout.split()[0])
            return kb * 1024
    except Exception:
        pass
    return 0

def format_size(size):
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size < 1024:
            return f"{size:.1f} {unit}"
        size /= 1024
    return f"{size:.1f} TB"

def is_related(folder_name, apps_map, bundle_ids):
    fn_lower = folder_name.lower()
    
    # 1. Exact Bundle ID Match
    if fn_lower in bundle_ids:
        return 100, "Exact Bundle ID match"
    
    # 2. Exact Name Match
    if fn_lower in apps_map:
        return 100, f"Matches app: {apps_map[fn_lower]['name']}"

    # 3. Bundle ID prefix match (common for com.foo.bar)
    if '.' in fn_lower:
        for bid in bundle_ids:
            if fn_lower.startswith(bid) or bid.startswith(fn_lower):
                 return 90, f"Partial Bundle ID match with {bid}"

    # 4. Fuzzy Name Match
    for app_key, app_info in apps_map.items():
        if fn_lower == app_key:
             return 100, f"Matches app: {app_info['name']}"
        if len(fn_lower) > 3 and fn_lower in app_key:
             return 80, f"Folder name found in app: {app_info['name']}"
        if len(app_key) > 3 and app_key in fn_lower:
             return 80, f"Contains app name: {app_info['name']}"

    # 5. Vendor Matching (Common System/Vendor folders to IGNORE/KEEP)
    safe_vendors = ["apple", "google", "microsoft", "adobe", "java", "python", "zoom", "slack"]
    for v in safe_vendors:
        if v in fn_lower:
             # If we haven't matched an app yet, but it's a big vendor name, 
             # we treat it as "related" but with lower confidence if no app is found.
             # BUT here we are looking for UNINSTALLED things.
             # So if "microsoft" is here but no microsoft app is installed, it IS a leftover.
             # However, we must be careful.
             pass

    return 0, "No match found"

def scan():
    print("Step 1: Indexing installed applications...")
    apps_map, bundle_ids = collect_installed_apps()
    print(f"Found {len(apps_map)} applications.")
    
    orphans = []
    
    print("Step 2: Scanning Library directories...")
    for lib_dir in LIB_DIRS:
        if not os.path.exists(lib_dir):
            continue
            
        lib_name = os.path.basename(lib_dir)
        print(f"  Scanning ~/{lib_name}...")
        
        try:
            items = os.listdir(lib_dir)
            for item in items:
                if item.startswith("."): continue
                
                full_path = os.path.join(lib_dir, item)
                if not os.path.isdir(full_path): continue
                
                confidence, reason = is_related(item, apps_map, bundle_ids)
                
                if confidence < 50:
                    # It's an orphan candidate
                    size = get_folder_size(full_path)
                    # Filter: Only show items > 1MB to avoid noise
                    if size > 1024 * 1024: 
                        orphans.append({
                            "name": item,
                            "path": full_path,
                            "location": lib_name,
                            "size": size,
                            "size_fmt": format_size(size)
                        })
        except Exception as e:
            print(f"Error scanning {lib_dir}: {e}")

    orphans.sort(key=lambda x: x['size'], reverse=True)
    
    # Generate Markdown Plan
    lines = []
    lines.append("# 🧹 System Cleanup Plan")
    lines.append(f"**Date:** {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append(f"**Scan Scope:** {len(LIB_DIRS)} Library locations vs {len(apps_map)} Installed Apps.")
    lines.append("")
    lines.append("## 🛡️ Installed Applications (Reference)")
    lines.append("I have confirmed these applications are currently installed. **Folders matching these will NOT be listed below.**")
    lines.append("<details><summary>View Installed Apps List</summary>")
    lines.append("")
    for name in sorted(apps_map.keys()):
        lines.append(f"- {apps_map[name]['name']}")
    lines.append("</details>")
    lines.append("")
    
    lines.append("## 🗑️ Detected Leftovers (To Be Deleted)")
    lines.append("The following folders were found but **do not match** any currently installed application.")
    lines.append("")
    
    if not orphans:
        lines.append("**No significant leftovers found!**")
    else:
        lines.append("| Folder Name | Location | Size | Verification |")
        lines.append("| :--- | :--- | :--- | :--- |")
        
        for o in orphans:
            lines.append(f"| **{o['name']}** | `~/{o['location']}` | **{o['size_fmt']}** | [ ] Confirm Delete |")
            
    with open(PLAN_FILE, "w") as f:
        f.write("\n".join(lines))
        
    print(f"Plan generated at: {PLAN_FILE}")

if __name__ == "__main__":
    scan()
