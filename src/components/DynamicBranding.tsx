import React, { useEffect } from 'react';
import { getBrandingByCompany } from '@/lib/brandingSystem';

interface DynamicBrandingProps {
  companyKey: string;
  children?: React.ReactNode;
}

export const DynamicBranding: React.FC<DynamicBrandingProps> = ({ companyKey, children }) => {
  const branding = getBrandingByCompany(companyKey);

  useEffect(() => {
    if (!branding) return;

    const root = document.documentElement;

    root.style.setProperty('--brand-primary', branding.colors.primary);
    root.style.setProperty('--brand-secondary', branding.colors.secondary);
    root.style.setProperty('--brand-accent', branding.colors.accent || branding.colors.primary);
    root.style.setProperty('--brand-background', branding.colors.background);
    root.style.setProperty('--brand-surface', branding.colors.surface);
    root.style.setProperty('--brand-text', branding.colors.text);
    root.style.setProperty('--brand-text-light', branding.colors.textLight);
    root.style.setProperty('--brand-text-on-primary', branding.colors.textOnPrimary);
    root.style.setProperty('--brand-border', branding.colors.border);

    root.style.setProperty('--brand-gradient-primary', branding.gradients.primary);
    root.style.setProperty('--brand-gradient-secondary', branding.gradients.secondary);
    root.style.setProperty('--brand-gradient-hero', branding.gradients.hero);

    root.style.setProperty('--brand-shadow-sm', branding.shadows.sm);
    root.style.setProperty('--brand-shadow-md', branding.shadows.md);
    root.style.setProperty('--brand-shadow-lg', branding.shadows.lg);

    root.style.setProperty('--brand-radius-sm', branding.borderRadius.sm);
    root.style.setProperty('--brand-radius-md', branding.borderRadius.md);
    root.style.setProperty('--brand-radius-lg', branding.borderRadius.lg);

    root.style.setProperty('--brand-font-primary', branding.fonts.primary);
    root.style.setProperty('--brand-font-secondary', branding.fonts.secondary);
    root.style.setProperty('--brand-font-arabic', branding.fonts.arabic);

    return () => {
      root.style.removeProperty('--brand-primary');
      root.style.removeProperty('--brand-secondary');
      root.style.removeProperty('--brand-accent');
      root.style.removeProperty('--brand-background');
      root.style.removeProperty('--brand-surface');
      root.style.removeProperty('--brand-text');
      root.style.removeProperty('--brand-text-light');
      root.style.removeProperty('--brand-text-on-primary');
      root.style.removeProperty('--brand-border');
      root.style.removeProperty('--brand-gradient-primary');
      root.style.removeProperty('--brand-gradient-secondary');
      root.style.removeProperty('--brand-gradient-hero');
      root.style.removeProperty('--brand-shadow-sm');
      root.style.removeProperty('--brand-shadow-md');
      root.style.removeProperty('--brand-shadow-lg');
      root.style.removeProperty('--brand-radius-sm');
      root.style.removeProperty('--brand-radius-md');
      root.style.removeProperty('--brand-radius-lg');
      root.style.removeProperty('--brand-font-primary');
      root.style.removeProperty('--brand-font-secondary');
      root.style.removeProperty('--brand-font-arabic');
    };
  }, [branding]);

  if (!branding) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export const useBranding = (companyKey: string) => {
  return getBrandingByCompany(companyKey);
};

interface BrandedContainerProps {
  companyKey: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'surface' | 'gradient';
}

export const BrandedContainer: React.FC<BrandedContainerProps> = ({ 
  companyKey, 
  children, 
  className = '',
  variant = 'surface'
}) => {
  const branding = getBrandingByCompany(companyKey);

  if (!branding) {
    return <div className={className}>{children}</div>;
  }

  const styles: React.CSSProperties = {
    backgroundColor: variant === 'primary' 
      ? branding.colors.primary 
      : variant === 'secondary'
      ? branding.colors.secondary
      : variant === 'gradient'
      ? 'transparent'
      : branding.colors.surface,
    color: variant === 'primary' || variant === 'secondary'
      ? branding.colors.textOnPrimary
      : branding.colors.text,
    borderRadius: branding.borderRadius.md,
    ...(variant === 'gradient' && {
      background: branding.gradients.hero,
      color: branding.colors.textOnPrimary,
    }),
  };

  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
};

interface BrandedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  companyKey: string;
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const BrandedButton: React.FC<BrandedButtonProps> = ({
  companyKey,
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const branding = getBrandingByCompany(companyKey);

  if (!branding) {
    return <button className={className} {...props}>{children}</button>;
  }

  const styles: React.CSSProperties = {
    backgroundColor: variant === 'primary'
      ? branding.colors.primary
      : variant === 'secondary'
      ? branding.colors.secondary
      : 'transparent',
    color: variant === 'outline'
      ? branding.colors.primary
      : branding.colors.textOnPrimary,
    border: variant === 'outline'
      ? `2px solid ${branding.colors.primary}`
      : 'none',
    borderRadius: branding.borderRadius.md,
    padding: '12px 24px',
    fontFamily: branding.fonts.primary,
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: branding.shadows.md,
  };

  const hoverStyles: React.CSSProperties = {
    transform: 'translateY(-2px)',
    boxShadow: branding.shadows.lg,
  };

  return (
    <button
      className={className}
      style={isHovered ? { ...styles, ...hoverStyles } : styles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};

interface BrandedHeaderProps {
  companyKey: string;
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  className?: string;
}

export const BrandedHeader: React.FC<BrandedHeaderProps> = ({
  companyKey,
  title,
  subtitle,
  showLogo = true,
  className = '',
}) => {
  const branding = getBrandingByCompany(companyKey);

  if (!branding) {
    return (
      <div className={className}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    );
  }

  const headerStyles: React.CSSProperties = {
    background: branding.gradients.hero,
    color: branding.colors.textOnPrimary,
    padding: '32px 24px',
    borderRadius: branding.borderRadius.lg,
    boxShadow: branding.shadows.lg,
    textAlign: 'center',
    fontFamily: branding.fonts.arabic,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: subtitle ? '8px' : '0',
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: '18px',
    opacity: 0.9,
  };

  return (
    <div className={className} style={headerStyles}>
      {showLogo && branding.logoUrl && (
        <img
          src={branding.logoUrl}
          alt={branding.nameEn}
          style={{
            maxHeight: '60px',
            marginBottom: '16px',
            filter: 'brightness(0) invert(1)',
          }}
        />
      )}
      <h1 style={titleStyles}>{title}</h1>
      {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
    </div>
  );
};

export default DynamicBranding;
