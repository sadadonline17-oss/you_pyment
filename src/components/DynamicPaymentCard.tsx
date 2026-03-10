import React from 'react';
import { getEntityIdentity } from '@/lib/dynamicIdentity';
import { useDynamicIdentity } from './DynamicIdentityProvider';
import { Card } from '@/components/ui/card';

interface DynamicPaymentCardProps {
  entityKey?: string;
  children: React.ReactNode;
  className?: string;
  showBorder?: boolean;
}

export const DynamicPaymentCard: React.FC<DynamicPaymentCardProps> = ({
  entityKey,
  children,
  className = '',
  showBorder = true,
}) => {
  const { identity } = useDynamicIdentity();
  const currentIdentity = identity || (entityKey ? getEntityIdentity(entityKey) : null);

  const cardStyles: React.CSSProperties = {
    backgroundColor: currentIdentity?.colors.background || '#FFFFFF',
    borderTopColor: showBorder ? currentIdentity?.colors.primary : 'transparent',
    borderTopWidth: showBorder ? '4px' : '0',
    borderRadius: currentIdentity?.buttons.style === 'rounded' ? '12px' : 
                   currentIdentity?.buttons.style === 'flat' ? '8px' : '4px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Card className={`p-4 sm:p-8 shadow-2xl ${className}`} style={cardStyles}>
      {children}
    </Card>
  );
};

export default DynamicPaymentCard;
