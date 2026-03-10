import React, { useEffect, useState, createContext, useContext } from 'react';
import { 
  applyDynamicIdentity, 
  removeDynamicIdentity, 
  detectEntityFromURL,
  getEntityIdentity,
  type DynamicIdentityEntity 
} from '@/lib/dynamicIdentity';

interface DynamicIdentityContextType {
  currentEntity: string | null;
  setEntity: (entity: string | null) => void;
  identity: DynamicIdentityEntity | null;
}

const DynamicIdentityContext = createContext<DynamicIdentityContextType>({
  currentEntity: null,
  setEntity: () => {},
  identity: null,
});

export const useDynamicIdentity = () => useContext(DynamicIdentityContext);

interface DynamicIdentityProviderProps {
  children: React.ReactNode;
  entityKey?: string;
}

export const DynamicIdentityProvider: React.FC<DynamicIdentityProviderProps> = ({ 
  children, 
  entityKey 
}) => {
  const [currentEntity, setCurrentEntity] = useState<string | null>(null);
  const [identity, setIdentity] = useState<DynamicIdentityEntity | null>(null);

  useEffect(() => {
    const detectedEntity = entityKey || detectEntityFromURL();
    
    if (detectedEntity) {
      setCurrentEntity(detectedEntity);
      const entityIdentity = getEntityIdentity(detectedEntity);
      setIdentity(entityIdentity);
      
      if (entityIdentity?.auto_apply) {
        applyDynamicIdentity(detectedEntity);
      }
    }

    return () => {
      removeDynamicIdentity();
    };
  }, [entityKey]);

  const setEntity = (entity: string | null) => {
    if (entity) {
      const entityIdentity = getEntityIdentity(entity);
      setIdentity(entityIdentity);
      setCurrentEntity(entity);
      
      if (entityIdentity?.auto_apply) {
        applyDynamicIdentity(entity);
      }
    } else {
      setIdentity(null);
      setCurrentEntity(null);
      removeDynamicIdentity();
    }
  };

  return (
    <DynamicIdentityContext.Provider value={{ currentEntity, setEntity, identity }}>
      {children}
    </DynamicIdentityContext.Provider>
  );
};

interface DynamicIdentityWrapperProps {
  entityKey: string;
  children: React.ReactNode;
  className?: string;
  showLogo?: boolean;
  showAnimatedHeader?: boolean;
  variant?: 'default' | 'card' | 'full';
}

export const DynamicIdentityWrapper: React.FC<DynamicIdentityWrapperProps> = ({
  entityKey,
  children,
  className = '',
  showLogo = true,
  showAnimatedHeader = true,
  variant = 'default',
}) => {
  const { identity } = useDynamicIdentity();
  const currentIdentity = identity || getEntityIdentity(entityKey);

  if (!currentIdentity) {
    return <div className={className}>{children}</div>;
  }

  const containerStyles: React.CSSProperties = {
    backgroundColor: variant === 'full' ? currentIdentity.colors.background : 'transparent',
    minHeight: variant === 'full' ? '100vh' : 'auto',
    fontFamily: currentIdentity.fonts[0],
  };

  const cardStyles: React.CSSProperties = variant === 'card' ? {
    backgroundColor: '#ffffff',
    borderRadius: currentIdentity.buttons.style === 'rounded' ? '12px' : '4px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  } : {};

  return (
    <div className={className} style={containerStyles}>
      {showLogo && (
        <div className="flex justify-center mb-6">
          <img
            src={`/assets/dynamic-identity/${currentIdentity.logo}`}
            alt="Logo"
            className="h-16 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      
      {showAnimatedHeader && currentIdentity.animated_header_images.length > 0 && (
        <AnimatedHeader images={currentIdentity.animated_header_images} entityKey={entityKey} />
      )}
      
      <div style={cardStyles}>
        {children}
      </div>
    </div>
  );
};

interface AnimatedHeaderProps {
  images: string[];
  entityKey: string;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ images, entityKey }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-lg mb-6">
      {images.map((image, index) => (
        <img
          key={index}
          src={`/assets/dynamic-identity/${image}`}
          alt={`Header ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{
            opacity: index === currentImageIndex ? 1 : 0,
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ))}
    </div>
  );
};

export default DynamicIdentityProvider;
