# 🚀 دليل النشر السريع - Quick Deploy Guide

## المشكلة - Problem
عند مشاركة رابط فيديكس، تظهر صورة ووصف أرامكس ❌

## الحل - Solution
Netlify Function تجعل Meta Tags ديناميكية ✅

## النشر - Deploy (3 خطوات)

### الخطوة 1: Git Repository
```bash
cd gulf-unified-gateway
git init
git add .
git commit -m "Add dynamic meta tags for services"
```

### الخطوة 2: GitHub (أو GitLab)
```bash
# إنشاء repo جديد على GitHub
# ثم:
git remote add origin https://github.com/yourusername/gulf-unified-gateway.git
git push -u origin main
```

### الخطوة 3: Netlify
1. اذهب إلى: https://app.netlify.com
2. "New site from Git"
3. اختر GitHub
4. اختر repo: `gulf-unified-gateway`
5. **Deploy!**

## ✅ النتيجة

بعد النشر، كل رابط سيظهر صورة ووصف الخدمة المختارة:

- رابط فيديكس → صورة فيديكس ✅
- رابط DHL → صورة DHL ✅
- رابط UPS → صورة UPS ✅

## 📚 الملفات المهمة

- `netlify/functions/microsite-meta.js` - الدالة
- `netlify.toml` - الإعدادات
- `_redirects` - التوجيه

## 🎯 فقط هذا!

3 خطوات تنشر وتدخل حيّز التنفيذ! 🚀
