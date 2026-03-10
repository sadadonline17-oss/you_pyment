import React from 'react';
import { getShippingCompanyDesign } from '@/lib/shippingCompanyDesigns';
import { getServiceBranding } from '@/lib/serviceLogos';

interface ShippingCompanyBannerProps {
  companyKey: string;
  showLogo?: boolean;
  showDescription?: boolean;
  className?: string;
}

const ShippingCompanyBanner: React.FC<ShippingCompanyBannerProps> = ({
  companyKey,
  showLogo = true,
  showDescription = false,
  className = '',
}) => {
  const design = getShippingCompanyDesign(companyKey);
  const branding = getServiceBranding(companyKey);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: design.gradients.primary,
        borderRadius: design.borderRadius.lg,
        boxShadow: design.shadows.lg,
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${design.colors.secondary} 10px, ${design.colors.secondary} 20px)`,
        }}
      />

      {/* Content */}
      <div className="relative p-6 sm:p-8">
        {showLogo && branding.logo && (
          <div className="flex justify-center mb-4">
            <div
              className="bg-white p-3 rounded-lg"
              style={{
                borderRadius: design.borderRadius.md,
                boxShadow: design.shadows.md,
              }}
            >
              <img
                src={branding.logo}
                alt={design.nameAr}
                className="h-12 sm:h-16 w-auto object-contain"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
          </div>
        )}

        <div className="text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: design.fonts.primaryAr }}>
            {design.nameAr}
          </h2>
          <p className="text-lg sm:text-xl font-semibold opacity-90" style={{ fontFamily: design.fonts.primary }}>
            {design.name}
          </p>
          
          {showDescription && branding.description && (
            <p className="text-sm sm:text-base opacity-80 mt-3 max-w-2xl mx-auto" style={{ fontFamily: design.fonts.primaryAr }}>
              {branding.description.split('|')[0].trim()}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: design.colors.secondary,
        }}
      />
    </div>
  );
};

export default ShippingCompanyBanner;
