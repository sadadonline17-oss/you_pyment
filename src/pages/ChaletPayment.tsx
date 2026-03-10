import { useState } from 'react';
import { Calendar, MapPin, Users, CreditCard, Home, Shield, Star } from 'lucide-react';
import { getServiceVisualIdentity } from '@/lib/paymentVisualSystems';
import CustomPaymentHeader from '@/components/CustomPaymentHeader';
import CustomPaymentCard from '@/components/CustomPaymentCard';
import CustomPaymentInput from '@/components/CustomPaymentInput';
import CustomPaymentButton from '@/components/CustomPaymentButton';

const ChaletPayment = () => {
  const visual = getServiceVisualIdentity('chalet');
  
  const [chaletName, setChaletName] = useState("");
  const [guests, setGuests] = useState("4");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

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
        serviceName="حجز الشاليهات"
        amount="1,500 ر.س"
        logo="/placeholder.svg"
        showSecurityBadge={true}
      />
      
      <div className="container mx-auto px-4 py-8" dir="rtl">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-4"
              style={{
                background: visual.gradients.secondary,
                boxShadow: visual.ui.shadows.md,
              }}
            >
              <Home className="w-5 h-5 text-white" />
              <span className="text-white font-bold text-lg">احجز شاليه أحلامك</span>
            </div>
            <p 
              className="text-base"
              style={{ 
                color: visual.colors.textSecondary,
                fontFamily: visual.fonts.secondary
              }}
            >
              استمتع بإقامة مميزة في أفضل الشاليهات
            </p>
          </div>

          <CustomPaymentCard visual={visual}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <CustomPaymentInput
                  visual={visual}
                  label="اسم الشاليه"
                  icon={<MapPin className="w-4 h-4" />}
                  value={chaletName}
                  onChange={(e) => setChaletName(e.target.value)}
                  placeholder="أدخل اسم الشاليه"
                />

                <CustomPaymentInput
                  visual={visual}
                  label="عدد الضيوف"
                  icon={<Users className="w-4 h-4" />}
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="4"
                />

                <CustomPaymentInput
                  visual={visual}
                  label="تاريخ الوصول"
                  icon={<Calendar className="w-4 h-4" />}
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />

                <CustomPaymentInput
                  visual={visual}
                  label="تاريخ المغادرة"
                  icon={<Calendar className="w-4 h-4" />}
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              {/* Amount Summary */}
              <div 
                className="p-6 rounded-xl"
                style={{
                  background: `${visual.colors.primary}08`,
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
                    1,500 ر.س
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
                إتمام الحجز والدفع
              </CustomPaymentButton>
            </form>
          </CustomPaymentCard>

          {/* Features Section */}
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
                <Star className="w-5 h-5 text-white" />
              </div>
              <h3 
                className="text-xl font-bold"
                style={{ 
                  color: visual.colors.primary,
                  fontFamily: visual.fonts.primary,
                  fontWeight: visual.fonts.headingWeight
                }}
              >
                مميزات الحجز
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                'دفع آمن ومضمون 100%',
                'إمكانية الإلغاء المجاني قبل 24 ساعة',
                'خدمة عملاء على مدار الساعة',
                'تأكيد فوري للحجز'
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: visual.colors.success }}
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
                    {feature}
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

export default ChaletPayment;
