import { ServiceVisualIdentity } from "@/lib/paymentVisualSystems";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CustomPaymentInputProps extends InputHTMLAttributes<HTMLInputElement> {
  visual: ServiceVisualIdentity;
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const CustomPaymentInput = forwardRef<HTMLInputElement, CustomPaymentInputProps>(
  ({ visual, label, error, icon, className, ...props }, ref) => {
    const getInputStyles = () => {
      const baseStyles = {
        height: visual.ui.inputHeight,
        fontFamily: visual.fonts.secondary,
        fontSize: '15px',
        fontWeight: visual.fonts.bodyWeight,
        color: visual.colors.text,
        backgroundColor: visual.colors.surface,
        border: `2px solid ${error ? visual.colors.error : visual.colors.border}`,
        transition: 'all 0.2s ease',
      };

      const borderRadiusStyles = {
        rounded: visual.ui.borderRadius.md,
        sharp: visual.ui.borderRadius.sm,
        pill: visual.ui.borderRadius.xl,
      };

      return {
        ...baseStyles,
        borderRadius: borderRadiusStyles[visual.form.inputStyle] || borderRadiusStyles.rounded,
      };
    };

    const focusRingStyle = `focus:outline-none focus:ring-2 focus:ring-opacity-20`;

    return (
      <div className="space-y-2">
        {label && (
          <label
            className="block font-medium text-sm"
            style={{
              color: visual.colors.text,
              fontFamily: visual.fonts.secondary,
              fontWeight: visual.fonts.headingWeight,
            }}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{ color: visual.colors.textSecondary }}
            >
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            style={getInputStyles()}
            className={cn(
              focusRingStyle,
              "w-full px-4 placeholder:text-gray-400",
              icon && "pr-12",
              className
            )}
            onFocus={(e) => {
              e.target.style.borderColor = visual.colors.primary;
              e.target.style.boxShadow = `0 0 0 3px ${visual.colors.primary}20`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = error ? visual.colors.error : visual.colors.border;
              e.target.style.boxShadow = 'none';
            }}
            {...props}
          />
        </div>
        
        {error && (
          <p
            className="text-sm font-medium"
            style={{ color: visual.colors.error }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

CustomPaymentInput.displayName = "CustomPaymentInput";

export default CustomPaymentInput;
