import React, { useState } from 'react';
import { getEntityIdentity } from '@/lib/dynamicIdentity';
import { useDynamicIdentity } from './DynamicIdentityProvider';

interface DynamicIdentityButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  entityKey?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const DynamicIdentityButton: React.FC<DynamicIdentityButtonProps> = ({
  entityKey,
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { currentEntity, identity } = useDynamicIdentity();
  
  const currentIdentity = identity || (entityKey ? getEntityIdentity(entityKey) : null);

  if (!currentIdentity) {
    return (
      <button className={`px-6 py-3 rounded-lg font-semibold ${className}`} {...props}>
        {children}
      </button>
    );
  }

  const getBackgroundColor = () => {
    if (variant === 'primary') return currentIdentity.colors.primary;
    if (variant === 'secondary') return currentIdentity.colors.secondary;
    return 'transparent';
  };

  const getHoverTransform = () => {
    switch (currentIdentity.buttons.hover) {
      case 'darken':
        return 'brightness(0.9)';
      case 'highlight':
        return 'brightness(1.1)';
      case 'scale':
        return 'scale(1.05)';
      default:
        return 'brightness(0.9)';
    }
  };

  const buttonStyles: React.CSSProperties = {
    backgroundColor: variant === 'outline' ? 'transparent' : getBackgroundColor(),
    color: variant === 'outline' ? currentIdentity.colors.primary : '#ffffff',
    border: variant === 'outline' ? `2px solid ${currentIdentity.colors.primary}` : 'none',
    borderRadius: currentIdentity.buttons.style === 'rounded' ? '12px' : 
                   currentIdentity.buttons.style === 'flat' ? '4px' : '0px',
    padding: '12px 24px',
    fontFamily: currentIdentity.fonts[0],
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ...(isHovered && {
      filter: currentIdentity.buttons.hover === 'scale' ? 'none' : getHoverTransform(),
      transform: currentIdentity.buttons.hover === 'scale' ? 'scale(1.05)' : 'none',
    }),
  };

  return (
    <button
      className={className}
      style={buttonStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export default DynamicIdentityButton;
