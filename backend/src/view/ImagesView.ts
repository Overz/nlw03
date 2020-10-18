import { Image } from '../models/Image';

export const exibirImage = (img?: Image) => {
  return {
    id: img?.id,
    url: `http://localhost:3000/uploads/${img?.path}`,
  };
};

export const listarImage = (images?: Image[]) => {
  return images?.map((img) => exibirImage(img));
};
