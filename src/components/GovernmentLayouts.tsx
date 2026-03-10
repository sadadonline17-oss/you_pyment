import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { governmentPaymentSystems } from '@/lib/governmentPaymentSystems';
import { 
  Shield, 
  Lock, 
  CheckCircle2, 
  CreditCard,
  Building2,
  Globe,
  Smartphone,
  Landmark,
  FileText,
  ShieldCheck
} from 'lucide-react';

interface GovernmentLayoutProps {
  countryCode: string;
  children: React.ReactNode;
  amount?: string;
  serviceName?: string;
}

// 🇸🇦 SADAD - السعودية
export const SADADLayout: React.FC<GovernmentLayoutProps> = ({ 
  children, 
  amount, 
  serviceName 
}) => {
  const govSystem = governmentPaymentSystems.SA;
  
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F9FAFB', fontFamily: govSystem.fonts.primaryAr }} dir="rtl">
      <header className="bg-white border-b-4 border-[#F58220] shadow-md">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20 sm:h-24">
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="bg-white p-2 rounded-md">
                <img 
                  src={govSystem.logo} 
                  alt="سداد" 
                  className="h-12 sm:h-16 w-auto object-contain"
                />
              </div>
              <div className="hidden md:block w-px h-14 bg-gray-200" />
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">نظام سداد للمدفوعات</h1>
                <p className="text-xs sm:text-sm text-gray-600">البوابة الحكومية للخدمات والفواتير</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#F58220]/10 px-3 sm:px-4 py-2 rounded-lg border border-[#F58220]/20">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#F58220]" />
              <span className="text-xs sm:text-sm font-bold text-[#F58220]">بوابة آمنة</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#F58220] via-[#F58220] to-[#E67317] px-6 sm:px-8 py-6 sm:py-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <Landmark className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-3xl font-bold mb-1">{serviceName || 'خدمة حكومية'}</h2>
                    <p className="text-white/90 text-xs sm:text-sm">SADAD - نظام المدفوعات الحكومية</p>
                  </div>
                </div>
                {amount && (
                  <div className="bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-center hidden sm:block">
                    <span className="block text-xs text-[#F58220] font-semibold mb-1">المبلغ</span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#F58220]" dir="ltr">{amount}</span>
                  </div>
                )}
              </div>
            </div>

            {amount && (
              <div className="bg-gradient-to-r from-[#FFF8F0] to-[#FFF0E0] border-b-2 border-[#F58220]/20 p-4 text-center sm:hidden">
                <p className="text-xs text-gray-600 mb-1">المبلغ المطلوب</p>
                <p className="text-2xl font-bold text-[#F58220]" dir="ltr">{amount}</p>
              </div>
            )}

            <div className="p-6 sm:p-10">
              {children}
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 sm:px-8 py-5 border-t-2 border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Lock className="w-4 h-4 text-[#F58220]" />
                  <span>تشفير SSL 256-bit</span>
                </div>
                <span className="hidden sm:inline text-gray-400">•</span>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-[#F58220]" />
                  <span>معتمد من البنك المركزي السعودي (ساما)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              © {new Date().getFullYear()} سداد - نظام المدفوعات الوطني السعودي. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

// 🇦🇪 eDirham - الإمارات
// Official eDirham branding: Orange #FF9933, Gray #666666
export const UAELayout: React.FC<GovernmentLayoutProps> = ({ 
  children, 
  amount, 
  serviceName 
}) => {
  const govSystem = governmentPaymentSystems.AE;
  
  return (
    <div className="min-h-screen bg-[#F8F9FA]" style={{ fontFamily: govSystem.fonts.primaryAr }} dir="rtl">
      <header className="bg-white shadow-md border-b-4 border-[#FF9933]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-24 sm:h-28">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="bg-white p-2 rounded-md">
                <img 
                  src="/gov-uae-logo.jpg" 
                  alt="eDirham" 
                  className="h-14 sm:h-16 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FF7700] flex items-center justify-center shadow-lg';
                      fallback.innerHTML = '<span class="text-white text-xl sm:text-2xl font-bold">eDH</span>';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <div className="hidden sm:block w-px h-14 bg-gray-200" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-[#333333]">الدرهم الإلكتروني</h1>
                <p className="text-xs sm:text-sm text-[#666666]">eDirham - نظام الدفع الإلكتروني الحكومي</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#FF9933]/10 px-3 sm:px-4 py-2 rounded-lg border border-[#FF9933]/20">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9933]" />
              <span className="text-xs sm:text-sm font-bold text-[#FF9933]">بوابة آمنة</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-t-[6px] border-[#FF9933] overflow-hidden">
            <div className="bg-gradient-to-r from-[#FF9933]/5 to-[#FF7700]/5 px-6 sm:px-8 py-5 sm:py-6 border-b-2 border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-1">{serviceName || 'خدمة حكومية'}</h2>
                  <p className="text-sm text-[#666666]">نظام الدفع الإلكتروني الموحد - Unified e-Payment</p>
                </div>
                {amount && (
                  <div className="bg-white border-2 border-[#FF9933] rounded-xl px-5 py-3 text-center shadow-md">
                    <span className="block text-xs text-[#666666] mb-1">المبلغ الإجمالي</span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#FF7700]" dir="ltr">{amount}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 sm:p-10">
              {children}
            </div>
            
            <div className="bg-[#F8F9FA] px-6 sm:px-8 py-5 border-t-2 border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs sm:text-sm text-[#666666]">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#FF9933]" />
                  <span>SSL 256-bit Encryption</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF9933]" />
                  <span>UAE Ministry of Finance Certified</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-xs text-gray-400">
            <p>© {new Date().getFullYear()} eDirham - نظام الدفع الإلكتروني الحكومي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// 🇶🇦 NAPS - قطر
export const QatarLayout: React.FC<GovernmentLayoutProps> = ({ 
  children, 
  amount, 
  serviceName 
}) => {
  const govSystem = governmentPaymentSystems.QA;
  
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: govSystem.fonts.primaryAr }} dir="rtl">
      <header className="bg-[#8D1B3D] text-white shadow-2xl border-b-4 border-[#D4AF37]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-24 sm:h-28">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="bg-white p-3 rounded-lg shadow-xl">
                <img src={govSystem.logo} alt="حكومي" className="h-12 sm:h-14 w-auto object-contain" />
              </div>
              <div className="hidden sm:block w-px h-14 bg-white/20" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">حكومي - Hukoomi</h1>
                <p className="text-xs sm:text-sm text-white/90">بوابة قطر الرسمية للخدمات الإلكترونية</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-semibold">English</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Maroon Pattern Strip */}
      <div className="h-2 bg-[#6B1529] w-full mb-8 relative">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[#D4AF37]" />
      </div>

      <main className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-6 border-b border-gray-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#8D1B3D] rounded-full flex items-center justify-center text-white">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#8D1B3D]">{serviceName}</h2>
                <p className="text-sm text-gray-600">بوابة الدفع الإلكتروني</p>
              </div>
              {amount && (
                <div className="bg-white border border-[#8D1B3D]/20 px-4 py-2 rounded-md">
                  <span className="text-[#8D1B3D] font-bold text-lg">{amount}</span>
                </div>
              )}
            </div>

            <div className="p-8">
              {children}
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>جميع الحقوق محفوظة © حكومة دولة قطر {new Date().getFullYear()}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// 🇰🇼 KNET - الكويت
export const KNETLayout: React.FC<GovernmentLayoutProps> = ({ 
  children, 
  amount, 
  serviceName 
}) => {
  const govSystem = governmentPaymentSystems.KW;
  
  return (
    <div className="min-h-screen bg-[#F5F5F5]" style={{ fontFamily: govSystem.fonts.primaryAr }} dir="rtl">
      <header className="bg-white shadow-md border-b">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-20 sm:h-24">
            <div className="bg-white p-2 rounded-md">
              <img src={govSystem.logo} alt="KNET" className="h-14 sm:h-16 w-auto object-contain" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[#007A3D] font-bold text-base sm:text-xl">بوابة الدفع الإلكتروني</span>
              <span className="text-gray-500 text-xs sm:text-sm">Kuwait National Payment Gateway</span>
            </div>
          </div>
        </div>
      </header>
      <div className="h-2 bg-gradient-to-r from-[#007A3D] via-[#CE1126] to-black w-full shadow-md" />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border-t-4 border-[#007A3D]">
          <div className="bg-[#007A3D]/5 p-6 border-b border-[#007A3D]/10">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[#007A3D] font-bold text-lg mb-1">تفاصيل العملية</h3>
                <p className="text-sm text-gray-600 font-medium">{serviceName}</p>
              </div>
              {amount && (
                <div className="text-left">
                  <p className="text-xs text-gray-500">المبلغ</p>
                  <p className="text-2xl font-bold text-gray-900">{amount}</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            {children}
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#007A3D]" />
              <span className="text-xs text-gray-500 font-medium">Safe & Secure Payment</span>
            </div>
            <img src={govSystem.logo} alt="KNET Small" className="h-6 opacity-50" />
          </div>
        </div>
      </main>
    </div>
  );
};

// 🇧🇭 Benefit - البحرين
export const BENEFITLayout: React.FC<GovernmentLayoutProps> = ({ 
  children, 
  amount, 
  serviceName 
}) => {
  const govSystem = governmentPaymentSystems.BH;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" style={{ fontFamily: govSystem.fonts.primaryAr }} dir="rtl">
      <header className="bg-white shadow-lg border-b-4 border-[#CE1126]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20 sm:h-24">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="bg-white p-2 rounded-md">
                <img src={govSystem.logo} alt="Benefit" className="h-14 sm:h-16 w-auto object-contain" />
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-200" />
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-[#CE1126]">بنفت - BENEFIT</h1>
                <p className="text-xs sm:text-sm text-gray-600">الشبكة الإلكترونية للمعاملات المالية</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#CE1126]/10 px-3 sm:px-4 py-2 rounded-lg border border-[#CE1126]/20">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#CE1126]" />
              <span className="text-xs sm:text-sm font-bold text-[#CE1126]">بوابة آمنة</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-[#CE1126] p-6 text-white text-center relative">
              <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
              <img src="/gov-benefit-logo.png" alt="Benefit White" className="h-8 mx-auto mb-4 brightness-0 invert" />
              <h2 className="text-xl font-bold relative z-10">{serviceName}</h2>
              {amount && <p className="text-3xl font-bold mt-2 relative z-10">{amount}</p>}
            </div>

            <div className="p-6">
              {children}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all">
            <img src="/gov-benefit-logo.png" alt="Benefit" className="h-6" />
            <div className="h-6 w-px bg-gray-300" />
            <span className="text-xs text-gray-500 self-center">مرخص من مصرف البحرين المركزي</span>
          </div>
        </div>
      </main>
    </div>
  );
};

// 🇴🇲 Thawani - عمان
export const OmanLayout: React.FC<GovernmentLayoutProps> = ({ 
  children, 
  amount, 
  serviceName 
}) => {
  const govSystem = governmentPaymentSystems.OM;
  
  return (
    <div className="min-h-screen bg-[#FAFAFA]" style={{ fontFamily: govSystem.fonts.primaryAr }} dir="rtl">
      <header className="bg-white border-b-4 border-[#D0032C] shadow-md">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20 sm:h-24">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="bg-white p-2 rounded-md">
                <img src={govSystem.logo} alt="ثواني" className="h-14 sm:h-16 w-auto object-contain" />
              </div>
              <div className="hidden sm:block w-px h-14 bg-gray-200" />
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">بوابة الدفع الإلكتروني</h1>
                <p className="text-xs sm:text-sm text-[#D0032C] font-semibold">سلطنة عُمان - Sultanate of Oman</p>
              </div>
            </div>
            <div className="bg-white p-2 rounded-md shadow-md">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Emblem_of_Oman.svg/1200px-Emblem_of_Oman.svg.png" alt="Oman Emblem" className="h-12 sm:h-14 w-auto object-contain" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="flex flex-col sm:flex-row">
            {/* Side Info Panel */}
            <div className="sm:w-1/3 bg-gray-50 p-6 border-l border-gray-100 flex flex-col justify-center items-center text-center">
              <Smartphone className="w-12 h-12 text-[#009A44] mb-3" />
              <h3 className="font-bold text-gray-800 mb-1">{serviceName}</h3>
              <p className="text-xs text-gray-500 mb-4">خدمة الدفع الذكي</p>
              {amount && (
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm w-full">
                  <span className="block text-xs text-gray-400 mb-1">المبلغ الإجمالي</span>
                  <span className="block text-xl font-bold text-[#D0032C]">{amount}</span>
                </div>
              )}
            </div>

            {/* Form Area */}
            <div className="sm:w-2/3 p-6 sm:p-8">
              {children}
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Powered by Thawani Pay | مرخص من البنك المركزي العماني
          </p>
        </div>
      </main>
    </div>
  );
};

export const getGovernmentLayout = (countryCode: string) => {
  switch (countryCode?.toUpperCase()) {
    case 'SA': return SADADLayout;
    case 'AE': return UAELayout;
    case 'QA': return QatarLayout;
    case 'KW': return KNETLayout;
    case 'BH': return BENEFITLayout;
    case 'OM': return OmanLayout;
    default: return SADADLayout;
  }
};

export default {
  SADADLayout,
  UAELayout,
  QatarLayout,
  KNETLayout,
  BENEFITLayout,
  OmanLayout,
  getGovernmentLayout
};