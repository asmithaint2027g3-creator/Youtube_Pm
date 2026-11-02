Add-Type -AssemblyName System.Speech

$synthesizer = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synthesizer.SelectVoice("Microsoft David Desktop")
$synthesizer.Rate = 0  # Standard natural executive pace

$files = @(
    @{ Text = "profitmachines-youtube-videos\audio\v01_narration.txt"; Wav = "profitmachines-youtube-videos\audio\v01_narration_full.wav" },
    @{ Text = "profitmachines-youtube-videos\audio\v02_narration.txt"; Wav = "profitmachines-youtube-videos\audio\v02_narration_full.wav" },
    @{ Text = "profitmachines-youtube-videos\audio\v03_narration.txt"; Wav = "profitmachines-youtube-videos\audio\v03_narration_full.wav" }
)

foreach ($f in $files) {
    if (Test-Path $f.Text) {
        Write-Host "Synthesizing $($f.Wav)..."
        $rawText = [System.IO.File]::ReadAllText($f.Text)
        
        # Clean up brackets or dashes that might affect TTS rhythm
        $cleanText = $rawText -replace '[—–]', ', '
        
        $synthesizer.SetOutputToWaveFile($f.Wav)
        $synthesizer.Speak($cleanText)
        $synthesizer.SetOutputToNull()
        
        $item = Get-Item $f.Wav
        $megabytes = [math]::Round($item.Length / 1MB, 2)
        Write-Host "Generated $($f.Wav): $megabytes MB"
    }
}

$synthesizer.Dispose()
Write-Host "Audio generation complete."

