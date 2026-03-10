import { useState } from 'react';
import { Heart, Calendar, User, CreditCard, Activity, FileText, Phone, ShieldPlus, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getServiceVisualIdentity } from '@/lib/paymentVisualSystems';
import CustomPaymentHeader from '@/components/CustomPaymentHeader';
import CustomPaymentCard from '@/components/CustomPaymentCard';
import CustomPaymentInput from '@/components/CustomPaymentInput';
import CustomPaymentButton from '@/components/CustomPaymentButton';
import { Label } from '@/components/ui/label';

const HealthPayment = () => {
  const visual = getServiceVisualIdentity('health');
  
  const [specialty, setSpecialty] = useState("");
  const [patientName, setPatientName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        background: visual.gradients.background,
        fontFamily: visual.fonts.primary
      }}
    >
      <CustomPaymentHeader
        visual={visual}
        serviceName="الخدمات الصحية"
        amount="200 ر.س"
        showSecurityBadge={true}
      />
      
      <div className="container mx-auto px-4 py-8" dir="rtl">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
              style={{
                background: visual.gradients.primary,
                boxShadow: visual.ui.shadows.lg,
              }}
            >
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ 
                color: visual.colors.primary,
                fontFamily: visual.fonts.primary,
                fontWeight: visual.fonts.headingWeight
              }}
            >
              حجز موعد طبي
            </h1>
            <p 
              className="text-base"
              style={{ 
                color: visual.colors.textSecondary,
                fontFamily: visual.fonts.secondary
              }}
            >
              احجز موعدك مع أفضل الأطباء والمراكز الصحية
            </p>
          </div>

          <CustomPaymentCard visual={visual}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label 
                  htmlFor="specialty" 
                  className="flex items-center gap-2 mb-3 text-sm font-bold"
                  style={{ 
                    color: visual.colors.text,
                    fontFamily: visual.fonts.secondary
                  }}
                >
                  <Activity className="w-4 h-4" style={{ color: visual.colors.primary }} />
                  التخصص الطبي
                </Label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger 
                    style={{
                      height: visual.ui.inputHeight,
                      borderRadius: visual.ui.borderRadius.md,
                      border: `2px solid ${visual.colors.border}`,
                      fontFamily: visual.fonts.secondary,
                    }}
                  >
                    <SelectValue placeholder="اختر التخصص" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">طب عام</SelectItem>
                    <SelectItem value="cardio">أمراض القلب</SelectItem>
                    <SelectItem value="dental">طب الأسنان</SelectItem>
                    <SelectItem value="derma">الأمراض الجلدية</SelectItem>
                    <SelectItem value="ortho">جراحة العظام</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <CustomPaymentInput
                  visual={visual}
                  label="اسم المريض"
                  icon={<User className="w-4 h-4" />}
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="الاسم الكامل"
                />

                <CustomPaymentInput
                  visual={visual}
                  label="رقم الهوية"
                  icon={<FileText className="w-4 h-4" />}
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  placeholder="1234567890"
                />

                <CustomPaymentInput
                  visual={visual}
                  label="تاريخ الموعد"
                  icon={<Calendar className="w-4 h-4" />}
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />

                <div>
                  <Label 
                    htmlFor="appointment-time" 
                    className="flex items-center gap-2 mb-3 text-sm font-bold"
                    style={{ 
                      color: visual.colors.text,
                      fontFamily: visual.fonts.secondary
                    }}
                  >
                    <Clock className="w-4 h-4" style={{ color: visual.colors.primary }} />
                    وقت الموعد
                  </Label>
                  <Select value={appointmentTime} onValueChange={setAppointmentTime}>
                    <SelectTrigger 
                      style={{
                        height: visual.ui.inputHeight,
                        borderRadius: visual.ui.borderRadius.md,
                        border: `2px solid ${visual.colors.border}`,
                        fontFamily: visual.fonts.secondary,
                      }}
                    >
                      <SelectValue placeholder="اختر الوقت" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09">09:00 صباحاً</SelectItem>
                      <SelectItem value="10">10:00 صباحاً</SelectItem>
                      <SelectItem value="11">11:00 صباحاً</SelectItem>
                      <SelectItem value="14">02:00 مساءً</SelectItem>
                      <SelectItem value="16">04:00 مساءً</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label 
                  htmlFor="notes" 
                  className="mb-3 text-sm font-bold flex items-center gap-2"
                  style={{ 
                    color: visual.colors.text,
                    fontFamily: visual.fonts.secondary
                  }}
                >
                  <FileText className="w-4 h-4" style={{ color: visual.colors.primary }} />
                  ملاحظات إضافية
                </Label>
                <textarea 
                  id="notes" 
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-4 border-2 resize-none focus:outline-none transition-all"
                  placeholder="أضف أي ملاحظات أو أعراض..."
                  style={{
                    borderRadius: visual.ui.borderRadius.md,
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

              {/* Consultation Fee Summary */}
              <div 
                className="p-5 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${visual.colors.primary}15, ${visual.colors.secondary}10)`,
                  border: `2px solid ${visual.colors.primary}30`,
                  borderRadius: visual.ui.borderRadius.lg
                }}
              >
                <div className="flex justify-between items-center">
                  <span 
                    className="text-base font-semibold"
                    style={{ color: visual.colors.text }}
                  >
                    رسوم الكشف:
                  </span>
                  <span 
                    className="text-3xl font-bold"
                    style={{ 
                      color: visual.colors.primary,
                      fontFamily: visual.fonts.primary,
                      fontWeight: visual.fonts.headingWeight
                    }}
                  >
                    200 ر.س
                  </span>
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
              >
                تأكيد الحجز والدفع
              </CustomPaymentButton>
            </form>
          </CustomPaymentCard>

          {/* Important Information */}
          <div 
            className="mt-8 p-6 rounded-xl"
            style={{
              background: visual.colors.surface,
              boxShadow: visual.ui.shadows.md,
              borderRadius: visual.ui.borderRadius.lg,
              border: `1px solid ${visual.colors.border}`
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: visual.gradients.primary }}
              >
                <ShieldPlus className="w-5 h-5 text-white" />
              </div>
              <h3 
                className="text-xl font-bold"
                style={{ 
                  color: visual.colors.primary,
                  fontFamily: visual.fonts.primary,
                  fontWeight: visual.fonts.headingWeight
                }}
              >
                معلومات مهمة
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                'يرجى الحضور قبل الموعد بـ 15 دقيقة',
                'إحضار بطاقة الهوية الوطنية',
                'إمكانية إعادة الجدولة مجاناً قبل 24 ساعة',
                'خدمة استشارة طبية عن بُعد متاحة'
              ].map((info, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: visual.colors.accent }}
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span 
                    className="text-sm font-medium"
                    style={{ 
                      color: visual.colors.text,
                      fontFamily: visual.fonts.secondary
                    }}
                  >
                    {info}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthPayment;
