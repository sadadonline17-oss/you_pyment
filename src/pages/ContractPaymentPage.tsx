import { useState } from "react";
import { FileText, CreditCard, User, Phone, Hash, Calendar, Scale, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getServiceVisualIdentity } from "@/lib/paymentVisualSystems";
import CustomPaymentHeader from "@/components/CustomPaymentHeader";
import CustomPaymentCard from "@/components/CustomPaymentCard";
import CustomPaymentInput from "@/components/CustomPaymentInput";
import CustomPaymentButton from "@/components/CustomPaymentButton";
import PaymentMetaTags from "@/components/PaymentMetaTags";

const ContractPaymentPage = () => {
  const visual = getServiceVisualIdentity('contracts');
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [contractType, setContractType] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const contractTypes = [
    { id: "rental", nameAr: "عقد إيجار", nameEn: "Rental Contract" },
    { id: "employment", nameAr: "عقد عمل", nameEn: "Employment Contract" },
    { id: "service", nameAr: "عقد خدمات", nameEn: "Service Contract" },
    { id: "partnership", nameAr: "عقد شراكة", nameEn: "Partnership Contract" },
    { id: "purchase", nameAr: "عقد بيع", nameEn: "Purchase Contract" },
    { id: "maintenance", nameAr: "عقد صيانة", nameEn: "Maintenance Contract" },
    { id: "consulting", nameAr: "عقد استشاري", nameEn: "Consulting Contract" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <PaymentMetaTags
        serviceName="دفع العقود"
        serviceKey="contracts"
        amount={amount ? `${amount} ريال` : ""}
        title="دفع العقود - سداد عقود رسمية"
        description="ادفع مستحقات العقود الرسمية بسهولة وأمان"
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
          serviceName="دفع العقود الرسمية"
          amount={amount ? `${amount} ريال` : undefined}
          showSecurityBadge={true}
        />
        
        <div className="container mx-auto px-4 py-8" dir="rtl">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg mb-4"
                style={{
                  background: visual.gradients.secondary,
                  boxShadow: visual.ui.shadows.md,
                  borderRadius: visual.ui.borderRadius.md,
                }}
              >
                <Scale className="w-6 h-6 text-white" />
                <span className="text-white font-bold text-lg">سداد مستحقات العقود</span>
              </div>
              <p 
                className="text-base"
                style={{ 
                  color: visual.colors.textSecondary,
                  fontFamily: visual.fonts.secondary
                }}
              >
                إتمام سداد العقود الرسمية بأمان وسرعة
              </p>
            </div>

            <CustomPaymentCard visual={visual}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label 
                    htmlFor="contractType" 
                    className="mb-3 text-sm font-bold flex items-center gap-2"
                    style={{ 
                      color: visual.colors.text,
                      fontFamily: visual.fonts.secondary
                    }}
                  >
                    <FileText className="w-4 h-4" style={{ color: visual.colors.primary }} />
                    نوع العقد *
                  </Label>
                  <Select value={contractType} onValueChange={setContractType}>
                    <SelectTrigger 
                      style={{
                        height: visual.ui.inputHeight,
                        borderRadius: visual.ui.borderRadius.sm,
                        border: `2px solid ${visual.colors.border}`,
                        fontFamily: visual.fonts.secondary,
                      }}
                    >
                      <SelectValue placeholder="اختر نوع العقد" />
                    </SelectTrigger>
                    <SelectContent>
                      {contractTypes.map((contract) => (
                        <SelectItem key={contract.id} value={contract.id}>
                          {contract.nameAr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <CustomPaymentInput
                  visual={visual}
                  label="رقم العقد *"
                  icon={<Hash className="w-4 h-4" />}
                  value={contractNumber}
                  onChange={(e) => setContractNumber(e.target.value)}
                  placeholder="أدخل رقم العقد"
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

                <CustomPaymentInput
                  visual={visual}
                  label="تاريخ الاستحقاق *"
                  icon={<Calendar className="w-4 h-4" />}
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />

                <CustomPaymentInput
                  visual={visual}
                  label="المبلغ المستحق *"
                  icon={<CreditCard className="w-4 h-4" />}
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />

                <div>
                  <Label 
                    htmlFor="notes" 
                    className="mb-3 text-sm font-bold"
                    style={{ 
                      color: visual.colors.text,
                      fontFamily: visual.fonts.secondary
                    }}
                  >
                    ملاحظات (اختياري)
                  </Label>
                  <textarea 
                    id="notes" 
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-4 border-2 resize-none focus:outline-none transition-all"
                    placeholder="أضف أي ملاحظات إضافية"
                    style={{
                      borderRadius: visual.ui.borderRadius.sm,
                      borderColor: visual.colors.border,
                      fontFamily: visual.fonts.secondary,
                      fontSize: '15px',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = visual.colors.primary;
                      e.target.style.boxShadow = `0 0 0 3px ${visual.colors.primary}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = visual.colors.border;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Contract Summary */}
                <div 
                  className="p-5 rounded-lg"
                  style={{
                    background: `${visual.colors.primary}08`,
                    border: `2px solid ${visual.colors.primary}30`,
                    borderRadius: visual.ui.borderRadius.md
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: visual.colors.textSecondary }}>نوع العقد:</span>
                      <span 
                        className="font-semibold"
                        style={{ color: visual.colors.text }}
                      >
                        {contractType ? contractTypes.find(c => c.id === contractType)?.nameAr : '---'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: visual.colors.textSecondary }}>رقم العقد:</span>
                      <span 
                        className="font-semibold"
                        style={{ color: visual.colors.text }}
                      >
                        {contractNumber || '---'}
                      </span>
                    </div>
                    <div 
                      className="h-px"
                      style={{ background: visual.colors.border }}
                    />
                    <div className="flex items-center justify-between pt-1">
                      <span 
                        className="font-bold text-base"
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
                </div>

                <CustomPaymentButton
                  visual={visual}
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<CreditCard className="w-5 h-5" />}
                  iconPosition="right"
                  disabled={!customerName || !customerPhone || !contractType || !contractNumber || !amount || !dueDate}
                >
                  التالي - إتمام السداد
                </CustomPaymentButton>

                <div 
                  className="flex items-center gap-3 p-4 rounded-lg"
                  style={{
                    background: `${visual.colors.success}10`,
                    border: `1px solid ${visual.colors.success}30`,
                    borderRadius: visual.ui.borderRadius.md
                  }}
                >
                  <Shield className="w-5 h-5" style={{ color: visual.colors.success }} />
                  <p 
                    className="text-xs"
                    style={{ 
                      color: visual.colors.text,
                      fontFamily: visual.fonts.secondary
                    }}
                  >
                    🔒 جميع المعاملات مشفرة وآمنة ومطابقة للأنظمة
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

export default ContractPaymentPage;
