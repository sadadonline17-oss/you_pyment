const fs = require('fs');

const systems = [
    { name: 'sadad', primary: '#F58220', secondary: '#E67317' },
    { name: 'knet', primary: '#007A3D', secondary: '#CE1126' },
    { name: 'jaywan', primary: '#CE1126', secondary: '#00732F' },
    { name: 'benefit', primary: '#CE1126', secondary: '#D32027' },
    { name: 'maal', primary: '#D0032C', secondary: '#009A44' },
    { name: 'qatar', primary: '#8D1B3D', secondary: '#6B1529' }
];

systems.forEach(sys => {
    const svg = `<svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${sys.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${sys.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${sys.secondary};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="400" fill="url(#grad-${sys.name})" />
  <circle cx="200" cy="200" r="150" fill="rgba(255,255,255,0.1)" />
  <circle cx="1000" cy="100" r="100" fill="rgba(255,255,255,0.05)" />
  <circle cx="900" cy="350" r="80" fill="rgba(255,255,255,0.08)" />
</svg>`;
    
    fs.writeFileSync(`gov-hero-${sys.name}.svg`, svg);
    console.log(`✅ Created gov-hero-${sys.name}.svg`);
});
