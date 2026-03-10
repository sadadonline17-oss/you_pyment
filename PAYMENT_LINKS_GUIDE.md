# 🔗 دليل صفحات روابط الدفع - Payment Links Guide

## 📋 المشكلة الحالية
الموقع غير منشور على Netlify، لذلك يظهر خطأ "Site not found" عند زيارة الرابط.

## ✅ الحلول المتاحة

### الحل 1: نشر الموقع على Netlify (موصى به)

#### خطوات النشر باستخدام GitHub:

1. **افتح حساب Netlify**
   - اذهب إلى: https://app.netlify.com/
   - سجل دخول باستخدام GitHub

2. **ربط المشروع من GitHub**
   ```
   - اضغط "Add new site" → "Import an existing project"
   - اختر "Deploy with GitHub"
   - ابحث عن repository: you3333ef/Youssef-Dafa
   - اختر branch: capy/cap-1-0a849097 أو main
   ```

3. **إعدادات Build**
   ```
   Build command: npm ci && npm run build
   Publish directory: dist
   Node version: 20.12.1
   ```

4. **Deploy**
   - اضغط "Deploy site"
   - انتظر حتى ينتهي الـ build (حوالي 2-3 دقائق)
   - سيتم إنشاء رابط جديد للموقع

#### خطوات النشر باستخدام Netlify CLI:

```bash
# 1. تسجيل الدخول
netlify login

# 2. إنشاء موقع جديد أو ربط موقع موجود
netlify init

# 3. نشر الموقع
cd /project/workspace/you3333ef/Youssef-Dafa
npm run build
netlify deploy --prod --dir=dist
```

---

### الحل 2: نشر يدوي بدون CLI

1. **بناء المشروع**
   ```bash
   cd /project/workspace/you3333ef/Youssef-Dafa
   npm install
   npm run build
   ```

2. **رفع مجلد dist**
   - اذهب إلى: https://app.netlify.com/drop
   - اسحب مجلد `dist` إلى الصفحة
   - سيتم رفع الموقع فوراً وإعطاؤك رابط

---

## 🔗 كيفية إنشاء روابط الدفع

بعد نشر الموقع، يمكنك إنشاء روابط دفع بالطرق التالية:

### 1. رابط دفع لشركة شحن (مثال: Aramex)

```
https://YOUR-SITE.netlify.app/pay/INV123/recipient?company=aramex&currency=SAR&title=Aramex%20Shipping
```

**المعاملات المطلوبة:**
- `company`: اسم الشركة (aramex, dhl, fedex, ups, smsa, naqel, zajil)
- `currency`: العملة (SAR, AED, KWD, QAR, OMR, BHD)
- `title`: عنوان الدفع (مشفر URL)

### 2. رابط دفع حكومي

```
https://YOUR-SITE.netlify.app/government-payment?country=SA&amount=500&currency=SAR&service=sadad
```

**المعاملات المطلوبة:**
- `country`: كود الدولة (SA, AE, KW, QA, OM, BH)
- `amount`: المبلغ
- `currency`: العملة
- `service`: الخدمة الحكومية (sadad, knet, benefit, maal)

### 3. رابط دفع فاتورة

```
https://YOUR-SITE.netlify.app/pay/INV123/recipient?company=invoices&currency=SAR&title=Invoice%20Payment
```

### 4. رابط دفع عقد

```
https://YOUR-SITE.netlify.app/contract-payment?country=SA&amount=1000&currency=SAR
```

### 5. رابط دفع شاليه

```
https://YOUR-SITE.netlify.app/chalet-payment?country=SA&amount=500&currency=SAR
```

---

## 🎨 صور المعاينة (Open Graph)

الموقع يدعم صور معاينة تلقائية عند المشاركة على:
- WhatsApp
- Facebook
- Twitter/X
- Telegram
- LinkedIn

