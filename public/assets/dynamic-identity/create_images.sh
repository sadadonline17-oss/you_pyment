#!/bin/bash

# Bank Image 2
cat > public/assets/dynamic-identity/bank_image2.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad2)"/>
  <defs>
    <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0891b2"/>
      <stop offset="100%" style="stop-color:#06b6d4"/>
    </linearGradient>
  </defs>
  <g transform="translate(150, 120)">
    <rect x="0" y="0" width="280" height="500" rx="30" fill="white" opacity="0.95"/>
    <rect x="20" y="40" width="240" height="80" rx="15" fill="#0891b2"/>
    <text x="70" y="75" font-size="18" font-weight="bold" fill="white">الرصيد</text>
    <text x="70" y="105" font-size="26" font-weight="bold" fill="white">25,430 ر.س</text>
  </g>
  <text x="550" y="180" font-size="48" font-weight="bold" fill="white">الخدمات الرقمية</text>
  <text x="550" y="230" font-size="24" fill="white" opacity="0.9">إدارة حساباتك بكل سهولة</text>
</svg>
EOF

# Bank Image 3
cat > public/assets/dynamic-identity/bank_image3.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad3)"/>
  <defs>
    <linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#7c3aed"/>
      <stop offset="100%" style="stop-color:#a78bfa"/>
    </linearGradient>
  </defs>
  <g transform="translate(150, 150)">
    <path d="M100 0L0 40V120C0 200 100 280 100 280C100 280 200 200 200 120V40L100 0Z" fill="#10b981" opacity="0.95"/>
    <path d="M60 120L90 150L150 90" stroke="white" stroke-width="16" fill="none"/>
  </g>
  <text x="450" y="200" font-size="48" font-weight="bold" fill="white">أمان وحماية كاملة</text>
  <text x="450" y="250" font-size="24" fill="white" opacity="0.9">معاملاتك محمية بأعلى معايير الأمان</text>
</svg>
EOF

# Government Images
cat > public/assets/dynamic-identity/gov_image1.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_gov1)"/>
  <defs>
    <linearGradient id="grad_gov1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#059669"/>
      <stop offset="100%" style="stop-color:#10b981"/>
    </linearGradient>
  </defs>
  <g transform="translate(100, 150)">
    <rect x="50" y="100" width="400" height="250" fill="white" opacity="0.9"/>
    <rect x="50" y="50" width="400" height="50" fill="#047857"/>
    <polygon points="250,0 50,100 450,100" fill="#047857" opacity="0.9"/>
    <circle cx="120" cy="180" r="15" fill="#047857"/>
    <circle cx="200" cy="180" r="15" fill="#047857"/>
    <circle cx="280" cy="180" r="15" fill="#047857"/>
    <circle cx="360" cy="180" r="15" fill="#047857"/>
    <circle cx="420" cy="180" r="15" fill="#047857"/>
  </g>
  <text x="600" y="200" font-size="48" font-weight="bold" fill="white">الخدمات الحكومية</text>
  <text x="600" y="250" font-size="24" fill="white" opacity="0.9">سداد الرسوم والمستحقات الحكومية</text>
</svg>
EOF

cat > public/assets/dynamic-identity/gov_image2.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_gov2)"/>
  <defs>
    <linearGradient id="grad_gov2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0d9488"/>
      <stop offset="100%" style="stop-color:#14b8a6"/>
    </linearGradient>
  </defs>
  <g transform="translate(150, 150)">
    <rect x="0" y="0" width="300" height="200" rx="15" fill="white" opacity="0.9"/>
    <rect x="20" y="20" width="260" height="40" rx="10" fill="#0d9488"/>
    <text x="40" y="48" font-size="20" font-weight="bold" fill="white">فاتورة حكومية</text>
    <text x="40" y="100" font-size="16" fill="#374151">رقم المرجع: 1234567</text>
    <text x="40" y="130" font-size="16" fill="#374151">المبلغ: 250 ر.س</text>
    <rect x="20" y="150" width="260" height="30" rx="8" fill="#10b981"/>
    <text x="130" y="172" font-size="14" font-weight="bold" fill="white">ادفع الآن</text>
  </g>
  <text x="550" y="200" font-size="48" font-weight="bold" fill="white">دفع سريع وآمن</text>
  <text x="550" y="250" font-size="24" fill="white" opacity="0.9">سدد فواتيرك الحكومية بنقرة واحدة</text>
</svg>
EOF

cat > public/assets/dynamic-identity/gov_image3.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_gov3)"/>
  <defs>
    <linearGradient id="grad_gov3" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#15803d"/>
      <stop offset="100%" style="stop-color:#22c55e"/>
    </linearGradient>
  </defs>
  <circle cx="250" cy="250" r="120" fill="white" opacity="0.9"/>
  <path d="M200 250L230 280L310 200" stroke="#15803d" stroke-width="20" fill="none"/>
  <text x="450" y="200" font-size="48" font-weight="bold" fill="white">عملية ناجحة</text>
  <text x="450" y="250" font-size="24" fill="white" opacity="0.9">تم استلام دفعتك بنجاح</text>
  <text x="450" y="290" font-size="20" fill="white" opacity="0.8">✓ تأكيد فوري</text>
  <text x="450" y="325" font-size="20" fill="white" opacity="0.8">✓ إيصال إلكتروني</text>
</svg>
EOF

