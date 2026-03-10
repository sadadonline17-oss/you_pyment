import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyDynamicIdentity, detectEntityFromURL } from '@/lib/dynamicIdentity';

export const useAutoIdentityApplication = () => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const entity = urlParams.get('entity') || urlParams.get('company') || urlParams.get('service') || detectEntityFromURL();

    if (entity) {
      console.log('🎨 Auto-applying identity for entity:', entity);
      applyDynamicIdentity(entity);
    } else {
      const path = location.pathname.toLowerCase();
      let autoEntity = null;

      if (path.includes('aramex')) autoEntity = 'aramex';
      else if (path.includes('dhl')) autoEntity = 'dhl';
      else if (path.includes('fedex')) autoEntity = 'fedex';
      else if (path.includes('ups')) autoEntity = 'ups';
      else if (path.includes('smsa')) autoEntity = 'smsa';
      else if (path.includes('naqel')) autoEntity = 'naqel';
      else if (path.includes('zajil')) autoEntity = 'zajil';
      else if (path.includes('saudipost')) autoEntity = 'saudipost';
      else if (path.includes('empost')) autoEntity = 'empost';
      else if (path.includes('government') || path.includes('gov')) autoEntity = 'government_payment';
      else if (path.includes('local')) autoEntity = 'local_payment';
      else if (path.includes('chalet')) autoEntity = 'chalets';
      else if (path.includes('contract')) autoEntity = 'contracts';
      else if (path.includes('health')) autoEntity = 'health_links';
      else if (path.includes('invoice')) autoEntity = 'invoices';
      else if (path.includes('bank')) autoEntity = 'bank_pages';

      if (autoEntity) {
        console.log('🎨 Auto-detecting and applying identity:', autoEntity);
        applyDynamicIdentity(autoEntity);
      }
    }
  }, [location]);
};

export const AutoIdentityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useAutoIdentityApplication();
  return <>{children}</>;
};
