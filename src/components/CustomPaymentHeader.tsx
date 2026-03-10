import { ServiceVisualIdentity } from "@/lib/paymentVisualSystems";
import { ArrowLeft, Shield, Lock } from "lucide-react";

interface CustomPaymentHeaderProps {
  visual: ServiceVisualIdentity;
  serviceName: string;
  amount?: string;
  logo?: string;
  onBack?: () => void;
  showSecurityBadge?: boolean;
}

const CustomPaymentHeader = ({
  visual,
  serviceName,
  amount,
  logo,
  onBack,
  showSecurityBadge = true,
}: CustomPaymentHeaderProps) => {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: visual.header.height,
        background: visual.header.background,
        fontFamily: visual.fonts.primary,
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, ${visual.colors.accent} 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, ${visual.colors.accent} 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 flex items-center justify-between">
        {/* Left: Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            style={{
              fontWeight: visual.fonts.bodyWeight,
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">رجوع</span>
          </button>
        )}

        {/* Center: Logo & Service Name */}
        <div className="flex-1 flex items-center justify-center gap-4">
          {logo && visual.header.showLogo && (
            <img
              src={logo}
              alt={serviceName}
              className="h-12 w-12 object-contain bg-white/10 backdrop-blur-sm rounded-lg p-2"
              style={{
                borderRadius: visual.ui.borderRadius.md,
              }}
            />
          )}
          <div className="text-center">
            <h1
              className="text-white text-xl sm:text-2xl font-bold leading-tight"
              style={{
                fontWeight: visual.fonts.headingWeight,
                fontFamily: visual.fonts.primary,
              }}
            >
              {serviceName}
            </h1>
            {amount && (
              <p className="text-white/80 text-sm sm:text-base mt-1">
                {amount}
              </p>
            )}
          </div>
        </div>

        {/* Right: Security Badge */}
        {showSecurityBadge && (
          <div className="hidden sm:flex items-center gap-2 text-white/90">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm"
              style={{
                borderRadius: visual.ui.borderRadius.xl,
              }}
            >
              <Shield className="w-4 h-4" />
              <span className="text-xs font-medium">آمن</span>
              <Lock className="w-3 h-3" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Gradient Border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${visual.colors.accent}, ${visual.colors.secondary}, ${visual.colors.accent})`,
        }}
      />
    </div>
  );
};

export default CustomPaymentHeader;
