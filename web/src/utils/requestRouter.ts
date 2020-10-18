import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IOrphanage } from './interfaces';

export const requestRouter = (router: string) => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);
  useEffect(() => {
    api.get(router).then((req) => {
      setOrphanages(req.data);
    });
  }, []);

  return orphanages;
};
