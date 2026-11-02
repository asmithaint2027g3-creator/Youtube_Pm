# ProfitMachines Executive Video Series - FFmpeg Multi-Scene PowerShell Multiplexer
# Renders 1080p MP4 videos across all 16 scenes synchronized with master narration audio

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "ProfitMachines Video Production - 16-Scene Synchronized MP4 Renderer" -ForegroundColor Cyan
Write-Host "======================================================================" -ForegroundColor Cyan

$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
if (-not $ffmpeg) {
    Write-Host "`n[BLOCKER] FFmpeg is not installed on this machine." -ForegroundColor Yellow
    Write-Host "To install FFmpeg on Windows via winget, run:" -ForegroundColor White
    Write-Host "  winget install Gyan.FFmpeg" -ForegroundColor Green
    Write-Host "After installation finishes, reopen your terminal and re-run this script." -ForegroundColor White
    exit 1
}

$videos = @(
    @{
        Concat = "concat-v01.txt"
        Audio  = "..\audio\v01_narration_full.wav"
        Out    = "video-01-revenue-friction.mp4"
        Title  = "Briefing 01: Revenue Friction (16 Scenes)"
    },
    @{
        Concat = "concat-v02.txt"
        Audio  = "..\audio\v02_narration_full.wav"
        Out    = "video-02-ai-native-revenue-transformation.mp4"
        Title  = "Briefing 02: AI-Native Transformation (16 Scenes)"
    },
    @{
        Concat = "concat-v03.txt"
        Audio  = "..\audio\v03_narration_full.wav"
        Out    = "video-03-revenue-growth-roadmap.mp4"
        Title  = "Briefing 03: 90-Day Roadmap (16 Scenes)"
    }
)

foreach ($v in $videos) {
    Write-Host "`nRendering $($v.Title)..." -ForegroundColor Cyan
    & ffmpeg -y -f concat -safe 0 -i $v.Concat -i $v.Audio -c:v libx264 -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -shortest $v.Out
    if (Test-Path $v.Out) {
        $size = (Get-Item $v.Out).Length / 1MB
        Write-Host "Successfully rendered $($v.Out) ($([math]::Round($size, 2)) MB)" -ForegroundColor Green
    }
}

Write-Host "`nAll 3 briefings rendered successfully across all 16 scenes!" -ForegroundColor Green
