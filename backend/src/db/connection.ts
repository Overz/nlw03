import { createConnection, Repository } from 'typeorm';
import { Orphanage } from '../models/Orphanage';

export let orphanagesRepository: Repository<Orphanage>;

export const connect = async () => {
  const db = await createConnection();

  orphanagesRepository = db.getRepository(Orphanage);

  return db;
};
