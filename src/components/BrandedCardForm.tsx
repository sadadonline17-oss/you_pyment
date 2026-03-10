import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { getBrandingByCompany } from '@/lib/brandingSystem';
import { getCompanyDesignSystem, getCardFormDesign } from '@/lib/designSystemComplete';
import BrandedInput from './BrandedInput';
import BrandedButton from './BrandedButton';
import SecurityBadges, { CardLogos } from './SecurityBadges';
import { CreditCard, Calendar, Lock, User, AlertCircle } from 'lucide-react';

interface BrandedCardFormProps {
  companyKey: string;
  onSubmit: (data: CardFormData) => void;
  amount?: string;
  currency?: string;
  loading?: boolean;
}

export interface CardFormData {
  cardName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export const BrandedCardForm: React.FC<BrandedCardFormProps> = ({
  companyKey,
  onSubmit,
  amount,
  currency = 'ر.س',
  loading = false,
}) => {
  const branding = getBrandingByCompany(companyKey);
  const designSystem = getCompanyDesignSystem(companyKey);
  const formDesign = getCardFormDesign('premium');
  
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };
  
  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    if (cleaned.length <= 16 && /^\d*$/.test(cleaned)) {
      setCardNumber(formatCardNumber(cleaned));
      if (errors.cardNumber) {
        setErrors({ ...errors, cardNumber: '' });
      }
    }
  };
  
  const handleExpiryMonthChange = (value: string) => {
    if (value.length <= 2 && /^\d*$/.test(value)) {
      const num = parseInt(value);
      if (value === '' || (num >= 1 && num <= 12)) {
        setExpiryMonth(value);
        if (errors.expiry) {
          setErrors({ ...errors, expiry: '' });
        }
      }
    }
  };
  
  const handleExpiryYearChange = (value: string) => {
    if (value.length <= 2 && /^\d*$/.test(value)) {
      setExpiryYear(value);
      if (errors.expiry) {
        setErrors({ ...errors, expiry: '' });
      }
    }
  };
  
  const handleCvvChange = (value: string) => {
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value);
      if (errors.cvv) {
        setErrors({ ...errors, cvv: '' });
      }
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!cardName.trim()) {
      newErrors.cardName = 'الرجاء إدخال اسم حامل البطاقة';
    }
    
    const cleanedNumber = cardNumber.replace(/\s/g, '');
    if (cleanedNumber.length !== 16) {
      newErrors.cardNumber = 'رقم البطاقة يجب أن يكون 16 رقماً';
    }
    
    if (!expiryMonth || !expiryYear) {
      newErrors.expiry = 'الرجاء إدخال تاريخ الانتهاء';
    }
    
    if (cvv.length !== 3) {
      newErrors.cvv = 'CVV يجب أن يكون 3 أرقام';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        cardName,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
      });
    }
  };
  
  const cardType = cardNumber.startsWith('4') ? 'visa' : cardNumber.startsWith('5') ? 'mastercard' : 'mada';
  
  return (
    <form onSubmit={handleSubmit} className="w-full" dir="rtl">
      <div style={{ maxWidth: formDesign.container.maxWidth, ...{ margin: formDesign.container.margin } }}>
        <Card 
          className="mb-8"
          style={{
            background: branding?.gradients.primary,
            borderRadius: formDesign.cardDisplay.borderRadius,
            padding: formDesign.cardDisplay.padding,
            height: formDesign.cardDisplay.height,
            boxShadow: designSystem.elevation['2xl'],
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="absolute top-4 right-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-8 h-8 rounded bg-white/30 backdrop-blur-sm"></div>
            <div className="w-8 h-8 rounded bg-white/20 backdrop-blur-sm"></div>
          </div>
          
          <div className="h-full flex flex-col justify-between text-white">
            <div className="mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 inline-block">
                <p className="text-2xl font-mono tracking-wider font-bold">
                  {cardNumber || '•••• •••• •••• ••••'}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-70 mb-1">حامل البطاقة</p>
                <p className="text-lg font-bold uppercase">
                  {cardName || 'CARDHOLDER NAME'}
                </p>
              </div>
              
              <div>
                <p className="text-xs opacity-70 mb-1">صالحة حتى</p>
                <p className="text-lg font-bold font-mono">
                  {expiryMonth && expiryYear ? `${expiryMonth}/${expiryYear}` : 'MM/YY'}
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="space-y-5">
          <BrandedInput
            companyKey={companyKey}
            label="اسم حامل البطاقة"
            value={cardName}
            onChange={setCardName}
            placeholder="الاسم كما هو على البطاقة"
            required
            error={errors.cardName}
            icon={<User className="w-5 h-5" />}
            autoComplete="cc-name"
          />
          
          <BrandedInput
            companyKey={companyKey}
            label="رقم البطاقة"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            required
            error={errors.cardNumber}
            icon={<CreditCard className="w-5 h-5" />}
            inputMode="numeric"
            autoComplete="cc-number"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label 
                className="block text-sm font-semibold mb-2"
                style={{ 
                  color: branding?.colors.text,
                  fontFamily: branding?.fonts.arabic 
                }}
              >
                تاريخ الانتهاء <span style={{ color: designSystem.buttons.secondary.base }}>*</span>
              </label>
              
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={expiryMonth}
                  onChange={(e) => handleExpiryMonthChange(e.target.value)}
                  placeholder="MM"
                  maxLength={2}
                  inputMode="numeric"
                  autoComplete="cc-exp-month"
                  style={{
                    height: designSystem.inputs.base.height,
                    padding: designSystem.inputs.base.padding,
                    fontSize: designSystem.inputs.base.fontSize,
                    borderWidth: designSystem.inputs.base.borderWidth,
                    borderRadius: designSystem.inputs.base.borderRadius,
                    borderColor: errors.expiry ? designSystem.inputs.error.borderColor : branding?.colors.border,
                    borderStyle: 'solid',
                    outline: 'none',
                    fontFamily: branding?.fonts.arabic,
                    textAlign: 'center',
                  }}
                />
                
                <input
                  type="text"
                  value={expiryYear}
                  onChange={(e) => handleExpiryYearChange(e.target.value)}
                  placeholder="YY"
                  maxLength={2}
                  inputMode="numeric"
                  autoComplete="cc-exp-year"
                  style={{
                    height: designSystem.inputs.base.height,
                    padding: designSystem.inputs.base.padding,
                    fontSize: designSystem.inputs.base.fontSize,
                    borderWidth: designSystem.inputs.base.borderWidth,
                    borderRadius: designSystem.inputs.base.borderRadius,
                    borderColor: errors.expiry ? designSystem.inputs.error.borderColor : branding?.colors.border,
                    borderStyle: 'solid',
                    outline: 'none',
                    fontFamily: branding?.fonts.arabic,
                    textAlign: 'center',
                  }}
                />
              </div>
              
              {errors.expiry && (
                <p className="text-sm mt-2" style={{ color: designSystem.inputs.error.textColor }}>
                  {errors.expiry}
                </p>
              )}
            </div>
            
            <div>
              <label 
                className="block text-sm font-semibold mb-2"
                style={{ 
                  color: branding?.colors.text,
                  fontFamily: branding?.fonts.arabic 
                }}
              >
                CVV <span style={{ color: designSystem.buttons.secondary.base }}>*</span>
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => handleCvvChange(e.target.value)}
                  placeholder="123"
                  maxLength={3}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  style={{
                    height: designSystem.inputs.base.height,
                    padding: designSystem.inputs.base.padding,
                    paddingRight: '44px',
                    fontSize: designSystem.inputs.base.fontSize,
                    borderWidth: designSystem.inputs.base.borderWidth,
                    borderRadius: designSystem.inputs.base.borderRadius,
                    borderColor: errors.cvv ? designSystem.inputs.error.borderColor : branding?.colors.border,
                    borderStyle: 'solid',
                    outline: 'none',
                    fontFamily: branding?.fonts.arabic,
                    textAlign: 'center',
                    width: '100%',
                  }}
                />
                
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              
              {errors.cvv && (
                <p className="text-sm mt-2" style={{ color: designSystem.inputs.error.textColor }}>
                  {errors.cvv}
                </p>
              )}
            </div>
          </div>
          
          <div 
            className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg flex items-start gap-3"
            style={{ marginTop: designSystem.spacing['6'] }}
          >
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">معلومات مهمة</p>
              <p>جميع معلومات البطاقة مشفرة ومحمية بأعلى معايير الأمان العالمية (PCI DSS Level 1)</p>
            </div>
          </div>
          
          <BrandedButton
            companyKey={companyKey}
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            icon={<CreditCard className="w-5 h-5" />}
          >
            {amount ? `تأكيد الدفع - ${amount} ${currency}` : 'تأكيد الدفع'}
          </BrandedButton>
          
          <SecurityBadges variant="default" className="mt-6" />
          <CardLogos className="mt-4" />
        </div>
      </div>
    </form>
  );
};

export default BrandedCardForm;
