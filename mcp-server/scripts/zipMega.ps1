$bundlesDir = "C:\Users\User\Desktop\Seto92\SpriteAI\mcp-server\output\bundles"
$megaZip = Join-Path $bundlesDir "_MEGA-BUNDLE-ALL.zip"
if (Test-Path $megaZip) { Remove-Item $megaZip }
$folders = Get-ChildItem $bundlesDir -Directory | Where-Object { $_.Name -ne '_MEGA-BUNDLE' }
Compress-Archive -Path $folders.FullName -DestinationPath $megaZip
$size = [math]::Round((Get-Item $megaZip).Length / 1MB, 1)
Write-Host "done _MEGA-BUNDLE-ALL.zip ($size MB) - $($folders.Count) bundles"
