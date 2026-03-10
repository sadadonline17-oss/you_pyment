# تحليل وإصلاح مشكلة صورة الكاروسيل 🔍

## 🐛 المشكلة المكتشفة

### الأعراض:
- صفحة جيوان (الإمارات) تعرض صورة **سداد البرتقالية** في الكاروسيل ❌
- الهيدر يعرض "جيوان" بشكل صحيح ✅
- لكن صورة الكاروسيل لا تتطابق مع الدولة المختارة ❌

### الصورة المرفقة:
```
الهيدر: جيوان (صحيح) ✅
الكاروسيل: صورة سداد البرتقالية (خطأ) ❌
```

---

## 🔍 تحليل السبب الجذري

### المشكلة الأساسية:
في @src/components/BrandedCarousel.tsx، كانت الدالة `getCompanyImages()` تعتمد فقط على `serviceKey` لتحديد الصور.

**السيناريو الفعلي:**
```typescript
// عندما ينشئ المستخدم رابط دفع حكومي
serviceKey = "jaywan-passport"  // أو أي خدمة جيوان
countryCode = "AE"              // الإمارات
isGovService = true
```

**لكن الكود القديم كان:**
```typescript
const getCompanyImages = (serviceKey: string): string[] => {
  const key = serviceKey.toLowerCase();
  
  // كان يبحث عن jaywan- أولاً
  if (key.startsWith('jaywan-') || key === 'jaywan') {
    return ['/gov-uae-logo.jpg', ...];
  }
  
  // لكن إذا كان serviceKey شيء آخر مثل "government_payment"
  // كان يسقط إلى government_payment في allImages
  // والذي يعرض صورة عامة
}
```

### السبب الحقيقي:
عندما ينشئ المستخدم رابط دفع حكومي، `serviceKey` قد يكون:
- `"jaywan-passport"` ✅ - هذا يعمل
- `"government_payment"` ❌ - هذا يعرض صورة عامة
- `"payment"` ❌ - هذا يسقط إلى default

**المشكلة:**
في بعض الحالات (خاصة عند تمرير البيانات من الـ URL أو linkData)، قد يكون `serviceKey` عاماً وليس محدداً بدقة.

---

## ✅ الحل المطبق

### 1. إضافة دعم countryCode في BrandedCarousel

**قبل:**
```typescript
interface BrandedCarouselProps {
  serviceKey: string;
  className?: string;
}

const getCompanyImages = (serviceKey: string): string[] => {
  // يعتمد فقط على serviceKey
}
```

**بعد:**
```typescript
interface BrandedCarouselProps {
  serviceKey: string;
  className?: string;
  countryCode?: string;      // ✅ جديد
  isGovService?: boolean;    // ✅ جديد
}

const getCompanyImages = (serviceKey: string, countryCode?: string, isGovService?: boolean): string[] => {
  // الآن يعتمد على countryCode أولاً للخدمات الحكومية
  
  // أولوية: countryCode للخدمات الحكومية
  if (isGovService && countryCode) {
    const govImages: Record<string, string[]> = {
      'SA': ['/gov-sadad-official.png', ...],
      'AE': ['/gov-uae-logo.jpg', ...],
      'KW': ['/gov-knet-logo.png', ...],
      'BH': ['/gov-benefit-logo.png', ...],
      'OM': ['/gov-maal-logo.jpg', ...],
      'QA': ['/gov-qatar-logo.png', ...]
    };
    
    const images = govImages[countryCode.toUpperCase()];
    if (images) {
      return images;  // ✅ مضمون
    }
  }
  
  // ثم التحقق من serviceKey prefix (fallback)
  if (key.startsWith('jaywan-') || key === 'jaywan') {
    return ['/gov-uae-logo.jpg', ...];
  }
  // ... إلخ
}
```

### 2. تحديث جميع الصفحات لتمرير countryCode

**الصفحات المحدثة:**

#### ✅ PaymentRecipient.tsx (السطر 282-287)
```typescript
<BrandedCarousel 
  serviceKey={serviceKey}      // قد يكون عام
  className="mb-0" 
  countryCode={countryCode}    // ✅ محدد دقيق (AE, SA, KW, إلخ)
  isGovService={isGovService}  // ✅ true للخدمات الحكومية
/>
```

#### ✅ PaymentData.tsx (السطر 181-186)
```typescript
<BrandedCarousel 
  serviceKey={serviceKey} 
  className="mb-0" 
  countryCode={countryCode}    // ✅ محدد دقيق
  isGovService={isGovService}  // ✅ true للخدمات الحكومية
/>
```

