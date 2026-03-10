import React, { useEffect } from 'react';
import { applyDynamicIdentity, getEntityIdentity } from '@/lib/dynamicIdentity';
import { getServiceBranding } from '@/lib/serviceLogos';
import PaymentMetaTags from '@/components/PaymentMetaTags';
import BrandedTopBar from '@/components/BrandedTopBar';
import BrandedCarousel from '@/components/BrandedCarousel';

interface PaymentPageWrapperProps {
  children: React.ReactNode;
  serviceKey?: string;
  serviceName?: string;
  showTopBar?: boolean;
  showCarousel?: boolean;
  showBackButton?: boolean;
  backPath?: string;
  title?: string;
  description?: string;
  amount?: string;
}

export const PaymentPageWrapper: React.FC<PaymentPageWrapperProps> = ({
  children,
  serviceKey = 'aramex',
  serviceName,
  showTopBar = true,
  showCarousel = true,
  showBackButton = true,
  backPath,
  title,
  description,
  amount,
}) => {
  useEffect(() => {
    if (serviceKey) {
      applyDynamicIdentity(serviceKey);
    }
    
    return () => {
      const root = document.documentElement;
      root.removeAttribute('data-entity');
    };
  }, [serviceKey]);

  const identity = getEntityIdentity(serviceKey);
  const branding = getServiceBranding(serviceKey);

  return (
    <>
      <PaymentMetaTags 
        serviceKey={serviceKey}
        serviceName={serviceName || serviceKey}
        title={title}
        customDescription={description}
        amount={amount}
      />

      {showTopBar && (
        <BrandedTopBar 
          serviceKey={serviceKey}
          serviceName={serviceName || serviceKey}
          showBackButton={showBackButton}
          backPath={backPath}
          showCarousel={false}
        />
      )}
      
      {showCarousel && (
        <BrandedCarousel serviceKey={serviceKey} className="mb-0" />
      )}

      <div 
        className="min-h-screen"
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${branding.colors.primary}08, ${branding.colors.secondary}08)`,
          fontFamily: identity?.fonts[0] || 'Cairo, Tajawal, sans-serif',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PaymentPageWrapper;
