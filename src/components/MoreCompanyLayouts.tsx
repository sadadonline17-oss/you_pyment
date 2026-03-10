import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBrandingByCompany } from '@/lib/brandingSystem';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Shield,
  CreditCard,
  Star
} from 'lucide-react';

interface CompanyLayoutProps {
  companyKey: string;
  children: React.ReactNode;
  trackingNumber?: string;
  amount?: string;
}

export const NAQELLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('naqel');
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div 
        className="h-24 shadow-lg"
        style={{ background: branding?.gradients.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-lg">
              <span className="font-black text-2xl" style={{ color: branding?.colors.primary }}>
                ناقل
              </span>
            </div>
            <div className="text-white">
              <p className="font-bold text-xl">NAQEL EXPRESS</p>
              <p className="text-sm opacity-90">#1 في المملكة العربية السعودية</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-yellow-400 text-yellow-900 px-3 py-1">
              <Star className="w-4 h-4 ml-1 fill-current" />
              الأعلى تقييماً
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { icon: Truck, label: 'توصيل سريع', color: branding?.colors.primary },
            { icon: Shield, label: 'آمن 100%', color: branding?.colors.secondary },
            { icon: MapPin, label: 'تتبع GPS', color: branding?.colors.primary },
            { icon: CheckCircle2, label: 'ضمان الجودة', color: branding?.colors.secondary }
          ].map((item, idx) => (
            <Card key={idx} className="p-4 text-center hover:shadow-lg transition-all">
              <div 
                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <p className="font-bold text-sm">{item.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="p-8 shadow-xl">
              <div 
                className="flex items-center gap-3 mb-6 pb-4 border-b-2"
                style={{ borderBottomColor: branding?.colors.primary }}
              >
                <CreditCard className="w-7 h-7" style={{ color: branding?.colors.primary }} />
                <h2 className="text-2xl font-bold">الدفع الآمن</h2>
              </div>
              {children}
            </Card>
          </div>

          <div className="space-y-4">
            {amount && (
              <Card 
                className="p-6 text-white text-center"
                style={{ background: branding?.gradients.primary }}
              >
                <p className="text-sm opacity-90 mb-2">المبلغ الإجمالي</p>
                <p className="text-3xl font-black">{amount}</p>
              </Card>
            )}

            {trackingNumber && (
              <Card className="p-6">
                <h3 className="font-bold mb-3">معلومات الشحنة</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">رقم التتبع:</span>
                    <span className="font-mono">{trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الحالة:</span>
                    <Badge className="bg-green-100 text-green-800">نشط</Badge>
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-blue-700" />
                <h3 className="font-bold text-blue-900">ناقل إكسبرس</h3>
              </div>
              <p className="text-sm text-blue-800">
                أكثر من 50 مليون شحنة تم توصيلها بنجاح في 2025
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ZajilLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('zajil');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }} dir="rtl">
      <div 
        className="h-20"
        style={{ background: branding?.gradients.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <span className="font-black text-xl" style={{ color: branding?.colors.primary }}>
                زاجل
              </span>
            </div>
            <span className="text-white font-bold text-lg">Zajil Express</span>
          </div>
          <div className="text-white text-sm">
            <p className="font-semibold">Yes, Delivered</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 max-w-4xl mx-auto shadow-2xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <h1 className="text-3xl font-bold">عملية الدفع</h1>
            {amount && (
              <div className="text-left">
                <p className="text-sm text-gray-600">المجموع</p>
                <p className="text-2xl font-bold" style={{ color: branding?.colors.primary }}>
                  {amount}
                </p>
              </div>
            )}
          </div>

          {children}

          {trackingNumber && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">رقم التتبع</p>
              <p className="font-mono font-bold text-lg">{trackingNumber}</p>
            </div>
          )}
        </Card>

        <div className="max-w-4xl mx-auto mt-6 grid grid-cols-3 gap-4">
          {[
            { icon: Truck, text: '120+ فرع', sub: 'في المملكة' },
            { icon: Clock, text: 'توصيل سريع', sub: 'خلال 24 ساعة' },
            { icon: Shield, text: 'دفع آمن', sub: 'SSL مشفر' }
          ].map((item, idx) => (
            <Card key={idx} className="p-4 text-center">
              <item.icon className="w-8 h-8 mx-auto mb-2" style={{ color: branding?.colors.primary }} />
              <p className="font-bold text-sm">{item.text}</p>
              <p className="text-xs text-gray-600">{item.sub}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SaudiPostLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('saudipost');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50" dir="rtl">
      <div 
        className="h-24"
        style={{ background: branding?.gradients.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl flex items-center gap-2">
              <span className="font-black text-xl" style={{ color: branding?.colors.primary }}>
                البريد السعودي
              </span>
            </div>
            <div className="text-white">
              <p className="font-bold">Saudi Post | SPL</p>
              <p className="text-xs opacity-90">المشغل الوطني للبريد</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white">عضو UPU</Badge>
            <Badge className="bg-white/20 text-white">منذ 1927</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-3 mb-8">
            {[
              { icon: Package, label: 'شحن وطني', color: branding?.colors.primary },
              { icon: Truck, label: 'توصيل محلي', color: branding?.colors.secondary },
              { icon: MapPin, label: 'تتبع دقيق', color: branding?.colors.primary },
              { icon: Shield, label: 'آمن ومضمون', color: branding?.colors.secondary }
            ].map((item, idx) => (
              <Card 
                key={idx}
                className="p-4 text-center border-2 hover:shadow-lg transition-all"
                style={{ borderColor: `${item.color}30` }}
              >
                <div 
                  className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <p className="font-bold text-xs">{item.label}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b-2" style={{ borderBottomColor: branding?.colors.primary }}>
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: branding?.gradients.primary }}
              >
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">بوابة الدفع الحكومية</h2>
                <p className="text-sm text-gray-600">نظام دفع آمن ومعتمد</p>
              </div>
              {amount && (
                <div className="mr-auto text-left">
                  <p className="text-sm text-gray-600">المبلغ المستحق</p>
                  <p className="text-2xl font-bold" style={{ color: branding?.colors.primary }}>{amount}</p>
                </div>
              )}
            </div>

            {children}
          </Card>

          {trackingNumber && (
            <Card className="mt-6 p-6 bg-gradient-to-r from-green-100 to-yellow-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 mb-1">رقم الشحنة</p>
                  <p className="font-mono font-bold text-xl">{trackingNumber}</p>
                </div>
                <Badge className="bg-green-600 text-white px-4 py-2">
                  <CheckCircle2 className="w-4 h-4 ml-1" />
                  معتمد
                </Badge>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export const UPSLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('ups');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF8F7' }} dir="rtl">
      <div 
        className="h-20"
        style={{ backgroundColor: branding?.colors.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded"
              style={{ backgroundColor: branding?.colors.secondary }}
            >
              <span className="font-black text-2xl" style={{ color: branding?.colors.primary }}>
                UPS
              </span>
            </div>
            <span className="text-white font-bold">United Parcel Service</span>
          </div>
          {amount && (
            <div 
              className="px-4 py-2 rounded font-bold"
              style={{ backgroundColor: branding?.colors.secondary }}
            >
              {amount}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div 
              className="w-16 h-16 rounded flex items-center justify-center"
              style={{ backgroundColor: `${branding?.colors.secondary}20` }}
            >
              <Shield className="w-8 h-8" style={{ color: branding?.colors.primary }} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">Secure Checkout</h1>
              <p className="text-gray-600">What can brown do for you today?</p>
            </div>
          </div>

          {children}

          {trackingNumber && (
            <div className="mt-6 p-4 rounded" style={{ backgroundColor: `${branding?.colors.secondary}30` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold mb-1">Tracking Number</p>
                  <p className="font-mono text-lg">{trackingNumber}</p>
                </div>
                <Package className="w-8 h-8" style={{ color: branding?.colors.primary }} />
              </div>
            </div>
          )}
        </Card>

        <div className="max-w-4xl mx-auto mt-6 text-center">
          <p className="text-sm text-gray-600">
            © 2025 United Parcel Service of America, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default {
  NAQELLayout,
  ZajilLayout,
  SaudiPostLayout,
  UPSLayout
};
