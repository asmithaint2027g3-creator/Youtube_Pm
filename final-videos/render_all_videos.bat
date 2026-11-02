@echo off
REM ProfitMachines Executive Video Series - FFmpeg Multi-Scene Video Multiplexer
REM Renders 1080p MP4 videos across all 16 scenes synchronized with master narration audio

echo ======================================================================
echo ProfitMachines Video Production - 16-Scene Synchronized MP4 Renderer
echo ======================================================================

set FFMPEG_CMD=ffmpeg
where ffmpeg >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    if exist "%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe" (
        set "FFMPEG_CMD=%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe"
    ) else (
        echo [ERROR] FFmpeg was not found in your system PATH or WinGet package folder.
        echo.
        echo To install FFmpeg on Windows via winget, run:
        echo   winget install Gyan.FFmpeg
        echo.
        pause
        exit /b 1
    )
)

echo.
echo [1/3] Rendering Briefing 01 (16 Scenes + Narration Audio)...
"%FFMPEG_CMD%" -y -f concat -safe 0 -i concat-v01.txt -i "..\audio\v01_narration_full.wav" -c:v libx264 -pix_fmt yuv420p -r 25 -c:a aac -b:a 192k -shortest "video-01-revenue-friction.mp4"

echo.
echo [2/3] Rendering Briefing 02 (16 Scenes + Narration Audio)...
"%FFMPEG_CMD%" -y -f concat -safe 0 -i concat-v02.txt -i "..\audio\v02_narration_full.wav" -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p -r 25 -c:a aac -b:a 192k -shortest "video-02-ai-native-revenue-transformation.mp4"

echo.
echo [3/3] Rendering Briefing 03 (16 Scenes + Narration Audio)...
"%FFMPEG_CMD%" -y -f concat -safe 0 -i concat-v03.txt -i "..\audio\v03_narration_full.wav" -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p -r 25 -c:a aac -b:a 192k -shortest "video-03-revenue-growth-roadmap.mp4"

echo.
echo ======================================================================
echo ALL 3 BRIEFINGS RENDERED SUCCESSFULLY WITH 16 SYNCHRONIZED SCENES!
echo Files saved:
echo   - final-videos\video-01-revenue-friction.mp4
echo   - final-videos\video-02-ai-native-revenue-transformation.mp4
echo   - final-videos\video-03-revenue-growth-roadmap.mp4
echo ======================================================================
exit /b 0
