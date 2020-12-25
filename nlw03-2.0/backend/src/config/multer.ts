import multer, { FileFilterCallback, Options } from 'multer';
import { Request } from 'express';
import path from 'path';
import crypto from 'crypto';

const upload = path.resolve(__dirname, '..', 'tmp', 'uploads');

export const allowedExtTypes = ['jpg', 'jpeg', 'png', 'svg', 'bmp'];

export const allowedFiles = [
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/bmp',
];

/**
 * Configuração para rota de Upload de arquivos.
 *
 * Essa configuração, filtra os arquivos, adiciona Hash aos nomes para não serem iguais e darem conflitos,
 * Verifica se os arquivos estão no Formato correto(Mimetypes, Extensão).
 *
 * Para ter acesso aos Mimetypes, os links abaixos existem exemplos:
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 * http://www.iana.org/assignments/media-types/media-types.xhtml
 *
 * Para verificação em Bytes/Hex:
 * https://en.wikipedia.org/wiki/List_of_file_signatures
 */
const config: Options = {
  dest: upload,
  storage: multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      cb(null, upload);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          cb(err, '');
        }

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
  limits: {},
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const { mimetype } = file;
    const fileExtension = file.originalname.split('.');

    if (
      allowedFiles.includes(mimetype) &&
      allowedExtTypes.includes(fileExtension[1])
    ) {
      cb(null, true);
    } else {
      cb(new Error('Formato de arquivo incorreto!'));
    }
  },
};

export { config as multerConfig };
