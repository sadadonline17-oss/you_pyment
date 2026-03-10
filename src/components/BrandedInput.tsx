import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCompanyDesignSystem } from '@/lib/designSystemComplete';
import { getBrandingByCompany } from '@/lib/brandingSystem';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface BrandedInputProps {
  companyKey: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'tel' | 'email';
  placeholder?: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  maxLength?: number;
  pattern?: string;
  autoComplete?: string;
  dir?: 'rtl' | 'ltr';
  inputMode?: 'none' | 'text' | 'tel' | 'numeric' | 'decimal' | 'email' | 'url' | 'search';
}

export const BrandedInput: React.FC<BrandedInputProps> = ({
  companyKey,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  error,
  success = false,
  icon,
  maxLength,
  pattern,
  autoComplete,
  dir = 'rtl',
  inputMode,
}) => {
  const designSystem = getCompanyDesignSystem(companyKey);
  const branding = getBrandingByCompany(companyKey);
  
  const [isFocused, setIsFocused] = React.useState(false);
  
  const inputStyles: React.CSSProperties = {
    height: designSystem.inputs.base.height,
    padding: designSystem.inputs.base.padding,
    fontSize: designSystem.inputs.base.fontSize,
    borderWidth: designSystem.inputs.base.borderWidth,
    borderRadius: designSystem.inputs.base.borderRadius,
    borderColor: error 
      ? designSystem.inputs.error.borderColor 
      : isFocused 
        ? designSystem.inputs.focus.borderColor 
        : branding?.colors.border || '#E5E5E5',
    borderStyle: 'solid',
    outline: 'none',
    fontFamily: branding?.fonts.arabic,
    color: branding?.colors.text,
    backgroundColor: '#FFFFFF',
    transition: `all ${designSystem.transitions.base}`,
    width: '100%',
    paddingRight: icon ? '44px' : designSystem.inputs.base.padding,
  };
  
  const focusStyles: React.CSSProperties = isFocused ? {
    boxShadow: `0 0 0 ${designSystem.inputs.focus.ringWidth} rgba(${hexToRgb(designSystem.inputs.focus.ringColor)}, ${designSystem.inputs.focus.ringOpacity})`,
  } : {};
  
  const labelStyles: React.CSSProperties = {
    fontSize: designSystem.typography.sm.size,
    fontWeight: '600',
    color: branding?.colors.text,
    marginBottom: '8px',
    display: 'block',
    fontFamily: branding?.fonts.arabic,
  };
  
  return (
    <div className="w-full" dir={dir}>
      <Label style={labelStyles}>
        {label}
        {required && <span style={{ color: designSystem.buttons.secondary.base }}> *</span>}
      </Label>
      
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          pattern={pattern}
          autoComplete={autoComplete}
          inputMode={inputMode}
          style={{ ...inputStyles, ...focusStyles }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {icon && (
          <div 
            className="absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none"
            style={{ color: isFocused ? branding?.colors.primary : branding?.colors.textLight }}
          >
            {icon}
          </div>
        )}
        
        {success && !error && (
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </div>
        )}
        
        {error && (
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <AlertCircle className="w-5 h-5" style={{ color: designSystem.inputs.error.borderColor }} />
          </div>
        )}
      </div>
      
      {error && (
        <p 
          className="text-sm mt-2"
          style={{ 
            color: designSystem.inputs.error.textColor,
            fontFamily: branding?.fonts.arabic 
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}

export const AramexInput: React.FC<Omit<BrandedInputProps, 'companyKey'>> = (props) => (
  <BrandedInput companyKey="aramex" {...props} />
);

export const DHLInput: React.FC<Omit<BrandedInputProps, 'companyKey'>> = (props) => (
  <BrandedInput companyKey="dhl" {...props} />
);

export const FedExInput: React.FC<Omit<BrandedInputProps, 'companyKey'>> = (props) => (
  <BrandedInput companyKey="fedex" {...props} />
);

export const UPSInput: React.FC<Omit<BrandedInputProps, 'companyKey'>> = (props) => (
  <BrandedInput companyKey="ups" {...props} />
);

export const SMSAInput: React.FC<Omit<BrandedInputProps, 'companyKey'>> = (props) => (
  <BrandedInput companyKey="smsa" {...props} />
);

export const NaqelInput: React.FC<Omit<BrandedInputProps, 'companyKey'>> = (props) => (
  <BrandedInput companyKey="naqel" {...props} />
);

export default BrandedInput;
