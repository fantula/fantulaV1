#!/bin/bash

echo "Removing Sunlogin (Oray) System Files..."

# Force Kill
pkill -9 SunloginClient
pkill -9 Sunlogin

# Remove System-level components (Requires Sudo)
# Move to Trash if possible, but for system folders often safer to just rm -rf after confirmation
# Here we will try to move to a temp folder in /tmp then delete, to simulate trash or just delete.
# Standard practice for uninstall scripts is rm -rf.

echo "Deleting /Applications/SunloginClient.app..."
sudo rm -rf "/Applications/SunloginClient.app"

echo "Deleting /Library/Application Support/Sunlogin..."
sudo rm -rf "/Library/Application Support/Sunlogin"
sudo rm -rf "/Library/Application Support/Oray"

echo "Deleting Launch Agents/Daemons..."
sudo rm -f "/Library/LaunchAgents/com.oray.sunlogin.agent.plist"
sudo rm -f "/Library/LaunchDaemons/com.oray.sunlogin.helper.plist"

echo "Deleting User Configuration..."
rm -rf ~/Sunlogin
rm -rf "~/Sunlogin Files"
rm -rf "~/Library/Application Support/Sunlogin"
rm -rf "~/Library/Preferences/com.oray.sunlogin.macclient.plist"

echo "Sunlogin removal complete."
