import React from 'react';
import { Card } from '@/components/ui/card';
import { getEntityIdentity } from '@/lib/dynamicIdentity';
import { useDynamicIdentity } from './DynamicIdentityProvider';
import { Shield, CheckCircle, Lock } from 'lucide-react';

interface PaymentConfirmationCardProps {
  entityKey?: string;
  amount: string;
  serviceName: string;
  children?: React.ReactNode;
}

export const PaymentConfirmationCard: React.FC<PaymentConfirmationCardProps> = ({
  entityKey,
  amount,
  serviceName,
  children,
}) => {
  const { identity } = useDynamicIdentity();
  const currentIdentity = identity || (entityKey ? getEntityIdentity(entityKey) : null);

  return (
    <Card 
      className="p-6 sm:p-8 text-center"
      style={{
        backgroundColor: currentIdentity?.colors.background || '#FFFFFF',
        borderTopColor: currentIdentity?.colors.primary || '#4F46E5',
        borderTopWidth: '4px',
        borderRadius: currentIdentity?.buttons.style === 'rounded' ? '16px' : '8px',
      }}
    >
      <div 
        className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: `${currentIdentity?.colors.primary || '#4F46E5'}20`,
        }}
      >
        <CheckCircle 
          className="w-12 h-12" 
          style={{ color: currentIdentity?.colors.primary || '#4F46E5' }}
        />
      </div>

      <h2 
        className="text-2xl sm:text-3xl font-bold mb-4"
        style={{ 
          color: currentIdentity?.colors.primary || '#1A1A1A',
          fontFamily: currentIdentity?.fonts[0] || 'Cairo, sans-serif',
        }}
      >
        تم تأكيد الدفع بنجاح
      </h2>

      <div 
        className="mb-6 p-4 rounded-lg"
        style={{
          backgroundColor: `${currentIdentity?.colors.primary || '#4F46E5'}10`,
        }}
      >
        <p className="text-sm text-gray-600 mb-2">المبلغ المدفوع</p>
        <p 
          className="text-3xl font-bold"
          style={{ color: currentIdentity?.colors.primary || '#4F46E5' }}
        >
          {amount}
        </p>
        <p className="text-sm text-gray-600 mt-2">{serviceName}</p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Shield className="w-4 h-4" />
          <span>معاملة آمنة ومشفرة</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Lock className="w-4 h-4" />
          <span>محمية بأحدث تقنيات الأمان</span>
        </div>
      </div>

      {children}
    </Card>
  );
};

export default PaymentConfirmationCard;