# Chalets Images
cat > public/assets/dynamic-identity/chalets_image1.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_ch1)"/>
  <defs>
    <linearGradient id="grad_ch1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#dc2626"/>
      <stop offset="100%" style="stop-color:#f59e0b"/>
    </linearGradient>
  </defs>
  <g transform="translate(100, 150)">
    <polygon points="200,50 50,150 350,150" fill="white" opacity="0.9"/>
    <rect x="50" y="150" width="300" height="200" fill="white" opacity="0.9"/>
    <rect x="100" y="200" width="80" height="100" fill="#dc2626"/>
    <rect x="220" y="200" width="80" height="80" fill="#3b82f6"/>
  </g>
  <text x="500" y="200" font-size="48" font-weight="bold" fill="white">الشاليهات والاستراحات</text>
  <text x="500" y="250" font-size="24" fill="white" opacity="0.9">احجز إقامتك المثالية بكل سهولة</text>
</svg>
EOF

cat > public/assets/dynamic-identity/chalets_image2.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_ch2)"/>
  <defs>
    <linearGradient id="grad_ch2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ea580c"/>
      <stop offset="100%" style="stop-color:#fbbf24"/>
    </linearGradient>
  </defs>
  <circle cx="250" cy="150" r="80" fill="#fbbf24" opacity="0.8"/>
  <g transform="translate(150, 250)">
    <ellipse cx="150" cy="80" rx="200" ry="80" fill="#3b82f6" opacity="0.6"/>
    <rect x="30" y="20" width="60" height="60" fill="#f97316"/>
    <rect x="110" y="20" width="60" height="60" fill="#f97316"/>
    <rect x="190" y="20" width="60" height="60" fill="#f97316"/>
  </g>
  <text x="550" y="200" font-size="48" font-weight="bold" fill="white">أجواء استثنائية</text>
  <text x="550" y="250" font-size="24" fill="white" opacity="0.9">استمتع بأفضل الأوقات مع العائلة</text>
</svg>
EOF

cat > public/assets/dynamic-identity/chalets_image3.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_ch3)"/>
  <defs>
    <linearGradient id="grad_ch3" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#b91c1c"/>
      <stop offset="100%" style="stop-color:#f59e0b"/>
    </linearGradient>
  </defs>
  <text x="100" y="150" font-size="64" fill="white" opacity="0.9">⭐⭐⭐⭐⭐</text>
  <text x="100" y="220" font-size="48" font-weight="bold" fill="white">شاليهات فاخرة</text>
  <text x="100" y="270" font-size="24" fill="white" opacity="0.9">• مسابح خاصة</text>
  <text x="100" y="310" font-size="24" fill="white" opacity="0.9">• ألعاب مائية</text>
  <text x="100" y="350" font-size="24" fill="white" opacity="0.9">• مرافق متكاملة</text>
  <text x="100" y="390" font-size="24" fill="white" opacity="0.9">• خصوصية تامة</text>
</svg>
EOF

# Health Images
cat > public/assets/dynamic-identity/health_image1.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_h1)"/>
  <defs>
    <linearGradient id="grad_h1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#dc2626"/>
      <stop offset="100%" style="stop-color:#ef4444"/>
    </linearGradient>
  </defs>
  <g transform="translate(200, 150)">
    <rect x="80" y="0" width="40" height="120" fill="white" opacity="0.9"/>
    <rect x="0" y="40" width="200" height="40" fill="white" opacity="0.9"/>
  </g>
  <text x="500" y="200" font-size="48" font-weight="bold" fill="white">الخدمات الصحية</text>
  <text x="500" y="250" font-size="24" fill="white" opacity="0.9">دفع الفواتير الطبية والتأمين الصحي</text>
</svg>
EOF

cat > public/assets/dynamic-identity/health_image2.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_h2)"/>
  <defs>
    <linearGradient id="grad_h2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#be123c"/>
      <stop offset="100%" style="stop-color:#f43f5e"/>
    </linearGradient>
  </defs>
  <g transform="translate(150, 150)">
    <rect x="0" y="0" width="300" height="200" rx="15" fill="white" opacity="0.9"/>
    <rect x="20" y="20" width="260" height="40" rx="10" fill="#dc2626"/>
    <text x="70" y="48" font-size="18" font-weight="bold" fill="white">فاتورة طبية</text>
  </g>
  <text x="550" y="200" font-size="48" font-weight="bold" fill="white">رعاية صحية متميزة</text>
  <text x="550" y="250" font-size="24" fill="white" opacity="0.9">سداد سريع وآمن</text>
</svg>
EOF

cat > public/assets/dynamic-identity/health_image3.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_h3)"/>
  <defs>
    <linearGradient id="grad_h3" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#991b1b"/>
      <stop offset="100%" style="stop-color:#f87171"/>
    </linearGradient>
  </defs>
  <text x="100" y="180" font-size="48" font-weight="bold" fill="white">خدمات طبية شاملة</text>
  <text x="100" y="240" font-size="24" fill="white" opacity="0.9">✓ مستشفيات</text>
  <text x="100" y="280" font-size="24" fill="white" opacity="0.9">✓ عيادات</text>
  <text x="100" y="320" font-size="24" fill="white" opacity="0.9">✓ مختبرات</text>
  <text x="100" y="360" font-size="24" fill="white" opacity="0.9">✓ صيدليات</text>
</svg>
EOF

echo "All images created successfully!"
