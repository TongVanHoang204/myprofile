const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:\\Users\\Hoang\\.gemini\\antigravity\\brain\\0de7491d-14d0-442b-8212-3242f17411c6\\cursor_arm_green_1778161956677.png';
const outputPath = 'public/cursor-arm.png';

async function processImage() {
  try {
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Check for green-ish background
      // Neon green is approx (0, 255, 0)
      if (r < 100 && g > 150 && b < 100) {
        data[i + 3] = 0; // Set alpha to 0 (transparent)
      }
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels
      }
    })
    .png()
    .toFile(outputPath);

    console.log('Background removed and saved to', outputPath);
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage();
