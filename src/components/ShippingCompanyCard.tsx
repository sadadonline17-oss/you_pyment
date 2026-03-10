import React from 'react';
import { getShippingCompanyDesign } from '@/lib/shippingCompanyDesigns';
import { getServiceBranding } from '@/lib/serviceLogos';
import { Card } from '@/components/ui/card';
import { Package, Truck, MapPin } from 'lucide-react';

interface ShippingCompanyCardProps {
  companyKey: string;
  trackingNumber?: string;
  amount?: string;
  status?: 'pending' | 'processing' | 'completed';
  children?: React.ReactNode;
}

const ShippingCompanyCard: React.FC<ShippingCompanyCardProps> = ({
  companyKey,
  trackingNumber,
  amount,
  status = 'pending',
  children,
}) => {
  const design = getShippingCompanyDesign(companyKey);
  const branding = getServiceBranding(companyKey);

  const statusText = {
    pending: 'قيد الانتظار',
    processing: 'قيد المعالجة',
    completed: 'مكتمل',
  };

  const statusIcon = {
    pending: Package,
    processing: Truck,
    completed: MapPin,
  };

  const StatusIcon = statusIcon[status];

  return (
    <Card
      className="overflow-hidden"
      style={{
        borderTop: `5px solid ${design.colors.primary}`,
        borderRadius: design.borderRadius.lg,
        boxShadow: design.shadows.lg,
        fontFamily: design.fonts.primaryAr,
      }}
    >
      {/* Header with Company Branding */}
      <div
        className="p-4 sm:p-6"
        style={{
          background: `linear-gradient(135deg, ${design.colors.background}, ${design.colors.surface})`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          {/* Company Logo */}
          {branding.logo && (
            <div
              className="bg-white p-2 rounded-lg"
              style={{
                borderRadius: design.borderRadius.sm,
                boxShadow: design.shadows.sm,
              }}
            >
              <img
                src={branding.logo}
                alt={design.nameAr}
                className="h-8 sm:h-10 w-auto object-contain"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
          )}

          {/* Status Badge */}
          {status && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-sm font-semibold"
              style={{
                background: design.gradients.primary,
                borderRadius: design.borderRadius.sm,
              }}
            >
              <StatusIcon className="w-4 h-4" />
              <span>{statusText[status]}</span>
            </div>
          )}
        </div>

        {/* Tracking & Amount Info */}
        {(trackingNumber || amount) && (
          <div className="grid grid-cols-2 gap-4">
            {trackingNumber && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">رقم التتبع</p>
                <p 
                  className="font-mono font-bold text-sm"
                  style={{ color: design.colors.primary }}
                >
                  {trackingNumber}
                </p>
              </div>
            )}
            {amount && (
              <div className="text-left">
                <p className="text-xs text-muted-foreground mb-1">المبلغ</p>
                <p 
                  className="font-bold text-lg"
                  style={{ color: design.colors.primary }}
                >
                  {amount}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {children && (
        <div className="p-4 sm:p-6 border-t" style={{ borderColor: design.colors.border }}>
          {children}
        </div>
      )}

      {/* Footer Accent */}
      <div
        className="h-2"
        style={{
          background: design.gradients.primary,
        }}
      />
    </Card>
  );
};

export default ShippingCompanyCard;
