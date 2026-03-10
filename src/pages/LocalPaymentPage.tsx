import { useState } from "react";
import { MapPin, CreditCard, Building2, User, Phone, Hash, Home, Receipt } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getServiceVisualIdentity } from "@/lib/paymentVisualSystems";
import CustomPaymentHeader from "@/components/CustomPaymentHeader";
import CustomPaymentCard from "@/components/CustomPaymentCard";
import CustomPaymentInput from "@/components/CustomPaymentInput";
import CustomPaymentButton from "@/components/CustomPaymentButton";
import PaymentMetaTags from "@/components/PaymentMetaTags";

const LocalPaymentPage = () => {
  const visual = getServiceVisualIdentity('local_payment');
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [city, setCity] = useState("");

  const serviceTypes = [
    { id: "electricity", nameAr: "فاتورة الكهرباء", nameEn: "Electricity Bill", icon: "⚡" },
    { id: "water", nameAr: "فاتورة المياه", nameEn: "Water Bill", icon: "💧" },
    { id: "gas", nameAr: "فاتورة الغاز", nameEn: "Gas Bill", icon: "🔥" },
    { id: "internet", nameAr: "فاتورة الإنترنت", nameEn: "Internet Bill", icon: "🌐" },
    { id: "phone", nameAr: "فاتورة الهاتف", nameEn: "Phone Bill", icon: "📞" },
    { id: "municipality", nameAr: "رسوم البلدية", nameEn: "Municipality Fees", icon: "🏛️" },
    { id: "housing", nameAr: "رسوم الإسكان", nameEn: "Housing Fees", icon: "🏘️" },
  ];

  const cities = [
    "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "تبوك", "أبها", "الطائف", "بريدة"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <PaymentMetaTags
        serviceName="السداد المحلي"
        serviceKey="local_payment"
        amount={amount ? `${amount} ريال` : ""}
        title="السداد المحلي - دفع الفواتير والخدمات"
        description="ادفع فواتير الخدمات المحلية بسهولة وأمان"
      />

      <div 
        className="min-h-screen"
        style={{
          background: visual.gradients.background,
          fontFamily: visual.fonts.primary
        }}
      >
        <CustomPaymentHeader
          visual={visual}
          serviceName="السداد المحلي"
          amount={amount ? `${amount} ريال` : undefined}
          showSecurityBadge={true}
        />
        
        <div className="container mx-auto px-4 py-8" dir="rtl">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-4"
                style={{
                  background: visual.gradients.secondary,
                  boxShadow: visual.ui.shadows.md,
                }}
              >
                <Home className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-lg">دفع الفواتير والخدمات</span>
              </div>
              <p 
                className="text-base"
                style={{ 
                  color: visual.colors.textSecondary,
                  fontFamily: visual.fonts.secondary
                }}
              >
                ادفع فواتير الخدمات المحلية بسهولة وأمان
              </p>
            </div>

            <CustomPaymentCard visual={visual}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label 
                    htmlFor="serviceType" 
                    className="mb-3 text-sm font-bold flex items-center gap-2"
                    style={{ 
                      color: visual.colors.text,
                      fontFamily: visual.fonts.secondary
                    }}
                  >
                    <Building2 className="w-4 h-4" style={{ color: visual.colors.primary }} />
                    نوع الخدمة *
                  </Label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger 
                      style={{
                        height: visual.ui.inputHeight,
                        borderRadius: visual.ui.borderRadius.md,
                        border: `2px solid ${visual.colors.border}`,
                        fontFamily: visual.fonts.secondary,
                      }}
                    >
                      <SelectValue placeholder="اختر نوع الخدمة" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <span className="flex items-center gap-2">
                            <span>{service.icon}</span>
                            <span>{service.nameAr}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <CustomPaymentInput
                  visual={visual}
                  label="رقم الحساب / المشترك *"
                  icon={<Hash className="w-4 h-4" />}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="أدخل رقم الحساب"
                  required
                />

                <CustomPaymentInput
                  visual={visual}
                  label="الاسم الكامل *"
                  icon={<User className="w-4 h-4" />}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  required
                />

                <CustomPaymentInput
                  visual={visual}
                  label="رقم الجوال *"
                  icon={<Phone className="w-4 h-4" />}
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+966 5X XXX XXXX"
                  dir="ltr"
                  required
                />

                <div>
                  <Label 
                    htmlFor="city" 
                    className="mb-3 text-sm font-bold flex items-center gap-2"
                    style={{ 
                      color: visual.colors.text,
                      fontFamily: visual.fonts.secondary
                    }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: visual.colors.primary }} />
                    المدينة *
                  </Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger 
                      style={{
                        height: visual.ui.inputHeight,
                        borderRadius: visual.ui.borderRadius.md,
                        border: `2px solid ${visual.colors.border}`,
                        fontFamily: visual.fonts.secondary,
                      }}
                    >
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((cityName) => (
                        <SelectItem key={cityName} value={cityName}>
                          {cityName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <CustomPaymentInput
                  visual={visual}
                  label="المبلغ المطلوب *"
                  icon={<CreditCard className="w-4 h-4" />}
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />

                {/* Bill Summary */}
                <div 
                  className="p-5 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${visual.colors.primary}12, ${visual.colors.secondary}08)`,
                    border: `2px solid ${visual.colors.primary}30`,
                    borderRadius: visual.ui.borderRadius.lg
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-base font-semibold"
                      style={{ color: visual.colors.text }}
                    >
                      المبلغ الإجمالي:
                    </span>
                    <span 
                      className="text-3xl font-bold"
                      style={{ 
                        color: visual.colors.primary,
                        fontFamily: visual.fonts.primary,
                        fontWeight: visual.fonts.headingWeight
                      }}
                    >
                      {amount ? `${amount} ريال` : '---'}
                    </span>
                  </div>
                </div>

                <CustomPaymentButton
                  visual={visual}
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<Receipt className="w-5 h-5" />}
                  iconPosition="right"
                  disabled={!customerName || !customerPhone || !serviceType || !accountNumber || !amount || !city}
                >
                  التالي - إتمام السداد
                </CustomPaymentButton>

                <div 
                  className="flex items-center justify-center gap-2 p-3 rounded-lg"
                  style={{
                    background: `${visual.colors.success}10`,
                    borderRadius: visual.ui.borderRadius.md
                  }}
                >
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: visual.colors.success }}
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p 
                    className="text-xs font-medium"
                    style={{ color: visual.colors.text }}
                  >
                    جميع المعاملات مشفرة وآمنة
                  </p>
                </div>
              </form>
            </CustomPaymentCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocalPaymentPage;
