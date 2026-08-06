# auto-push.ps1
# This script monitors your 'anti java' folder and automatically commits & pushes changes to GitHub.
# It checks for changes every 30 seconds.

# You can adjust the check interval (in seconds) here
$Interval = 30

Write-Host "=============================================" -ForegroundColor Green
Write-Host "   Auto-Push to GitHub Service Started" -ForegroundColor Green
Write-Host "   Monitoring: C:\Users\heman\anti java" -ForegroundColor Cyan
Write-Host "   Checking for changes every $Interval seconds..." -ForegroundColor Cyan
Write-Host "   Press Ctrl+C to stop this service" -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Green

while ($true) {
    # Check if there are any changes (added, modified, or deleted files)
    $status = git status --porcelain
    
    if ($status) {
        Write-Host "`n[$(Get-Date -Format 'HH:mm:ss')] Changes detected!" -ForegroundColor Cyan
        # Display the modified files
        Write-Host $status
        
        Write-Host "Staging changes..." -ForegroundColor Gray
        git add .
        
        Write-Host "Committing changes..." -ForegroundColor Gray
        $commitMessage = "Auto-commit: Program updates on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git commit -m $commitMessage
        
        Write-Host "Pushing to GitHub..." -ForegroundColor Gray
        git push origin main
        
        Write-Host "Sync complete! Resuming monitoring..." -ForegroundColor Green
        Write-Host "---------------------------------------------" -ForegroundColor Gray
    }
    
    Start-Sleep -Seconds $Interval
}
