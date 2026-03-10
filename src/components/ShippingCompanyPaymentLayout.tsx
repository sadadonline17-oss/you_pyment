import React from 'react';
import { getShippingCompanyDesign } from '@/lib/shippingCompanyDesigns';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Shield, CreditCard, Package } from 'lucide-react';
import ShippingCompanyHeader from './ShippingCompanyHeader';

interface ShippingCompanyPaymentLayoutProps {
  companyKey: string;
  children: React.ReactNode;
  serviceName?: string;
}

export const ShippingCompanyPaymentLayout: React.FC<ShippingCompanyPaymentLayoutProps> = ({
  companyKey,
  children,
  serviceName,
}) => {
  const design = getShippingCompanyDesign(companyKey);

  return (
    <>
      <ShippingCompanyHeader 
        companyKey={companyKey} 
        serviceName={serviceName}
        showSecurityBadge={true}
      />
      
      <div
        className="min-h-screen py-6 sm:py-8"
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${design.colors.background}, ${design.colors.surface})`,
          fontFamily: design.fonts.primaryAr,
        }}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-2xl mx-auto">
            {design.headerImage && (
              <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={design.headerImage}
                  alt={design.nameAr}
                  className="w-full h-32 sm:h-48 object-cover"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            )}

            <div className="text-center mb-6">
              <Badge
                className="text-sm px-5 py-2.5 font-bold"
                style={{
                  background: design.gradients.primary,
                  borderRadius: design.borderRadius.md,
                  boxShadow: design.shadows.sm,
                  color: design.colors.textOnPrimary || '#FFFFFF',
                }}
              >
                <Lock className="w-4 h-4 ml-2" />
                <span>معاملة آمنة ومشفّرة SSL 256-bit</span>
              </Badge>
            </div>

            <Card
              className="p-6 sm:p-8 shadow-elevated border-0"
              style={{
                borderTop: `4px solid ${design.colors.primary}`,
                borderRadius: design.borderRadius.lg,
                boxShadow: design.shadows.lg,
                background: design.colors.surface,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center"
                  style={{
                    background: design.gradients.primary,
                    borderRadius: design.borderRadius.md,
                    boxShadow: design.shadows.sm,
                  }}
                >
                  <CreditCard className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: design.colors.textOnPrimary || '#FFFFFF' }} />
                </div>
                <div>
                  <h1
                    className="text-xl sm:text-2xl font-bold"
                    style={{ 
                      color: design.colors.text,
                      fontFamily: design.fonts.primaryAr,
                      fontWeight: design.fonts.weight?.bold || 700,
                    }}
                  >
                    بيانات البطاقة
                  </h1>
                  <p 
                    className="text-sm"
                    style={{ color: design.colors.text, opacity: 0.7 }}
                  >
                    {serviceName || design.nameAr} - دفع آمن
                  </p>
                </div>
              </div>

              <div
                className="rounded-lg p-4 mb-6 flex items-start gap-3"
                style={{
                  background: `${design.colors.primary}08`,
                  border: `1.5px solid ${design.colors.primary}30`,
                  borderRadius: design.borderRadius.md,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: design.gradients.primary }}
                >
                  <Shield className="w-5 h-5" style={{ color: design.colors.textOnPrimary || '#FFFFFF' }} />
                </div>
                <div className="flex-1">
                  <p 
                    className="text-sm font-bold mb-1" 
                    style={{ 
                      color: design.colors.text,
                      fontFamily: design.fonts.primaryAr,
                    }}
                  >
                    حماية كاملة لبياناتك
                  </p>
                  <p 
                    className="text-xs leading-relaxed" 
                    style={{ color: design.colors.text, opacity: 0.75 }}
                  >
                    بياناتك محمية بتقنية التشفير SSL/TLS المتقدمة. لا نقوم بحفظ بيانات البطاقة الكاملة
                  </p>
                </div>
              </div>

              <div style={{ fontFamily: design.fonts.primaryAr }}>
                {children}
              </div>
            </Card>

            <div 
              className="flex items-center justify-center gap-6 mt-8 py-4 rounded-lg"
              style={{
                background: `${design.colors.primary}05`,
                border: `1px solid ${design.colors.border}`,
                borderRadius: design.borderRadius.md,
              }}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: design.colors.primary }} />
                <span className="text-xs font-semibold" style={{ color: design.colors.text }}>SSL</span>
              </div>
              <div className="w-px h-5" style={{ background: design.colors.border }} />
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" style={{ color: design.colors.primary }} />
                <span className="text-xs font-semibold" style={{ color: design.colors.text }}>PCI DSS</span>
              </div>
              <div className="w-px h-5" style={{ background: design.colors.border }} />
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" style={{ color: design.colors.primary }} />
                <span className="text-xs font-semibold" style={{ color: design.colors.text }}>Verified</span>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-xs" style={{ color: design.colors.text, opacity: 0.6 }}>
                © 2025 {design.nameAr} | {design.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingCompanyPaymentLayout;
  );
};

export default ShippingCompanyPaymentLayout;
