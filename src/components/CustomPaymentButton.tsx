import { ServiceVisualIdentity } from "@/lib/paymentVisualSystems";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CustomPaymentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  visual: ServiceVisualIdentity;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

const CustomPaymentButton = ({
  visual,
  children,
  variant = 'primary',
  size = 'lg',
  icon,
  iconPosition = 'left',
  loading = false,
  className,
  disabled,
  ...props
}: CustomPaymentButtonProps) => {
  const getButtonStyles = () => {
    const baseStyles = {
      height: visual.ui.buttonHeight,
      fontFamily: visual.fonts.primary,
      fontWeight: visual.fonts.headingWeight,
      borderRadius: visual.ui.borderRadius.md,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    const variantStyles = {
      primary: {
        background: visual.gradients.button,
        color: '#FFFFFF',
        border: 'none',
        boxShadow: visual.ui.shadows.md,
      },
      secondary: {
        background: visual.colors.surface,
        color: visual.colors.primary,
        border: `2px solid ${visual.colors.primary}`,
        boxShadow: visual.ui.shadows.sm,
      },
      outline: {
        background: 'transparent',
        color: visual.colors.primary,
        border: `2px solid ${visual.colors.primary}`,
        boxShadow: 'none',
      },
    };

    const sizeStyles = {
      sm: { fontSize: '14px', padding: '0 20px' },
      md: { fontSize: '15px', padding: '0 28px' },
      lg: { fontSize: '16px', padding: '0 36px' },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
    };
  };

  const getHoverStyles = () => {
    if (variant === 'primary') {
      return {
        transform: 'translateY(-2px)',
        boxShadow: visual.ui.shadows.lg,
        filter: 'brightness(1.05)',
      };
    }
    return {
      background: visual.colors.primary,
      color: '#FFFFFF',
    };
  };

  return (
    <button
      style={getButtonStyles()}
      className={cn(
        "relative font-bold inline-flex items-center justify-center gap-2 cursor-pointer overflow-hidden group",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        className
      )}
      disabled={disabled || loading}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, getHoverStyles());
        }
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, getButtonStyles());
      }}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <div
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
            style={{ borderTopColor: 'transparent' }}
          />
        </div>
      )}

      {/* Button Content */}
      <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
        {icon && iconPosition === 'left' && (
          <span className="inline-flex">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="inline-flex">{icon}</span>
        )}
      </span>

      {/* Shine Effect */}
      {!disabled && !loading && variant === 'primary' && (
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }}
        />
      )}
    </button>
  );
};

export default CustomPaymentButton;
