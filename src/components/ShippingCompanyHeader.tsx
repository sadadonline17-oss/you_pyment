import React from 'react';
import { getShippingCompanyDesign } from '@/lib/shippingCompanyDesigns';
import { ShieldCheck, Lock } from 'lucide-react';

interface ShippingCompanyHeaderProps {
  companyKey: string;
  serviceName?: string;
  showSecurityBadge?: boolean;
  className?: string;
}

export const ShippingCompanyHeader: React.FC<ShippingCompanyHeaderProps> = ({
  companyKey,
  serviceName,
  showSecurityBadge = true,
  className = '',
}) => {
  const design = getShippingCompanyDesign(companyKey);

  return (
    <div
      className={`sticky top-0 z-50 w-full shadow-2xl ${className}`}
      style={{
        background: design.gradients.header || design.gradients.primary,
        borderBottom: `4px solid ${design.colors.primary}`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.15)`,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-xl">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <div className="flex items-center gap-4 sm:gap-6">
            {design.logo && (
              <div
                className="bg-white p-3 sm:p-4 rounded-xl"
                style={{
                  borderRadius: design.borderRadius.md,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                <img
                  src={design.logo}
                  alt={design.nameAr}
                  className="h-10 sm:h-14 w-auto object-contain"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            )}
            <div className="hidden sm:block w-px h-14 bg-white/20" />
            <div>
              <h1
                className="text-xl sm:text-3xl font-black"
                style={{
                  color: design.colors.textOnPrimary || '#FFFFFF',
                  fontFamily: design.fonts.primaryAr,
                  fontWeight: design.fonts.weight?.bold || 900,
                  letterSpacing: '-0.02em'
                }}
              >
                {serviceName || design.nameAr}
              </h1>
              <p
                className="text-sm sm:text-base opacity-95 font-semibold mt-1"
                style={{
                  color: design.colors.textOnPrimary || '#FFFFFF',
                  fontFamily: design.fonts.primary,
                }}
              >
                {design.name} - Secure Payment Gateway
              </p>
            </div>
          </div>

          {showSecurityBadge && (
            <div
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/25 backdrop-blur-md border border-white/30 shadow-lg"
              style={{
                borderRadius: design.borderRadius.xl || '9999px',
              }}
            >
              <ShieldCheck
                className="w-4 h-4 sm:w-5 sm:h-5"
                style={{ color: design.colors.textOnPrimary || '#FFFFFF' }}
              />
              <span
                className="text-xs sm:text-sm font-bold"
                style={{ color: design.colors.textOnPrimary || '#FFFFFF' }}
              >
                دفع آمن ومشفر
              </span>
              <Lock className="w-4 h-4" style={{ color: design.colors.textOnPrimary || '#FFFFFF' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingCompanyHeader;
