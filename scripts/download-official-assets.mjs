#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../public/assets/dynamic-identity');

const officialLogos = {
  health: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Saudi_Ministry_of_Health_Logo.svg/250px-Saudi_Ministry_of_Health_Logo.svg.png',
  gov: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/SPAN_Logo.png',
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

const generateGradientImage = async (entity, color, width, height, outputPath, text) => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="grad${entity}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.7" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad${entity})" />
  <text x="50%" y="50%" font-family="Arial" font-size="${Math.floor(height / 6)}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;

  fs.writeFileSync(outputPath, svg);
  console.log(`✓ Created ${path.basename(outputPath)}`);
};

const main = async () => {
  console.log('🎨 Downloading official logos and generating assets...\n');

  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  const entities = [
    { key: 'chalets', color: '#FF6F00', nameAr: 'حجز الشاليهات' },
    { key: 'gov', color: '#004080', nameAr: 'الدفع الحكومي' },
    { key: 'local', color: '#008000', nameAr: 'الدفع المحلي' },
    { key: 'invoice', color: '#800000', nameAr: 'الفواتير' },
    { key: 'contract', color: '#000080', nameAr: 'العقود' },
    { key: 'health', color: '#008080', nameAr: 'الخدمات الصحية' },
    { key: 'bank', color: '#0000FF', nameAr: 'الخدمات البنكية' },
  ];

  for (const entity of entities) {
    console.log(`\n📦 Processing ${entity.key}...`);

    await generateGradientImage(
      entity.key,
      entity.color,
      1200,
      400,
      path.join(ASSETS_DIR, `${entity.key}_image1.svg`),
      entity.nameAr
    );

    await generateGradientImage(
      entity.key,
      entity.color,
      1200,
      400,
      path.join(ASSETS_DIR, `${entity.key}_image2.svg`),
      'منصة آمنة وموثوقة'
    );

    if (entity.key !== 'local') {
      await generateGradientImage(
        entity.key,
        entity.color,
        1200,
        400,
        path.join(ASSETS_DIR, `${entity.key}_image3.svg`),
        'دفع إلكتروني سريع'
      );
    }

    await generateGradientImage(
      entity.key,
      entity.color,
      1200,
      630,
      path.join(ASSETS_DIR, `${entity.key}_payment.svg`),
      entity.nameAr
    );

    console.log(`✅ ${entity.key} assets created`);
  }

  console.log('\n✨ All assets generated successfully!');
  console.log(`📁 Location: ${ASSETS_DIR}`);
};

main().catch(console.error);
