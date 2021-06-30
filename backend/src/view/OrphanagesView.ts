import { Orphanage } from '../models/Orphanage';
import { listarImage } from './ImagesView';

export const exibirOrphanage = (o?: Orphanage) => {
  return {
    id: o?.id,
    name: o?.name,
    about: o?.about,
    latitude: o?.latitude,
    longitude: o?.longitude,
    instructions: o?.instructions,
    opening_hours: o?.opening_hours,
    open_on_weekends: o?.open_on_weekends,
    images: listarImage(o?.images),
  };
};

export const listarOphanage = (orpanages?: Orphanage[]) => {
  return orpanages?.map((o) => exibirOrphanage(o));
};
