# ⚡ الحل السريع - 3 خطوات فقط

## 🎯 المشكلة

**رابط DHL يعرض صورة Aramex** ❌

## 🔧 السبب

WhatsApp **لا يشغل JavaScript** - يقرأ HTML الثابت فقط!

## ✅ الحل

تم تحديث **Edge Function** لتعديل HTML على السيرفر.

---

## 🚀 ما يجب عليك فعله الآن

### 1️⃣ انشر على Netlify (إلزامي!)

**افتح Netlify Dashboard:**
1. https://app.netlify.com/
2. اختر موقعك
3. Deploys → Trigger deploy → Deploy site
4. انتظر 3 دقائق ✅

**أو باستخدام CLI:**
```bash
cd /project/workspace/you3333ef/Youssef-Dafa
netlify deploy --prod --dir=dist
```

### 2️⃣ استخدم روابط جديدة

**أضف `&v=2` لكل رابط جديد:**

```
?company=dhl&currency=AED&v=2
?company=fedex&currency=AED&v=3
?company=aramex&currency=SAR&v=4
```

### 3️⃣ نظّف Cache

**Facebook Debugger:**
- https://developers.facebook.com/tools/debug/
- الصق الرابط مع &v=2
- اضغط "Fetch new scrape information" 3 مرات
- جرب في WhatsApp ✅

---

## 🧪 كيف تتحقق

### بعد النشر

**افتح الرابط واضغط Ctrl+U:**
```
https://kaleidoscopic-kheer-73d72f.netlify.app/pay/xxx?company=dhl&v=2
```

**ابحث عن:**
```html
<meta property="og:image" content="...og-dhl.jpg" />
```

**يجب أن يكون DHL وليس Aramex!** ✅

---

## 💯 النتيجة

**بعد النشر + v=2:**
- ✅ DHL → صورة DHL
- ✅ FedEx → صورة FedEx
- ✅ كل شركة → صورتها!

---

**⚠️ يجب النشر على Netlify أولاً!** ⚠️

**الكود جاهز - انشر الآن!** 🚀
