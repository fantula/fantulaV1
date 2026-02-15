import os
import shutil
import datetime

# Approved Cleanup Targets
TARGETS = [
    "~/Library/Containers/com.tencent.xinWeChat",
    "~/Library/Application Support/Microsoft", 
    "~/Library/Application Support/Google",
    "~/Library/Application Support/Caches",
    "~/Library/Application Support/JetBrains",
    "~/Library/Application Support/Epic",
    "~/Library/Application Support/Canon",
    "~/Library/Application Support/Spotify",
    "~/Library/Application Support/obs-studio",
    "~/Library/Application Support/CEF",
    "~/Library/Preferences/Steinberg MediaBay Server",
    "~/Library/Caches/ms-playwright-go",
    "~/Library/Caches/GeoServices",
    "~/Library/Caches/node-gyp",
]

def move_to_trash(path):
    full_path = os.path.expanduser(path)
    if not os.path.exists(full_path):
        print(f"[SKIP] Not found: {path}")
        return

    trash_dir = os.path.expanduser("~/.Trash")
    basename = os.path.basename(full_path)
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    dest_name = f"{basename}_{timestamp}"
    dest_path = os.path.join(trash_dir, dest_name)

    try:
        shutil.move(full_path, dest_path)
        print(f"[OK] Moved to Trash: {path}")
    except Exception as e:
        print(f"[ERROR] Failed to move {path}: {e}")

def main():
    print("Executing Approved Cleanup Plan...")
    print("-" * 40)
    
    deleted_count = 0
    
    for target in TARGETS:
        move_to_trash(target)
        deleted_count += 1
        
    print("-" * 40)
    print("Cleanup complete. Items are in your Trash.")

if __name__ == "__main__":
    main()
