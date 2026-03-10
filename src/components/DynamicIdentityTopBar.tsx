import React from 'react';
import { getEntityIdentity } from '@/lib/dynamicIdentity';
import { useDynamicIdentity } from './DynamicIdentityProvider';

interface DynamicIdentityTopBarProps {
  entityKey?: string;
  title?: string;
  showLogo?: boolean;
  className?: string;
}

export const DynamicIdentityTopBar: React.FC<DynamicIdentityTopBarProps> = ({
  entityKey,
  title,
  showLogo = true,
  className = '',
}) => {
  const { identity } = useDynamicIdentity();
  const currentIdentity = identity || (entityKey ? getEntityIdentity(entityKey) : null);

  if (!currentIdentity) {
    return null;
  }

  const topBarStyles: React.CSSProperties = {
    backgroundColor: currentIdentity.colors.primary,
    color: '#ffffff',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: currentIdentity.fonts[0],
  };

  return (
    <div className={className} style={topBarStyles}>
      {showLogo && (
        <div className="flex items-center gap-3">
          <img
            src={`/assets/dynamic-identity/${currentIdentity.logo}`}
            alt="Logo"
            className="h-10 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {title && <span className="text-xl font-bold">{title}</span>}
        </div>
      )}
      {!showLogo && title && (
        <span className="text-xl font-bold">{title}</span>
      )}
    </div>
  );
};

export default DynamicIdentityTopBar;
