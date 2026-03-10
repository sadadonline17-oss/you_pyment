import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyCode, getCurrencySymbol } from "@/lib/countryCurrencies";
import { useCreateLink } from "@/hooks/useSupabase";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { Heart, Copy, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

const CreateHealthLink = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const countryData = getCountryByCode(country?.toUpperCase() || "");
  
  const createLink = useCreateLink();
  
  const [serviceType, setServiceType] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [appointmentAmount, setAppointmentAmount] = useState<number>(0);
  const [doctorName, setDoctorName] = useState<string>("");
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const serviceTypes = [
    { value: "consultation", label: "استشارة طبية", icon: "👨‍⚕️", defaultPrice: 200 },
    { value: "checkup", label: "فحص دوري", icon: "🔬", defaultPrice: 150 },
    { value: "vaccination", label: "تطعيم", icon: "💉", defaultPrice: 100 },
    { value: "lab", label: "تحاليل مخبرية", icon: "🧪", defaultPrice: 250 },
    { value: "dental", label: "طب الأسنان", icon: "🦷", defaultPrice: 300 },
    { value: "eye", label: "طب العيون", icon: "👁️", defaultPrice: 180 },
    { value: "physiotherapy", label: "علاج طبيعي", icon: "💪", defaultPrice: 220 },
    { value: "mental", label: "صحة نفسية", icon: "🧠", defaultPrice: 250 },
  ];

  const selectedServiceType = serviceTypes.find(s => s.value === serviceType);
  
  const handleServiceTypeChange = (value: string) => {
    setServiceType(value);
    const service = serviceTypes.find(s => s.value === value);
    if (service) {
      setAppointmentAmount(service.defaultPrice);
    }
  };
  
  const handleCreate = async () => {
    if (!countryData || !serviceType) {
      toast({
        title: "خطأ",
        description: "الرجاء تعبئة جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      service_type: serviceType,
      service_type_label: selectedServiceType?.label || '',
      service_type_icon: selectedServiceType?.icon || '',
      patient_name: patientName,
      doctor_name: doctorName,
      payment_amount: appointmentAmount,
      currency_code: getCurrencyCode(country || "SA"),
      payment_method: "card",
      selectedCountry: country || "SA",
    };

    try {
      const link = await createLink.mutateAsync({
        type: "health_links",
        country_code: country!,
        payload,
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: "health_links",
        country: country || 'SA',
        amount: appointmentAmount,
        currency: getCurrencyCode(country || "SA"),
        paymentMethod: "card",
      });

      setCreatedLink(paymentUrl);
      
      toast({
        title: "تم إنشاء رابط الدفع بنجاح!",
        description: "يمكنك الآن مشاركة الرابط مع المريض",
      });
    } catch (error) {
      toast({
        title: "خطأ في إنشاء الرابط",
        description: "حدث خطأ أثناء إنشاء رابط الدفع. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };
  
  const handleCopy = () => {
    if (createdLink) {
      navigator.clipboard.writeText(createdLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "تم النسخ!",
        description: "تم نسخ الرابط إلى الحافظة",
      });
    }
  };
  
  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center p-8">
          <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2 text-foreground">الدولة غير موجودة</h2>
          <p className="text-muted-foreground mb-6">الرجاء اختيار دولة صحيحة</p>
          <Button onClick={() => navigate('/services')}>العودة للخدمات</Button>
        </div>
      </div>
    );
  }
  
  if (createdLink) {
    return (
      <div className="min-h-screen py-6" dir="rtl">
        <div className="container mx-auto px-4">
          <Card className="max-w-xl mx-auto p-4 text-center">
            <div className="w-14 h-14 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-7 h-7 text-white" />
            </div>
            
            <h2 className="text-xl font-bold mb-2">تم إنشاء رابط الدفع بنجاح!</h2>
            <p className="text-sm text-muted-foreground mb-4">
              شارك هذا الرابط مع المريض للدفع
            </p>

            <div className="bg-secondary/50 p-4 rounded-lg mb-4 space-y-2 text-right">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{selectedServiceType?.label}</span>
                <span className="text-muted-foreground">الخدمة:</span>
              </div>
              {patientName && (
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{patientName}</span>
                  <span className="text-muted-foreground">اسم المريض:</span>
                </div>
              )}
              {doctorName && (
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{doctorName}</span>
                  <span className="text-muted-foreground">اسم الطبيب:</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50">
                <span className="font-bold text-lg">
                  {formatCurrency(appointmentAmount, getCurrencyCode(country || "SA"))}
                </span>
                <span className="text-muted-foreground">المبلغ:</span>
              </div>
            </div>

            <div className="bg-secondary/50 p-3 rounded-lg mb-4 break-all">
              <code className="text-xs">{createdLink}</code>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4 ml-2" />
                    <span className="text-sm">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 ml-2" />
                    <span className="text-sm">نسخ الرابط</span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => window.open(createdLink, "_blank")}
              >
                <span className="ml-2 text-sm">عرض المعاينة</span>
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              className="mt-4 text-sm"
              onClick={() => navigate("/services")}
            >
              إنشاء رابط جديد
            </Button>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-6" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, #E63946, #F77F7F)`,
                }}
              >
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">الخدمات الصحية - {countryData.nameAr}</h1>
                <p className="text-xs text-muted-foreground">أنشئ رابط دفع لموعد طبي</p>
              </div>
            </div>
          </div>
          
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm mb-2">نوع الخدمة *</Label>
                <Select value={serviceType} onValueChange={handleServiceTypeChange}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="اختر نوع الخدمة..." />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          <span className="text-sm">{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {serviceType && (
                <>
                  <div>
                    <Label className="text-sm mb-2">
                      اسم المريض (اختياري)
                    </Label>
                    <Input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="أدخل اسم المريض..."
                      className="h-9 text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2">
                      اسم الطبيب (اختياري)
                    </Label>
                    <Input
                      type="text"
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      placeholder="أدخل اسم الطبيب..."
                      className="h-9 text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2">
                      مبلغ الموعد ({getCurrencySymbol(country || "SA")})
                    </Label>
                    <Input
                      type="number"
                      value={appointmentAmount}
                      onChange={(e) => setAppointmentAmount(Number(e.target.value))}
                      className="h-9 text-sm"
                      min="0"
                      step="0.01"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      💡 السعر الافتراضي: {selectedServiceType?.defaultPrice} {getCurrencySymbol(country || "SA")}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-xl text-white">
                    <p className="text-xs mb-1">المبلغ الإجمالي</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(appointmentAmount, getCurrencyCode(country || "SA"))}
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleCreate}
                    disabled={createLink.isPending}
                    className="w-full py-5"
                  >
                    {createLink.isPending ? (
                      <span className="text-sm">جاري الإنشاء...</span>
                    ) : (
                      <>
                        <span className="ml-2 text-sm">إنشاء رابط الدفع</span>
                        <ArrowRight className="w-4 h-4 mr-2" />
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

export default CreateHealthLink;
