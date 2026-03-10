import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../public/assets/dynamic-identity');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const entities = [
  'chalets',
  'gov',
  'local',
  'invoice',
  'contract',
  'health',
  'bank'
];

const createPlaceholderSVG = (text, width, height, bgColor, textColor) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial" font-size="24" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;
};

const colorSchemes = {
  chalets: { bg: '#FF6F00', text: '#FFFFFF' },
  gov: { bg: '#004080', text: '#FFFFFF' },
  local: { bg: '#008000', text: '#FFFFFF' },
  invoice: { bg: '#800000', text: '#FFFFFF' },
  contract: { bg: '#000080', text: '#FFFFFF' },
  health: { bg: '#008080', text: '#FFFFFF' },
  bank: { bg: '#0000FF', text: '#FFFFFF' }
};

entities.forEach(entity => {
  const colors = colorSchemes[entity];
  
  const logoSVG = createPlaceholderSVG(`${entity.toUpperCase()} Logo`, 200, 60, colors.bg, colors.text);
  fs.writeFileSync(path.join(assetsDir, `official_logo_${entity}.svg`), logoSVG);
  
  [1, 2, 3].forEach(num => {
    const headerSVG = createPlaceholderSVG(`${entity.toUpperCase()} Header ${num}`, 1200, 400, colors.bg, colors.text);
    const filename = `${entity}_image${num}.svg`;
    fs.writeFileSync(path.join(assetsDir, filename), headerSVG);
  });
  
  const paymentSVG = createPlaceholderSVG(`${entity.toUpperCase()} Payment`, 1200, 630, colors.bg, colors.text);
  fs.writeFileSync(path.join(assetsDir, `${entity}_payment.svg`), paymentSVG);
  
  [1, 2].forEach(num => {
    const bgSVG = createPlaceholderSVG(`${entity.toUpperCase()} Background ${num}`, 1920, 1080, colors.bg, colors.text);
    fs.writeFileSync(path.join(assetsDir, `${entity}_bg${num === 1 ? '' : num}.svg`), bgSVG);
  });
});

console.log('✅ Placeholder assets generated successfully!');
console.log(`📁 Location: ${assetsDir}`);
console.log('\n📝 Generated files:');
entities.forEach(entity => {
  console.log(`   - official_logo_${entity}.svg`);
  console.log(`   - ${entity}_image[1-3].svg`);
  console.log(`   - ${entity}_payment.svg`);
  console.log(`   - ${entity}_bg[1-2].svg`);
});
console.log('\n💡 Replace these placeholder SVGs with your actual PNG/JPG images.');
