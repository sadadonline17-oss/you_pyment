#!/bin/bash

# Invoice Images
cat > invoice_image1.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_inv1)"/>
  <defs>
    <linearGradient id="grad_inv1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7c3aed"/>
      <stop offset="100%" style="stop-color:#a78bfa"/>
    </linearGradient>
  </defs>
  <g transform="translate(100, 100)">
    <rect x="0" y="0" width="350" height="300" rx="15" fill="white" opacity="0.95"/>
    <rect x="0" y="0" width="350" height="60" rx="15" fill="#7c3aed"/>
    <text x="175" y="40" font-size="24" font-weight="bold" fill="white" text-anchor="middle">فاتورة</text>
    <text x="30" y="100" font-size="16" fill="#374151">رقم الفاتورة: INV-2024-001</text>
    <text x="30" y="130" font-size="16" fill="#374151">التاريخ: 11 ديسمبر 2024</text>
    <line x1="30" y1="150" x2="320" y2="150" stroke="#e5e7eb" stroke-width="2"/>
    <text x="30" y="180" font-size="14" fill="#6b7280">وصف الخدمة</text>
    <text x="270" y="180" font-size="14" fill="#6b7280">المبلغ</text>
    <text x="30" y="210" font-size="14" fill="#374151">خدمة مقدمة</text>
    <text x="270" y="210" font-size="14" fill="#374151">500 ر.س</text>
    <line x1="30" y1="230" x2="320" y2="230" stroke="#e5e7eb" stroke-width="2"/>
    <text x="30" y="260" font-size="18" font-weight="bold" fill="#7c3aed">الإجمالي</text>
    <text x="270" y="260" font-size="18" font-weight="bold" fill="#7c3aed">500 ر.س</text>
  </g>
  <text x="550" y="200" font-size="48" font-weight="bold" fill="white">الفواتير والمستحقات</text>
  <text x="550" y="250" font-size="24" fill="white" opacity="0.9">إدارة ودفع فواتيرك إلكترونياً</text>
</svg>
EOF

cat > invoice_image2.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_inv2)"/>
  <defs>
    <linearGradient id="grad_inv2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#6d28d9"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
  </defs>
  <g transform="translate(150, 150)">
    <circle cx="100" cy="100" r="80" fill="white" opacity="0.9"/>
    <path d="M60 100L85 125L140 70" stroke="#7c3aed" stroke-width="12" fill="none"/>
  </g>
  <text x="400" y="200" font-size="48" font-weight="bold" fill="white">دفع سريع وآمن</text>
  <text x="400" y="250" font-size="24" fill="white" opacity="0.9">✓ تأكيد فوري</text>
  <text x="400" y="290" font-size="24" fill="white" opacity="0.9">✓ إيصال إلكتروني</text>
  <text x="400" y="330" font-size="24" fill="white" opacity="0.9">✓ حفظ تلقائي</text>
</svg>
EOF

cat > invoice_image3.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_inv3)"/>
  <defs>
    <linearGradient id="grad_inv3" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#5b21b6"/>
      <stop offset="100%" style="stop-color:#a855f7"/>
    </linearGradient>
  </defs>
  <g transform="translate(100, 150)">
    <rect x="0" y="0" width="300" height="200" rx="15" fill="white" opacity="0.9"/>
    <rect x="20" y="20" width="120" height="80" rx="10" fill="#7c3aed" opacity="0.3"/>
    <rect x="160" y="20" width="120" height="80" rx="10" fill="#7c3aed" opacity="0.3"/>
    <rect x="20" y="120" width="120" height="60" rx="10" fill="#10b981" opacity="0.8"/>
    <text x="50" y="155" font-size="14" font-weight="bold" fill="white">مدفوع</text>
    <rect x="160" y="120" width="120" height="60" rx="10" fill="#ef4444" opacity="0.8"/>
    <text x="180" y="155" font-size="14" font-weight="bold" fill="white">معلق</text>
  </g>
  <text x="500" y="220" font-size="48" font-weight="bold" fill="white">تتبع الفواتير</text>
  <text x="500" y="270" font-size="24" fill="white" opacity="0.9">راقب جميع معاملاتك بسهولة</text>
</svg>
EOF

# Contract Images
cat > contract_image1.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_con1)"/>
  <defs>
    <linearGradient id="grad_con1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a8a"/>
      <stop offset="100%" style="stop-color:#3b82f6"/>
    </linearGradient>
  </defs>
  <g transform="translate(100, 100)">
    <rect x="0" y="0" width="350" height="300" rx="15" fill="white" opacity="0.95"/>
    <rect x="20" y="20" width="310" height="40" rx="10" fill="#1e3a8a"/>
    <text x="175" y="48" font-size="20" font-weight="bold" fill="white" text-anchor="middle">عقد اتفاقية</text>
    <rect x="30" y="80" width="290" height="10" rx="5" fill="#e5e7eb"/>
    <rect x="30" y="100" width="290" height="10" rx="5" fill="#e5e7eb"/>
    <rect x="30" y="120" width="290" height="10" rx="5" fill="#e5e7eb"/>
    <rect x="30" y="140" width="200" height="10" rx="5" fill="#e5e7eb"/>
    <rect x="30" y="170" width="290" height="10" rx="5" fill="#e5e7eb"/>
    <rect x="30" y="190" width="290" height="10" rx="5" fill="#e5e7eb"/>
    <rect x="30" y="210" width="250" height="10" rx="5" fill="#e5e7eb"/>
    <path d="M80 260Q100 240 120 260" stroke="#1e3a8a" stroke-width="3" fill="none"/>
  </g>
  <text x="550" y="200" font-size="48" font-weight="bold" fill="white">العقود والاتفاقيات</text>
  <text x="550" y="250" font-size="24" fill="white" opacity="0.9">تسديد العقود بأمان وسرعة</text>
