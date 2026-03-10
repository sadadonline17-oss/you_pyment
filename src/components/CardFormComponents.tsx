import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getBrandingByCompany } from '@/lib/brandingSystem';
import { 
  CreditCard,
  Lock,
  Shield,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Building2
} from 'lucide-react';

interface CardFormStyles {
  containerClass: string;
  inputClass: string;
  labelClass: string;
  buttonClass: string;
  headerClass: string;
}

export const getCardFormStyles = (companyKey: string): CardFormStyles => {
  const branding = getBrandingByCompany(companyKey);
  
  const baseStyles: CardFormStyles = {
    containerClass: 'space-y-6',
    inputClass: 'h-12 text-lg border-2 focus:ring-2 transition-all',
    labelClass: 'text-sm font-semibold mb-2 block',
    buttonClass: 'w-full h-14 text-lg font-bold transition-all hover:shadow-xl hover:scale-[1.02]',
    headerClass: 'mb-6 pb-4 border-b-2'
  };

  return baseStyles;
};

interface SecureCardHeaderProps {
  companyKey: string;
  amount?: string;
  bankName?: string;
}

export const SecureCardHeader: React.FC<SecureCardHeaderProps> = ({ 
  companyKey, 
  amount, 
  bankName 
}) => {
  const branding = getBrandingByCompany(companyKey);
  
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: branding?.gradients.primary }}
        >
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">معلومات البطاقة</h2>
          <p className="text-sm text-gray-600">أدخل بيانات بطاقتك الائتمانية</p>
        </div>
        {amount && (
          <div 
            className="px-6 py-3 rounded-xl text-white font-bold text-xl"
            style={{ background: branding?.gradients.secondary }}
          >
            {amount}
          </div>
        )}
      </div>

      {bankName && (
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Building2 className="w-5 h-5 text-blue-700" />
          <div>
            <p className="text-xs text-blue-700">البنك المختار</p>
            <p className="font-bold text-blue-900">{bankName}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mt-6">
        {[
          { icon: Shield, text: 'SSL مشفر', color: 'green' },
          { icon: Lock, text: 'آمن 100%', color: 'blue' },
          { icon: CheckCircle2, text: 'معتمد', color: 'emerald' }
        ].map((item, idx) => (
          <div 
            key={idx}
            className={`p-3 rounded-lg bg-${item.color}-50 border border-${item.color}-200 text-center`}
          >
            <item.icon className={`w-5 h-5 mx-auto mb-1 text-${item.color}-700`} />
            <p className={`text-xs font-semibold text-${item.color}-900`}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface CardBrandIndicatorProps {
  cardNumber: string;
  isValid: boolean | null;
}

export const CardBrandIndicator: React.FC<CardBrandIndicatorProps> = ({ 
  cardNumber, 
  isValid 
}) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  const getCardBrand = () => {
    if (cleaned.startsWith('4')) return { name: 'Visa', color: '#1A1F71', logo: '💳' };
    if (cleaned.startsWith('5')) return { name: 'Mastercard', color: '#EB001B', logo: '💳' };
    if (cleaned.startsWith('3')) return { name: 'American Express', color: '#006FCF', logo: '💳' };
    return null;
  };
  
  const brand = getCardBrand();
  
  if (!brand || cleaned.length < 6) return null;
  
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded flex items-center justify-center text-white text-xl"
          style={{ backgroundColor: brand.color }}
        >
          {brand.logo}
        </div>
        <div>
          <p className="font-bold text-sm">{brand.name}</p>
          <p className="text-xs text-gray-600">
            {cleaned.slice(0, 4)} •••• •••• {cleaned.slice(-4)}
          </p>
        </div>
      </div>
      {isValid !== null && (
        <div className={`flex items-center gap-1 ${isValid ? 'text-green-700' : 'text-red-700'}`}>
          {isValid ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs font-semibold">صالحة</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5" />
              <span className="text-xs font-semibold">غير صالحة</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

interface StyledCardInputProps {
  companyKey: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  icon?: React.ReactNode;
  error?: string;
}

export const StyledCardInput: React.FC<StyledCardInputProps> = ({
  companyKey,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
  icon,
  error
}) => {
  const branding = getBrandingByCompany(companyKey);
  
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold flex items-center gap-2">
        {icon}
        {label}
      </Label>
      <div className="relative">
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`h-12 text-lg border-2 transition-all ${
            error ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'
          }`}
          style={{
            borderColor: error ? '#EF4444' : branding?.colors.border,
            ...(value && !error && {
              borderColor: branding?.colors.primary,
              boxShadow: branding?.shadows.md
            })
          }}
        />
        {error && (
          <div className="absolute -bottom-5 right-0 flex items-center gap-1 text-red-600 text-xs">
            <AlertCircle className="w-3 h-3" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface PaymentSecurityFooterProps {
  companyKey: string;
}

export const PaymentSecurityFooter: React.FC<PaymentSecurityFooterProps> = ({ 
  companyKey 
}) => {
  const branding = getBrandingByCompany(companyKey);
  
  return (
    <div className="mt-8 space-y-4">
      <div 
        className="p-6 rounded-xl text-white"
        style={{ background: branding?.gradients.primary }}
      >
        <div className="flex items-center gap-4 mb-3">
          <Shield className="w-8 h-8" />
          <h3 className="font-bold text-lg">دفع آمن ومضمون</h3>
        </div>
        <p className="text-sm opacity-90">
          جميع معلومات بطاقتك محمية بتشفير SSL 256-bit. نحن لا نخزن معلومات البطاقة على خوادمنا.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-700" />
            <p className="font-bold text-sm text-green-900">PCI DSS Compliant</p>
          </div>
          <p className="text-xs text-green-800">معايير أمان الدفع العالمية</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-blue-700" />
            <p className="font-bold text-sm text-blue-900">3D Secure</p>
          </div>
          <p className="text-xs text-blue-800">حماية إضافية للمعاملات</p>
        </Card>
      </div>

      <div className="text-center pt-4 border-t">
        <div className="flex items-center justify-center gap-4 text-gray-400">
          <span className="text-xs">Visa Verified</span>
          <span>•</span>
          <span className="text-xs">Mastercard SecureCode</span>
          <span>•</span>
          <span className="text-xs">Mada Secure</span>
        </div>
      </div>
    </div>
  );
};

interface AcceptedCardsDisplayProps {
  companyKey: string;
}

export const AcceptedCardsDisplay: React.FC<AcceptedCardsDisplayProps> = ({ 
  companyKey 
}) => {
  const branding = getBrandingByCompany(companyKey);
  
  const cards = [
    { name: 'Visa', color: '#1A1F71' },
    { name: 'Mastercard', color: '#EB001B' },
    { name: 'Mada', color: '#006C35' },
    { name: 'AMEX', color: '#006FCF' }
  ];
  
  return (
    <div className="mb-6">
      <p className="text-sm text-gray-600 mb-3 text-center">البطاقات المقبولة</p>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="px-4 py-2 rounded-lg border-2 font-bold text-sm"
            style={{ 
              borderColor: `${card.color}40`,
              color: card.color,
              backgroundColor: `${card.color}08`
            }}
          >
            {card.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default {
  getCardFormStyles,
  SecureCardHeader,
  CardBrandIndicator,
  StyledCardInput,
  PaymentSecurityFooter,
  AcceptedCardsDisplay
};
