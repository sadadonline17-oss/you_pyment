# 🚀 دليل البدء السريع

## التطوير المحلي

### 1. تثبيت الحزم
```bash
npm install
```

### 2. تشغيل الخادم المحلي
```bash
npm run dev
```

### 3. بناء المشروع
```bash
npm run build
```

### 4. معاينة البناء
```bash
npm run preview
```

---

## 🎨 استخدام نظام الهوية البصرية

### الطريقة الأولى: DynamicBranding Component
```tsx
import { DynamicBranding } from '@/components/DynamicBranding';

function PaymentPage() {
  return (
    <DynamicBranding companyKey="aramex">
      <div>
        {/* المحتوى هنا سيستخدم ألوان أرامكس تلقائياً */}
      </div>
    </DynamicBranding>
  );
}
```

### الطريقة الثانية: استخدام useBranding Hook
```tsx
import { useBranding } from '@/components/DynamicBranding';

function CustomComponent() {
  const branding = useBranding('dhl');
  
  return (
    <div style={{ 
      color: branding.colors.primary,
      background: branding.gradients.hero 
    }}>
      محتوى مخصص
    </div>
  );
}
```

### الطريقة الثالثة: CSS Variables
```css
/* استخدم المتغيرات مباشرة في CSS */
.my-button {
  background: var(--brand-primary);
  color: var(--brand-text-on-primary);
  border-radius: var(--brand-radius-md);
  box-shadow: var(--brand-shadow-md);
}
```

---

## 🔗 توليد روابط فريدة

### مثال لإنشاء رابط دفع
```tsx
import { generatePaymentLink } from '@/utils/paymentLinks';

const paymentUrl = generatePaymentLink({
  invoiceId: 'INV-12345',
  company: 'aramex',
  country: 'SA'
});

// النتيجة:
// https://domain.com/pay/INV-12345/recipient?company=aramex&currency=SAR&title=Payment%20in%20Saudi%20Arabia
```

---

## 🏢 الشركات المدعومة

### شركات الشحن
- `aramex`, `dhl`, `fedex`, `ups`, `smsa`, `naqel`, `zajil`
- `saudipost`, `empost`, `qpost`, `kwpost`, `omanpost`, `bahpost`
- `albaraka`, `alfuttaim`, `alshaya`, `shipco`, `hellmann`, `dsv`
- `agility`, `jinaken`, `genacom`, `national`, `bahri`

### البنوك
- **السعودية**: `alrajhi`, `riyadh`, `snb`
- **الإمارات**: `emirates-nbd`, `adcb`, `fab`, `mashreq`
- **الكويت**: `nbk`, `kbt`, `gulf`
- **قطر**: `qnb`, `cboq`, `ibq`
- **عُمان**: `bankmuscat`, `sohar`, `nbo`
- **البحرين**: `nbf`, `bbk`, `abc`

### خدمات الدفع الحكومية
- `sadad` (السعودية)
- `knet` (الكويت)
- `benefit` (البحرين)

---

## 🌍 الدول المدعومة

| الكود | الدولة | العملة |
|------|--------|--------|
| SA | السعودية | SAR |
| AE | الإمارات | AED |
| KW | الكويت | KWD |
| QA | قطر | QAR |
| OM | عُمان | OMR |
| BH | البحرين | BHD |

---

## 📦 النشر على Netlify

### الطريقة الأولى: عبر Git
1. ارفع الكود على GitHub
2. اربط المستودع بـ Netlify
3. Netlify سيبني المشروع تلقائياً

### الطريقة الثانية: يدوياً
```bash
# بناء المشروع
npm run build

# النشر على Netlify CLI
netlify deploy --prod --dir=dist
```

---

## 🔧 إضافة شركة جديدة

1. **أضف الهوية البصرية في `src/lib/brandingSystem.ts`**:
```typescript
export const shippingCompanyBranding: Record<string, CompanyBranding> = {
  // ... الشركات الحالية
  
  mycompany: {
    id: 'mycompany',
    nameEn: 'My Company',
    nameAr: 'شركتي',
    colors: {
      primary: '#FF0000',
      secondary: '#0000FF',
      accent: '#FFFF00',
      background: '#FFFFFF',
      surface: '#F5F5F5',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E5E5',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FF0000 0%, #0000FF 100%)',
      secondary: 'linear-gradient(180deg, #FF0000 0%, #8B0000 100%)',
      hero: 'linear-gradient(to right, #FF0000 0%, #0000FF 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(255, 0, 0, 0.08)',
      md: '0 4px 6px -1px rgba(255, 0, 0, 0.15)',
      lg: '0 10px 15px -3px rgba(255, 0, 0, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://mycompany.com',
    description: 'وصف الشركة بالعربية',
  },
};
```

2. **أضف الشركة في قائمة الخدمات `src/lib/gccShippingServices.ts`**:
```typescript
export const gccShippingServices = {
  SA: [
    // ... الخدمات الحالية
    { 
      id: 'mycompany', 
      name: 'شركتي - My Company', 
      key: 'mycompany', 
      description: 'وصف الخدمة' 
    },
  ],
};
```

3. **أضف صورة Hero** (اختياري):
   - ضع الصورة في `src/assets/hero-mycompany.jpg`

---

## 🎨 تخصيص الألوان

### استخراج الألوان من شعار الشركة
استخدم أدوات مثل:
- [Coolors.co](https://coolors.co/image-picker)
- [Adobe Color](https://color.adobe.com/create/image)
- [Color Thief](https://lokeshdhakar.com/projects/color-thief/)

### الألوان المطلوبة
1. **Primary**: اللون الأساسي للشركة
2. **Secondary**: لون ثانوي مكمل
3. **Accent**: لون مميز للتفاصيل
4. **Background**: لون الخلفية (عادة أبيض)
5. **Surface**: لون الأسطح (رمادي فاتح جداً)
6. **Text**: لون النص الأساسي (عادة أسود)
7. **Text Light**: لون النص الثانوي (رمادي)
8. **Text on Primary**: لون النص على اللون الأساسي (عادة أبيض)
9. **Border**: لون الحدود (رمادي فاتح)

---

## 📝 ملاحظات مهمة

### الأمان
- ✅ لا تضع مفاتيح API في الكود
- ✅ استخدم متغيرات البيئة في Netlify
- ✅ Security Headers مفعلة تلقائياً

### الأداء
- ✅ الصور محسنة تلقائياً
- ✅ Code splitting جاهز
- ✅ Lazy loading للمكونات الكبيرة

### الصيانة
- ✅ كل شركة لها ملف منفصل في brandingSystem
- ✅ سهولة الإضافة والتعديل
- ✅ نظام مركزي للإدارة

---

## 🐛 حل المشاكل الشائعة

### 1. الألوان لا تظهر
```tsx
// تأكد من استخدام DynamicBranding
<DynamicBranding companyKey="aramex">
  {/* المحتوى */}
</DynamicBranding>
```

### 2. الشركة غير موجودة
```typescript
// تحقق من المفتاح في brandingSystem.ts
const branding = getBrandingByCompany('company-key');
if (!branding) {
  console.error('Company not found');
}
```

### 3. Build يفشل
```bash
# امسح الـ cache وأعد التثبيت
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📚 موارد إضافية

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Netlify Documentation](https://docs.netlify.com)

---

**تم إعداد هذا الدليل بواسطة Capy AI**
