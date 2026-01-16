$reports = @(
    @{Name = 'Admin'; File = 'admin-report.json'},
    @{Name = 'Auth'; File = 'auth-report.json'},
    @{Name = 'Favourites'; File = 'favourites-report.json'},
    @{Name = 'Game'; File = 'game-report.json'},
    @{Name = 'Profile'; File = 'profile-report.json'},
    @{Name = 'Public'; File = 'public-report.json'},
    @{Name = 'TalkTalk'; File = 'talktalk-report.json'},
    @{Name = 'User'; File = 'user-report.json'}
)

$basePath = 'c:\Backup\Desktop-20250317T120856Z-001\Desktop\바탕 화면\Centennial\SEMESTER 3\COMP229\BBProject\api\newman\reports'

Write-Host "API 이름 | 총 테스트 | 성공 | 실패 | 합격률(%)"
Write-Host "---------|-----------|------|------|----------"

foreach ($report in $reports) {
    $filePath = Join-Path $basePath $report.File
    $json = Get-Content $filePath -Raw | ConvertFrom-Json
    $stats = $json.run.stats
    
    $total = $stats.tests.total
    $passed = $stats.tests.passed
    $failed = $stats.tests.failed
    $passRate = if ($total -gt 0) { [math]::Round(($passed / $total) * 100, 2) } else { 0 }
    
    Write-Host "$($report.Name) | $total | $passed | $failed | $passRate%"
}
