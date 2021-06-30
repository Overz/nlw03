import { Image } from '../models/Image';

export const exibirImage = (img?: Image) => {
  return {
    id: img?.id,
    // Localhost
    // Motivo do IP fixo: Acessar as imagens pelo mobile, que são configurações diferentes
    url: `http://192.168.0.41:3000/uploads/${img?.path}`,
  };
};

export const listarImage = (images?: Image[]) => {
  return images?.map((img) => exibirImage(img));
};
