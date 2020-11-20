import { Request, Response } from 'express';
import { orphanagesRepository } from '../db/connection';
import { exibirOrphanage, listarOphanage } from '../view/OrphanagesView';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('É necessário informar o campo Nome'),
  latitude: yup.number().required('É necessário informar o campo Latitude'),
  longitude: yup.number().required('É necessário informar o campo Longitude'),
  about: yup.string().max(300).required('É necessário informar o campo About'),
  instructions: yup
    .string()
    .required('É necessário informar o campo Instructions'),
  opening_hours: yup
    .string()
    .required('É necessário informar o campo Opening_hours'),
  open_on_weekends: yup
    .boolean()
    .required('É necessário informar o campo Open_on_weekends'),
  files: yup.array(
    yup.object().shape({
      path: yup
        .string()
        .required('É necessário informar o caminho para a Imagem'),
    })
  ),
});

export default {
  async criar(req: Request, res: Response) {
    let data = { ...req.body };
    data = parseBody(data);

    // Sobre o multer, é obrigatorio fazer esse cast quando
    // é um array de arquivos, pois a tipagem não fica correta como array
    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    await schema.validate({ ...data }, { abortEarly: false });

    const orphanages = await orphanagesRepository.save({ ...data, images });

    res.status(201).json(exibirOrphanage(orphanages));
  },
  async exibir(req: Request, res: Response) {
    const { id } = req.params;
    const orphanage = await orphanagesRepository.findOne(id, {
      relations: ['images'],
    });
    res.json(exibirOrphanage(orphanage));
  },
  async listar(req: Request, res: Response) {
    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    });
    res.json(listarOphanage(orphanages));
  },
  async excluir(req: Request, res: Response) {
    const { id } = req.params;

    // const orphanage = await orphanagesRepository.findOne(id, {
    //   relations: ['images'],
    // });

    // if (!orphanage) {
    //   return res.status(400).json({ message: 'Not Found' });
    // }

    // if (orphanage.images && orphanage.images.length > 0) {
    //   for (let i = 0; i < orphanage.images.length; i++) {
    //     const filename = orphanage.images[i].path;
    //     const caminho = path.resolve(__dirname, '..', 'tmp', 'uploads');
    //     const dir = fs.readdirSync(caminho);

    //     if (dir && dir.length > 0) {
    //       dir.map((file) => {
    //         console.log(file === name);

    //         if (file === filename) {
    //           fs.unlinkSync(caminho + filename);
    //         }
    //       });
    //     }
    //   }
    // }

    await orphanagesRepository.delete(id);

    res.json({ ok: true });
  },
  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const data = { ...req.body };

    const i = await orphanagesRepository.count({ where: { id: id } });
    if (i < 0) {
      return res.status(400).json({ message: 'Not Found' });
    }

    await orphanagesRepository.save({ ...data });

    res.json({ ok: true });
  },
  async ping(req: Request, res: Response) {
    res.json({ ok: true });
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseBody = (data: any) => {
  const open_on_weekends = data.open_on_weekends === 'true';
  const latitude = Number(data.latitude);
  const longitude = Number(data.longitude);
  data.latitude = latitude;
  data.longitude = longitude;
  data.open_on_weekends = open_on_weekends;

  return data;
};
