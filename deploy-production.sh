#!/bin/bash

echo "🚀 نشر التطبيق كتطبيق إنتاجي على Netlify"
echo "================================================"
echo ""

# التحقق من وجود البناء
if [ ! -d "dist" ]; then
  echo "⚠️  مجلد dist غير موجود. جاري البناء..."
  npm run build
fi

echo ""
echo "✅ البناء مكتمل!"
echo ""

# إنشاء ملف _redirects إذا لم يكن موجوداً
if [ ! -f "dist/_redirects" ]; then
  echo "📝 إنشاء ملف _redirects..."
  echo "/*    /index.html   200" > dist/_redirects
fi

# نسخ netlify.toml إلى dist
if [ -f "netlify.toml" ]; then
  cp netlify.toml dist/
fi

echo "📦 الملفات جاهزة للنشر!"
echo ""
echo "🌐 خيارات النشر:"
echo ""
echo "1️⃣  النشر التلقائي عبر GitHub (مستحسن):"
echo "   - الكود موجود بالفعل في GitHub"
echo "   - اذهب إلى: https://app.netlify.com/start"
echo "   - اختر: Import from Git"
echo "   - حدد Repository: you3333ef/Youssef-Dafa"
echo "   - Branch: capy/cap-1-40a22b54"
echo "   - Build command: npm run build"
echo "   - Publish directory: dist"
echo "   - اضغط Deploy"
echo ""
echo "2️⃣  النشر اليدوي السريع:"
echo "   - اذهب إلى: https://app.netlify.com/drop"
echo "   - اسحب وأفلت مجلد 'dist' بالكامل"
echo ""
echo "3️⃣  النشر عبر Netlify CLI:"
echo "   - تم تثبيت Netlify CLI بالفعل"
echo "   - قم بتسجيل الدخول: netlify login"
echo "   - قم بالنشر: netlify deploy --prod --dir=dist"
echo ""
echo "================================================"
echo "✅ التطبيق جاهز للنشر الإنتاجي!"
echo "📊 حجم البناء: $(du -sh dist | cut -f1)"
echo "================================================"
