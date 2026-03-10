import { useState, useEffect } from 'react';
import { 
  getEntityIdentity, 
  applyDynamicIdentity, 
  removeDynamicIdentity,
  detectEntityFromURL,
  type DynamicIdentityEntity 
} from '@/lib/dynamicIdentity';

export const useDynamicIdentityHook = (entityKey?: string) => {
  const [identity, setIdentity] = useState<DynamicIdentityEntity | null>(null);
  const [currentEntity, setCurrentEntity] = useState<string | null>(null);

  useEffect(() => {
    const entity = entityKey || detectEntityFromURL();
    
    if (entity) {
      const entityIdentity = getEntityIdentity(entity);
      setIdentity(entityIdentity);
      setCurrentEntity(entity);
      
      if (entityIdentity?.auto_apply) {
        applyDynamicIdentity(entity);
      }
    }

    return () => {
      removeDynamicIdentity();
    };
  }, [entityKey]);

  const changeEntity = (newEntity: string | null) => {
    if (newEntity) {
      const entityIdentity = getEntityIdentity(newEntity);
      setIdentity(entityIdentity);
      setCurrentEntity(newEntity);
      
      if (entityIdentity?.auto_apply) {
        applyDynamicIdentity(newEntity);
      }
    } else {
      setIdentity(null);
      setCurrentEntity(null);
      removeDynamicIdentity();
    }
  };

  return {
    identity,
    currentEntity,
    changeEntity,
    applyIdentity: (entity: string) => {
      changeEntity(entity);
    },
    removeIdentity: () => {
      removeDynamicIdentity();
      setIdentity(null);
      setCurrentEntity(null);
    },
  };
};

export default useDynamicIdentityHook;
