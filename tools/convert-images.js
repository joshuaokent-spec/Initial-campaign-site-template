const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const assetDir = path.join(__dirname, "..", "assets", "img");

const jobs = [
  {
    source: "home-leadership-banner.svg",
    outputs: [
      { file: "hero-banner-1200.png", width: 1200 },
      { file: "hero-banner-1600.png", width: 1600 }
    ]
  },
  {
    source: "share-card.svg",
    outputs: [
      { file: "share-card-1200x630.png", width: 1200, height: 630 }
    ]
  },
  {
    source: "logo.svg",
    outputs: [
      { file: "logo-48.png", width: 48, height: 48 },
      { file: "logo-96.png", width: 96, height: 96 }
    ]
  }
];

async function exportAsset(job) {
  const inputPath = path.join(assetDir, job.source);

  if (!fs.existsSync(inputPath)) {
    console.warn("Skipping missing asset:", job.source);
    return [];
  }

  const createdFiles = [];

  for (const output of job.outputs) {
    const outputPath = path.join(assetDir, output.file);
    let pipeline = sharp(inputPath).png();

    if (output.width && output.height) {
      pipeline = pipeline.resize(output.width, output.height, {
        fit: "cover"
      });
    } else if (output.width) {
      pipeline = pipeline.resize({ width: output.width });
    }

    await pipeline.toFile(outputPath);
    createdFiles.push(output.file);
  }

  return createdFiles;
}

async function run() {
  const created = [];

  for (const job of jobs) {
    const createdFiles = await exportAsset(job);
    created.push.apply(created, createdFiles);
  }

  if (!created.length) {
    console.warn("No image fallbacks were generated because the source assets were missing.");
    return;
  }

  console.log("Image fallback export complete:");
  created.forEach(function (file) {
    console.log(" - " + file);
  });
}

run().catch(function (error) {
  console.error(error);
  process.exit(1);
});
