import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  detectEntityFromURL, 
  applyDynamicIdentity, 
  getEntityIdentity,
  getEntityPaymentShareImage 
} from '@/lib/dynamicIdentity';
import { DynamicIdentityProvider } from '@/components/DynamicIdentityProvider';
import BrandedTopBar from '@/components/BrandedTopBar';
import { useLink } from '@/hooks/useSupabase';

interface AutoDynamicIdentityProps {
  children: React.ReactNode;
  entityKey?: string;
  showTopBar?: boolean;
  showCarousel?: boolean;
  serviceKey?: string;
  serviceName?: string;
}

export const AutoDynamicIdentity: React.FC<AutoDynamicIdentityProps> = ({
  children,
  entityKey,
  showTopBar = true,
  showCarousel = true,
  serviceKey,
  serviceName,
}) => {
  const { id } = useParams();
  const { data: linkData } = useLink(id);
  
  const detectedEntity = entityKey || detectEntityFromURL();
  const payloadEntityType = linkData?.payload?.entity_type || linkData?.payload?.type;
  
  const finalEntity = detectedEntity || payloadEntityType;
  
  const finalServiceKey = serviceKey || linkData?.payload?.service_key || 'aramex';
  const finalServiceName = serviceName || linkData?.payload?.service_name || finalServiceKey;
  
  useEffect(() => {
    if (finalEntity) {
      applyDynamicIdentity(finalEntity);
    }
  }, [finalEntity]);

  const identity = finalEntity ? getEntityIdentity(finalEntity) : null;
  const shareImage = finalEntity ? getEntityPaymentShareImage(finalEntity) : null;
  const shareDescription = identity?.payment_share_description || 'منصة الدفع الإلكتروني الآمنة';

  return (
    <DynamicIdentityProvider entityKey={finalEntity || undefined}>
      <Helmet>
        {shareImage && (
          <>
            <meta property="og:image" content={shareImage} />
            <meta name="twitter:image" content={shareImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </>
        )}
        {shareDescription && (
          <>
            <meta property="og:description" content={shareDescription} />
            <meta name="twitter:description" content={shareDescription} />
            <meta name="description" content={shareDescription} />
          </>
        )}
      </Helmet>

      {showTopBar && (
        <BrandedTopBar 
          serviceKey={finalServiceKey}
          serviceName={finalServiceName}
          showBackButton={true}
          showCarousel={showCarousel}
        />
      )}

      <div 
        className="min-h-screen"
        style={{
          backgroundColor: identity?.colors.background || '#FFFFFF',
          fontFamily: identity?.fonts[0] || 'Cairo, Tajawal, sans-serif',
        }}
      >
        {children}
      </div>
    </DynamicIdentityProvider>
  );
};

export default AutoDynamicIdentity;
