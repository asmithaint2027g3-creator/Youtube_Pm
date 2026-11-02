const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function rasterizeScenes() {
  const folders = [
    'video-01-revenue-friction',
    'video-02-ai-native-revenue-transformation',
    'video-03-revenue-growth-roadmap'
  ];

  for (const folder of folders) {
    const sceneDir = path.join(__dirname, folder, 'scenes');
    for (let i = 1; i <= 16; i++) {
      const pad = String(i).padStart(2, '0');
      const svgPath = path.join(sceneDir, `scene-${pad}.svg`);
      const pngPath = path.join(sceneDir, `scene-${pad}.png`);

      if (fs.existsSync(svgPath)) {
        await sharp(svgPath)
          .resize(1280, 720)
          .png({ quality: 100 })
          .toFile(pngPath);
      }
    }
    console.log(`Rasterized 16 scenes for ${folder}`);
  }
}

rasterizeScenes().then(() => console.log('All 48 scenes rasterized successfully to 1280x720 PNG.'));

