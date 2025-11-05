<# Simple release script: creates dist/ and zips project files excluding .git #>
Param()
Set-StrictMode -Version Latest
$here = Split-Path -Parent $MyInvocation.MyCommand.Definition
Push-Location $here
Try{
  $dist = Join-Path $here 'dist'
  if(-not (Test-Path $dist)){ New-Item -ItemType Directory -Path $dist | Out-Null }

  Write-Host "Building release archive..."
  $paths = Get-ChildItem -Recurse -File | Where-Object { $_.FullName -notmatch '\.git\\' -and $_.FullName -notmatch '\\dist\\' }
  $temp = $paths | ForEach-Object { $_.FullName }
  if($temp.Count -eq 0){ Write-Host "No files found to archive."; exit 1 }
  $zip = Join-Path $dist 'magnifier-demo.zip'
  Compress-Archive -Path $temp -DestinationPath $zip -Force
  Write-Host "Created $zip"
} finally { Pop-Location }
