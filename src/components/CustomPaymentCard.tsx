import { ServiceVisualIdentity } from "@/lib/paymentVisualSystems";
import { ReactNode } from "react";

interface CustomPaymentCardProps {
  visual: ServiceVisualIdentity;
  children: ReactNode;
  className?: string;
}

const CustomPaymentCard = ({ visual, children, className = "" }: CustomPaymentCardProps) => {
  const getCardStyles = () => {
    const baseStyles = {
      fontFamily: visual.fonts.secondary,
      borderRadius: visual.ui.borderRadius.lg,
    };

    switch (visual.form.cardStyle) {
      case 'elevated':
        return {
          ...baseStyles,
          backgroundColor: visual.colors.surface,
          boxShadow: visual.ui.shadows.lg,
          border: `1px solid ${visual.colors.border}`,
        };
      case 'glass':
        return {
          ...baseStyles,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          boxShadow: visual.ui.shadows.md,
          border: `1px solid ${visual.colors.border}`,
        };
      case 'bordered':
        return {
          ...baseStyles,
          backgroundColor: visual.colors.surface,
          boxShadow: visual.ui.shadows.sm,
          border: `2px solid ${visual.colors.primary}`,
        };
      case 'flat':
        return {
          ...baseStyles,
          backgroundColor: visual.colors.surface,
          border: `1px solid ${visual.colors.border}`,
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={getCardStyles()}
    >
      {/* Top Accent Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{
          background: visual.gradients.primary,
        }}
      />

      {/* Content */}
      <div className="p-6 sm:p-8 pt-8">
        {children}
      </div>

      {/* Corner Decoration */}
      <div
        className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full opacity-5"
        style={{
          background: visual.gradients.secondary,
        }}
      />
      <div
        className="absolute -top-16 -left-16 w-32 h-32 rounded-full opacity-5"
        style={{
          background: visual.gradients.primary,
        }}
      />
    </div>
  );
};

export default CustomPaymentCard;
