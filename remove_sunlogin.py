import os
import shutil
import datetime

# Target paths for Sunlogin / Oray software
TARGETS = [
    "/Applications/SunloginClient.app",
    "/Applications/SunloginRemote.app",
    "/Library/Application Support/Sunlogin",
    "/Library/Application Support/Oray",
    "/Library/LaunchAgents/com.oray.sunlogin.agent.plist",
    "/Library/LaunchDaemons/com.oray.sunlogin.helper.plist",
    "~/Library/Application Support/Sunlogin",
    "~/Library/Application Support/Oray",
    "~/Library/Preferences/com.oray.sunlogin.macclient.plist",
    "~/Library/Preferences/com.oray.sunlogin.plist",
    "~/Library/Logs/Sunlogin",
    "~/Sunlogin", # Often creates a folder in Home
    "~/Sunlogin Files"
]

def move_to_trash(path):
    full_path = os.path.expanduser(path)
    if not os.path.exists(full_path):
        return

    trash_dir = os.path.expanduser("~/.Trash")
    basename = os.path.basename(full_path)
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    dest_name = f"Sunlogin_{basename}_{timestamp}"
    dest_path = os.path.join(trash_dir, dest_name)

    try:
        shutil.move(full_path, dest_path)
        print(f"[OK] Moved to Trash: {path}")
    except Exception as e:
        print(f"[ERROR] Failed to move {path}: {e}")

def main():
    print("Removing Sunlogin (贝锐向日葵)...")
    
    # 1. Kill processes first
    os.system("pkill -9 SunloginClient")
    os.system("pkill -9 Sunlogin")
    
    # 2. Move files
    for target in TARGETS:
        move_to_trash(target)
        
    print("Cleanup complete.")

if __name__ == "__main__":
    main()
