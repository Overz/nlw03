import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import { multerConfig } from '../../config/multer';
import { validateRequest } from '../../middlewares/validate-request';
import { orphanageRepository } from '../../models';

const router = Router();
const upload = multer(multerConfig);

router.post(
  '/api/criar-orfanato',
  // upload.array('images'),
  [
    body('nome')
      .isString()
      .notEmpty()
      .withMessage('É necessário informar o campo Nome'),
    body('latitude')
      .isNumeric()
      .notEmpty()
      .withMessage('É necessário informar o campo Latitude'),
    body('longitude')
      .isNumeric()
      .notEmpty()
      .withMessage('É necessário informar o campo Longitude'),
    body('about')
      .isString()
      .isLength({ max: 300 })
      .notEmpty()
      .withMessage('É necessário informar o campo About'),
    body('instructions')
      .isString()
      .notEmpty()
      .withMessage('É necessário informar o campo Instructions'),
    body('opening_hours')
      .isString()
      .notEmpty()
      .withMessage('É necessário informar o campo Opening Hours'),
    body('open_on_weekends')
      .isBoolean()
      .notEmpty()
      .withMessage('É necessário informar o campo Open on Weekends'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    const images = files.map((file) => {
      return { path: file.filename };
    });

    res.send(orphanageRepository.save({ ...req.body }));
  }
);

export { router as criarOrfanato };
