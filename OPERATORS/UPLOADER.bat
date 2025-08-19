echo Test env.
cd /d C:\Users\Offic\OneDrive\Documents\GitHub\Projects\BANLIST
git add *.json
git diff  @~ > difference.txt
set /p files_changed=<difference.txt
echo %files_changed%
git commit -m "Blacklist > %files_changed%"
git push origin main
TIMEOUT /T 600 /nobreak
