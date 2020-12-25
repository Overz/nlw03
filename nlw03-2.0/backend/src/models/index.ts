import { createConnection, ConnectionOptions, Repository } from 'typeorm';
import { Image } from './image';
import { Orfanato } from './orfanato';

export let orphanageRepository: Repository<Orfanato>;
export let imageRepository: Repository<Image>;

export const connect = async (options: ConnectionOptions) => {
  const db = await createConnection({
    logging: false,
    synchronize: false,
    migrationsTableName: 'unused_migrations',
    entities: [Orfanato, Image],
    ...options,
  });

  orphanageRepository = db.getRepository(Orfanato);
  imageRepository = db.getRepository(Image);

  return db;
};
