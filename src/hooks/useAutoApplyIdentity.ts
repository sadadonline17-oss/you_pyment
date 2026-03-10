import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { 
  detectEntityFromURL, 
  applyDynamicIdentity,
  getEntityIdentity 
} from '@/lib/dynamicIdentity';
import { useLink } from '@/hooks/useSupabase';

export const useAutoApplyIdentity = () => {
  const { id } = useParams();
  const location = useLocation();
  const { data: linkData } = useLink(id);

  useEffect(() => {
    let entity = detectEntityFromURL();
    
    if (!entity && linkData?.payload) {
      entity = linkData.payload.entity_type || linkData.payload.type;
    }
    
    const urlParams = new URLSearchParams(location.search);
    const entityParam = urlParams.get('entity') || urlParams.get('type');
    if (entityParam) {
      entity = entityParam;
    }

    if (entity) {
      applyDynamicIdentity(entity);
    }

    return () => {
      if (entity) {
        const root = document.documentElement;
        root.style.removeProperty('--dynamic-primary');
        root.style.removeProperty('--dynamic-secondary');
        root.style.removeProperty('--dynamic-background');
        root.style.removeProperty('--dynamic-font-primary');
        root.style.removeProperty('--dynamic-font-secondary');
        root.style.removeProperty('--dynamic-button-radius');
        root.removeAttribute('data-entity');
        root.removeAttribute('data-button-hover');
      }
    };
  }, [id, linkData, location]);

  const entity = detectEntityFromURL() || linkData?.payload?.entity_type || linkData?.payload?.type;
  const identity = entity ? getEntityIdentity(entity) : null;

  return { entity, identity };
};

export default useAutoApplyIdentity;
