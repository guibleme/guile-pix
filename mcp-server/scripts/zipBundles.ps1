$bundlesDir = "C:\Users\User\Desktop\Seto92\SpriteAI\mcp-server\output\bundles"
$dirs = Get-ChildItem $bundlesDir -Directory
foreach ($d in $dirs) {
    $zipPath = Join-Path $bundlesDir "$($d.Name).zip"
    if (Test-Path $zipPath) { Remove-Item $zipPath }
    Compress-Archive -Path $d.FullName -DestinationPath $zipPath
    Write-Host "done $($d.Name).zip"
}
Write-Host "`nTotal: $($dirs.Count) ZIPs created in $bundlesDir"
