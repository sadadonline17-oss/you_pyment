# دليل نشر Netlify Function للمشاركة الديناميكية
# Netlify Function Deployment Guide for Dynamic Social Sharing

## 🎯 المشكلة - Problem

حالياً، عند مشاركة رابط الدفع، تظهر صورة ووصف عام وليس خاص بالخدمة المختارة.

مثال:
- عند اختيار "فيديكس" → تظهر صورة وأرامكس ❌
- المطلوب: عند اختيار "فيديكس" → تظهر صورة ووصف فيديكس ✅

## ✅ الحل - Solution

### Netlify Function للـ Meta Tags الديناميكية

نحن نستخدم Netlify Function التي:
1. تسترجع بيانات الرابط من Supabase
2. تحدد نوع الخدمة المختارة
3. تخرج meta tags مخصصة بالخدمة

### مثال على الـ Meta Tags المولدة

#### لخدمة فيديكس (FedEx):
```html
<meta property="og:title" content="فيديكس - FedEx | تتبع شحنتك وأكمل الدفع" />
<meta property="og:description" content="خدمات شحن دولية موثوقة مع تتبع فوري للشحنات" />
<meta property="og:image" content="/og-fedex.jpg" />
```

#### لخدمة DHL:
```html
<meta property="og:title" content="دي إتش إل - DHL | تتبع شحنتك وأكمل الدفع" />
<meta property="og:description" content="شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي" />
<meta property="og:image" content="/og-dhl.jpg" />
```

## 🚀 كيفية النشر - Deployment

### الطريقة الأولى: Git Repository (مستحسنة)

```bash
# 1. إنشاء Git repository
git init
git add .
git commit -m "Add Netlify function for dynamic meta tags"

# 2. ربط بـ Netlify
# - اذهب إلى https://app.netlify.com
# - اختر "New site from Git"
# - اختر GitHub/GitLab/Bitbucket
# - ارفع الكود

# Netlify سيتعرف على netlify.toml تلقائياً وينشر الدالة
```

### الطريقة الثانية: Netlify CLI

```bash
# 1. تثبيت Netlify CLI
npm install -g netlify-cli

# 2. تسجيل الدخول
netlify login

# 3. ربط المشروع
netlify link

# 4. نشر الدالة
netlify deploy --dir=dist --prod
```

## 🔧 إعدادات Netlify

### في netlify.toml، نحدد:
```toml
[build]
  publish = "dist"
  command = "npm run build"
  functions = "netlify/functions"  # ← مهم!

[[redirects]]
  from = "/r/*"
  to = "/.netlify/functions/microsite-meta"
  status = 200

[[redirects]]
  from = "/pay/*"
  to = "/.netlify/functions/microsite-meta"
  status = 200
```

### في Netlify Dashboard:
1. اذهب إلى Site Settings > Functions
2. تأكد أن Functions مفعلة
3. المسار: `/netlify/functions/`

## 📊 اختبار الدالة - Testing

```bash
# اختبار رابط فيديكس
curl "https://your-site.netlify.app/r/SA/shipping/123-456-789"

# يجب أن ترى:
# - Title يحتوي على "فيديكس"
# - Description خاص بفيديكس
# - og:image يشير إلى og-fedex.jpg
```

## 🎨 الخدمات المدعومة

الدالة تدعم جميع الخدمات:

1. **أرامكس** (aramex) → og-aramex.jpg
2. **دي إتش إل** (dhl) → og-dhl.jpg
3. **فيديكس** (fedex) → og-fedex.jpg
4. **يو بي إس** (ups) → og-ups.jpg
5. **سمسا** (smsa) → og-smsa.jpg
6. **زاجل** (zajil) → og-zajil.jpg
7. **ناقل** (naqel) → og-naqel.jpg
8. **البريد السعودي** (saudipost) → og-saudipost.jpg
9. **البريد الكويتي** (kwpost) → og-kwpost.jpg
10. **البريد القطري** (qpost) → og-qpost.jpg
11. **البريد العُماني** (omanpost) → og-omanpost.jpg
12. **البريد البحريني** (bahpost) → og-bahpost.jpg

## 🔍 كيف تعمل الدالة - How It Works

1. **استقبال الطلب**:
   ```
   /r/SA/shipping/{id}
   ```

2. **استخراج المعاملات**:
   ```javascript
   country = "SA"
   type = "shipping"
   id = "uuid"
   ```

3. **جلب بيانات الرابط من Supabase**:
   ```sql
   SELECT * FROM links WHERE id = 'uuid'
   ```

4. **تحديد الخدمة**:
   ```javascript
   serviceKey = linkData.payload.service_key
   // مثال: "fedex"
   ```

5. **الحصول على معلومات الخدمة**:
   ```javascript
   serviceInfo = serviceData[serviceKey]
   // مثال: {
   //   name: "فيديكس - FedEx",
   //   description: "خدمات شحن دولية موثوقة",
   //   ogImage: "/og-fedex.jpg"
   // }
   ```

6. **توليد HTML مع Meta Tags**:
   ```html
   <meta property="og:title" content="فيديكس - FedEx | تتبع شحنتك وأكمل الدفع" />
   <meta property="og:description" content="خدمات شحن دولية موثوقة مع تتبع فوري للشحنات" />
   <meta property="og:image" content="https://your-site.netlify.app/og-fedex.jpg" />
   ```

## 📝 معرفات الخدمات - Service Keys

| الخدمة | Service Key | صورة |
|--------|------------|------|
| أرامكس | `aramex` | og-aramex.jpg |
| فيديكس | `fedex` | og-fedex.jpg |
| DHL | `dhl` | og-dhl.jpg |
| UPS | `ups` | og-ups.jpg |
| سمسا | `smsa` | og-smsa.jpg |
| زاجل | `zajil` | og-zajil.jpg |
| ناقل | `naqel` | og-naqel.jpg |
| البريد السعودي | `saudipost` | og-saudipost.jpg |

## 🐛 استكشاف الأخطاء - Troubleshooting

### الدالة لا تعمل
```bash
# فحص logs في Netlify Dashboard
# Site > Functions > microsite-meta > View logs
```

### خطأ Supabase
- تأكد من متغيرات البيئة:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

### خطأ 404
- تأكد من إعدادات redirects في netlify.toml
- تأكد أن Functions مفعلة في Netlify Dashboard

## 📊 النتائج المتوقعة - Expected Results

### قبل النشر:
- جميع الروابط تظهر صورة ووصف أرامكس العام ❌

### بعد النشر:
- رابط فيديكس → صورة ووصف فيديكس ✅
- رابط DHL → صورة ووصف DHL ✅
- رابط UPS → صورة ووصف UPS ✅
- إلخ...

## 🎯 الخطوات التالية - Next Steps

1. نشر الكود عبر Git repository
2. تفعيل Netlify Function
3. اختبار الروابط
4. التأكد من أن Meta Tags تظهر بشكل صحيح

---
**التاريخ**: 2025-11-09  
**الحالة**: جاهز للنشر ✅
