const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'assets', 'img');
const outDir = srcDir;

async function run() {
  if (!fs.existsSync(path.join(outDir, 'hero.jpg'))) {
    console.error('Source hero.jpg not found in assets/img — please add it and re-run.');
    process.exit(1);
  }

  console.log('Generating hero responsive images...');
  const sizes = [400, 800, 1200];
  for (const w of sizes) {
    await sharp(path.join(outDir, 'hero.jpg'))
      .resize({ width: w })
      .webp({ quality: 80 })
      .toFile(path.join(outDir, `hero-${w}.webp`));

    await sharp(path.join(outDir, 'hero.jpg'))
      .resize({ width: w })
      .jpeg({ quality: 80 })
      .toFile(path.join(outDir, `hero-${w}.jpg`));
  }

  // Convert SVG logo to PNG fallbacks at 1x and 2x
  const logoSvg = path.join(outDir, 'logo.svg');
  if (fs.existsSync(logoSvg)) {
    console.log('Generating logo PNG fallbacks...');
    await sharp(logoSvg).png().resize(48, 48).toFile(path.join(outDir, 'logo-48.png'));
    await sharp(logoSvg).png().resize(96, 96).toFile(path.join(outDir, 'logo-96.png'));
  } else {
    console.warn('logo.svg not found — skipping logo PNG generation.');
  }

  console.log('Image generation complete. Files created in assets/img: hero-400.webp, hero-800.webp, hero-1200.webp and hero-{w}.jpg; logo-48.png, logo-96.png');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