#### ✅ PaymentDetails.tsx (السطر 153-158)
```typescript
<BrandedCarousel 
  serviceKey={serviceKey} 
  className="mb-0"
  countryCode={countryCode}    // ✅ محدد دقيق
  isGovService={isGovService}  // ✅ true للخدمات الحكومية
/>
```

---

## 🎯 النتيجة المتوقعة

### الآن عندما يفتح المستخدم رابط جيوان:

```
URL: /pay/ABC123?service=jaywan-passport&country=AE
أو
URL: /pay/ABC123?service=government_payment&country=AE

↓

countryCode = "AE" (من URL أو من linkData)
isGovService = true (خدمة حكومية)

↓

BrandedCarousel يستقبل:
- serviceKey = "jaywan-passport" أو "government_payment"
- countryCode = "AE" ✅
- isGovService = true ✅

↓

getCompanyImages() يتحقق:
1. هل isGovService = true؟ نعم
2. هل countryCode موجود؟ نعم "AE"
3. إذن ارجع: ['/gov-uae-logo.jpg', ...] ✅

↓

النتيجة: صورة جيوان الإماراتي تظهر ✅✅✅
```

### نفس المنطق لجميع الدول:

| الدولة | countryCode | الصورة المعروضة |
|--------|------------|------------------|
| 🇸🇦 السعودية | SA | `/gov-sadad-official.png` |
| 🇦🇪 الإمارات | AE | `/gov-uae-logo.jpg` |
| 🇰🇼 الكويت | KW | `/gov-knet-logo.png` |
| 🇧🇭 البحرين | BH | `/gov-benefit-logo.png` |
| 🇴🇲 عُمان | OM | `/gov-maal-logo.jpg` |
| 🇶🇦 قطر | QA | `/gov-qatar-logo.png` |

---

## 🧪 التحقق من الإصلاح

### خطوات الاختبار:

1. **افتح أي رابط دفع حكومي**
2. **افتح Console في المتصفح** (F12 → Console)
3. **ابحث عن السجلات:**

```
🔍 PaymentRecipient - serviceKey: jaywan-passport
🔍 PaymentRecipient - countryCode: AE
🔍 PaymentRecipient - isGovService: true
🔍 PaymentRecipient - govSystem: جيوان

🖼️ BrandedCarousel - serviceKey: jaywan-passport
🖼️ BrandedCarousel - countryCode: AE
🖼️ BrandedCarousel - isGovService: true
🖼️ BrandedCarousel - images: ["/gov-uae-logo.jpg", ...]
```

4. **تحقق من صورة الكاروسيل** - يجب أن تطابق الدولة!

---

## 📊 ترتيب الأولويات في تحديد الصور

```
1. isGovService && countryCode → استخدم خريطة الدولة ✅ (أولوية قصوى)
2. serviceKey prefix (jaywan-, knet-, etc.) → استخدم الشعار المحدد (احتياطي)
3. serviceKey في allImages → صور الشركات العادية
4. entityImages → صور الكيان المكتشف من URL
5. default → لا شيء
```

---

## 🔧 الملفات المعدلة

| الملف | التغيير | السطور |
|-------|---------|---------|
| `BrandedCarousel.tsx` | إضافة countryCode و isGovService props | 57-61 |
| `BrandedCarousel.tsx` | تحديث getCompanyImages() لقبول countryCode | 64-122 |
| `BrandedCarousel.tsx` | إضافة debug logs | 290-295 |
| `PaymentRecipient.tsx` | تمرير countryCode و isGovService | 282-287 |
| `PaymentRecipient.tsx` | إضافة debug logs | 86-89 |
| `PaymentData.tsx` | إضافة isGovService check | 59 |
| `PaymentData.tsx` | تمرير countryCode و isGovService | 181-186 |
| `PaymentDetails.tsx` | تمرير countryCode و isGovService | 153-158 |

---

## ✅ التأكيدات

- ✅ البناء ينجح بدون أخطاء
- ✅ جميع الشعارات موجودة في `/public`
- ✅ الكود مرفوع على GitHub (`capy/cap-1-530350ae`)
- ✅ Debug logs مضافة لتتبع أي مشاكل
- ✅ جاهز للنشر على Netlify

---

## 🚨 ملاحظة مهمة

إذا استمرت المشكلة بعد النشر:
1. **امسح Cache المتصفح** (Ctrl+Shift+Delete)
2. **افتح وضع Incognito/Private**
3. **تحقق من Console logs** للتأكد من القيم الصحيحة
4. **تأكد من أن Netlify نشر آخر نسخة** (commit: 41cfd88)

الكود الآن **مضمون** أن يعرض الصورة الصحيحة بناءً على **countryCode** وليس فقط **serviceKey**.
