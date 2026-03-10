import React from 'react';
import { Button } from '@/components/ui/button';
import { getCompanyDesignSystem } from '@/lib/designSystemComplete';
import { getBrandingByCompany } from '@/lib/brandingSystem';
import { Loader2 } from 'lucide-react';

interface BrandedButtonProps {
  companyKey: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
}

export const BrandedButton: React.FC<BrandedButtonProps> = ({
  companyKey,
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  icon,
}) => {
  const designSystem = getCompanyDesignSystem(companyKey);
  const branding = getBrandingByCompany(companyKey);
  
  const variantStyles = designSystem.buttons[variant];
  const sizeStyles = designSystem.buttons.sizes[size];
  
  const baseStyles: React.CSSProperties = {
    backgroundColor: variantStyles.base,
    color: variant === 'primary' ? branding?.colors.textOnPrimary : '#FFFFFF',
    padding: sizeStyles.padding,
    fontSize: sizeStyles.fontSize,
    height: sizeStyles.height,
    borderRadius: branding?.borderRadius.md || '8px',
    fontWeight: '700',
    fontFamily: branding?.fonts.primary,
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: `all ${designSystem.transitions.base}`,
    boxShadow: branding?.shadows.md,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    textTransform: 'none',
    letterSpacing: '0.01em',
  };
  
  const hoverStyles: React.CSSProperties = {
    backgroundColor: variantStyles.hover,
    boxShadow: branding?.shadows.lg,
    transform: 'translateY(-1px)',
  };
  
  const activeStyles: React.CSSProperties = {
    backgroundColor: variantStyles.active,
    transform: 'translateY(0)',
  };
  
  const disabledStyles: React.CSSProperties = {
    backgroundColor: variantStyles.disabled,
    color: '#999999',
    cursor: 'not-allowed',
    boxShadow: 'none',
  };
  
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  
  const currentStyles = {
    ...baseStyles,
    ...(isHovered && !disabled && !loading ? hoverStyles : {}),
    ...(isActive && !disabled && !loading ? activeStyles : {}),
    ...(disabled || loading ? disabledStyles : {}),
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      style={currentStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-grow text-center">{children}</span>
    </button>
  );
};

export const AramexButton: React.FC<Omit<BrandedButtonProps, 'companyKey'>> = (props) => (
  <BrandedButton companyKey="aramex" {...props} />
);

export const DHLButton: React.FC<Omit<BrandedButtonProps, 'companyKey'>> = (props) => (
  <BrandedButton companyKey="dhl" {...props} />
);

export const FedExButton: React.FC<Omit<BrandedButtonProps, 'companyKey'>> = (props) => (
  <BrandedButton companyKey="fedex" {...props} />
);

export const UPSButton: React.FC<Omit<BrandedButtonProps, 'companyKey'>> = (props) => (
  <BrandedButton companyKey="ups" {...props} />
);

export const SMSAButton: React.FC<Omit<BrandedButtonProps, 'companyKey'>> = (props) => (
  <BrandedButton companyKey="smsa" {...props} />
);

export const NaqelButton: React.FC<Omit<BrandedButtonProps, 'companyKey'>> = (props) => (
  <BrandedButton companyKey="naqel" {...props} />
);

export default BrandedButton;