**الصور المتاحة:**
- `/og-aramex.jpg` - أرامكس
- `/og-dhl.jpg` - DHL
- `/og-fedex.jpg` - FedEx
- `/og-ups.jpg` - UPS
- `/og-smsa.jpg` - سمسا
- `/og-naqel.jpg` - ناقل
- `/og-zajil.jpg` - زاجل
- `/og-government_payment.jpg` - الدفع الحكومي
- `/og-health_links.jpg` - الخدمات الصحية
- `/og-chalets.jpg` - الشاليهات
- `/og-contracts.jpg` - العقود
- `/og-invoices.jpg` - الفواتير

---

## 🚀 روابط سريعة للاختبار

بعد النشر، استبدل `YOUR-SITE.netlify.app` برابط موقعك:

### شركات الشحن:
- Aramex: `https://YOUR-SITE.netlify.app/pay/TEST001/recipient?company=aramex&currency=SAR&title=Aramex%20Test`
- DHL: `https://YOUR-SITE.netlify.app/pay/TEST002/recipient?company=dhl&currency=AED&title=DHL%20Test`
- FedEx: `https://YOUR-SITE.netlify.app/pay/TEST003/recipient?company=fedex&currency=KWD&title=FedEx%20Test`

### الخدمات الحكومية:
- سداد: `https://YOUR-SITE.netlify.app/government-payment?country=SA&amount=100&currency=SAR&service=sadad`
- كي نت: `https://YOUR-SITE.netlify.app/government-payment?country=KW&amount=50&currency=KWD&service=knet`
- بنفت: `https://YOUR-SITE.netlify.app/government-payment?country=BH&amount=30&currency=BHD&service=benefit`

---

## 🔧 استكشاف الأخطاء

### المشكلة: الصفحة فارغة أو بيضاء
**الحل:**
```bash
# مسح الكاش
1. افتح: https://YOUR-SITE.netlify.app/clear-cache.html
2. اضغط "Clear All Cache"
3. أعد تحميل الصفحة (Ctrl+Shift+R)
```

### المشكلة: "Site not found"
**الحل:**
- الموقع غير منشور على Netlify
- اتبع خطوات النشر أعلاه

### المشكلة: الصور لا تظهر عند المشاركة
**الحل:**
- تأكد من وجود parameter `company` في الرابط
- انتظر 2-3 دقائق حتى تُحدث منصات التواصل الكاش
- استخدم أداة Facebook Debugger: https://developers.facebook.com/tools/debug/

---

## 📱 أمثلة روابط كاملة

### مثال 1: دفع شحنة أرامكس من السعودية
```
https://YOUR-SITE.netlify.app/pay/ARX-2025-001/recipient?company=aramex&currency=SAR&title=%D8%AF%D9%81%D8%B9%20%D8%B4%D8%AD%D9%86%D8%A9%20%D8%A3%D8%B1%D8%A7%D9%85%D9%83%D8%B3
```

### مثال 2: دفع سداد حكومي
```
https://YOUR-SITE.netlify.app/government-payment?country=SA&amount=250&currency=SAR&service=sadad&description=%D8%AF%D9%81%D8%B9%20%D8%AE%D8%AF%D9%85%D8%A9%20%D8%AD%D9%83%D9%88%D9%85%D9%8A%D8%A9
```

### مثال 3: دفع فاتورة محلية
```
https://YOUR-SITE.netlify.app/local-payment?country=AE&amount=500&currency=AED&description=Invoice%20INV-2025-123
```

---

## 📞 الدعم الفني

إذا واجهت أي مشكلة:
1. تحقق من console في المتصفح (F12 → Console)
2. تحقق من Netlify deploy logs
3. تأكد من أن جميع parameters مشفرة بـ URL encoding

---

## 🎯 الخطوة التالية

**لتشغيل الموقع الآن:**
1. نشر الموقع على Netlify (الحل 1 أو 2 أعلاه)
2. الحصول على رابط الموقع
3. استبدال `YOUR-SITE.netlify.app` برابط موقعك في جميع الأمثلة
4. اختبار الروابط
5. مشاركة روابط الدفع مع العملاء

---

**آخر تحديث:** 12 ديسمبر 2025
**الحالة:** ✅ الكود جاهز | ⏳ في انتظار النشر على Netlify