</svg>
EOF

cat > contract_image2.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_con2)"/>
  <defs>
    <linearGradient id="grad_con2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af"/>
      <stop offset="100%" style="stop-color:#60a5fa"/>
    </linearGradient>
  </defs>
  <text x="100" y="150" font-size="48" font-weight="bold" fill="white">عقود موثقة قانونياً</text>
  <text x="100" y="220" font-size="24" fill="white" opacity="0.9">✓ عقود عقارية</text>
  <text x="100" y="260" font-size="24" fill="white" opacity="0.9">✓ عقود تجارية</text>
  <text x="100" y="300" font-size="24" fill="white" opacity="0.9">✓ عقود خدمية</text>
  <text x="100" y="340" font-size="24" fill="white" opacity="0.9">✓ اتفاقيات شراكة</text>
</svg>
EOF

cat > contract_image3.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_con3)"/>
  <defs>
    <linearGradient id="grad_con3" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1e40af"/>
      <stop offset="100%" style="stop-color:#93c5fd"/>
    </linearGradient>
  </defs>
  <g transform="translate(200, 150)">
    <path d="M100 0L0 40V120C0 200 100 280 100 280C100 280 200 200 200 120V40L100 0Z" fill="white" opacity="0.9"/>
    <path d="M60 120L90 150L150 90" stroke="#1e40af" stroke-width="16" fill="none"/>
  </g>
  <text x="500" y="220" font-size="48" font-weight="bold" fill="white">حماية قانونية كاملة</text>
  <text x="500" y="270" font-size="24" fill="white" opacity="0.9">عقود موثقة ومعتمدة رسمياً</text>
</svg>
EOF

# Local Payment Images
cat > local_image1.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_loc1)"/>
  <defs>
    <linearGradient id="grad_loc1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ea580c"/>
      <stop offset="100%" style="stop-color:#fb923c"/>
    </linearGradient>
  </defs>
  <g transform="translate(150, 150)">
    <rect x="0" y="0" width="300" height="200" rx="15" fill="white" opacity="0.95"/>
    <circle cx="150" cy="70" r="40" fill="#ea580c" opacity="0.2"/>
    <text x="150" y="80" font-size="32" text-anchor="middle">💰</text>
    <text x="150" y="130" font-size="20" font-weight="bold" fill="#ea580c" text-anchor="middle">دفع محلي</text>
    <text x="150" y="165" font-size="16" fill="#6b7280" text-anchor="middle">سريع وآمن</text>
  </g>
  <text x="550" y="200" font-size="48" font-weight="bold" fill="white">المدفوعات المحلية</text>
  <text x="550" y="250" font-size="24" fill="white" opacity="0.9">خدمات دفع سريعة في دول الخليج</text>
</svg>
EOF

cat > local_image2.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_loc2)"/>
  <defs>
    <linearGradient id="grad_loc2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#c2410c"/>
      <stop offset="100%" style="stop-color:#f97316"/>
    </linearGradient>
  </defs>
  <circle cx="200" cy="250" r="100" fill="white" opacity="0.2"/>
  <circle cx="350" cy="250" r="100" fill="white" opacity="0.2"/>
  <circle cx="500" cy="250" r="100" fill="white" opacity="0.2"/>
  <text x="650" y="200" font-size="48" font-weight="bold" fill="white">شبكة واسعة</text>
  <text x="650" y="250" font-size="24" fill="white" opacity="0.9">جميع وسائل الدفع المحلية</text>
  <text x="650" y="290" font-size="20" fill="white" opacity="0.8">✓ مدى</text>
  <text x="650" y="320" font-size="20" fill="white" opacity="0.8">✓ بطاقات محلية</text>
  <text x="650" y="350" font-size="20" fill="white" opacity="0.8">✓ تحويل فوري</text>
</svg>
EOF

cat > local_image3.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 514">
  <rect width="1200" height="514" fill="url(#grad_loc3)"/>
  <defs>
    <linearGradient id="grad_loc3" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#9a3412"/>
      <stop offset="100%" style="stop-color:#fdba74"/>
    </linearGradient>
  </defs>
  <g transform="translate(150, 180)">
    <rect x="0" y="0" width="250" height="150" rx="15" fill="white" opacity="0.95"/>
    <circle cx="125" cy="50" r="30" fill="#10b981"/>
    <path d="M105 50L115 60L145 30" stroke="white" stroke-width="6" fill="none"/>
    <text x="125" y="110" font-size="18" font-weight="bold" fill="#ea580c" text-anchor="middle">تم بنجاح</text>
  </g>
  <text x="500" y="220" font-size="48" font-weight="bold" fill="white">معاملات فورية</text>
  <text x="500" y="270" font-size="24" fill="white" opacity="0.9">تأكيد فوري ومتابعة دقيقة</text>
</svg>
EOF

echo "All additional images created!"
