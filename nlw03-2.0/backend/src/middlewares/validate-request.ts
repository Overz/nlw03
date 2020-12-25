import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * Inspeciona a requisição, procurando por erros vindos do
 * express-validator. Se algum erro for encontrado,
 * a mensagem do erro será retornada
 *
 * @param req Requisição HTTP
 * @param res Resposta HTTP
 * @param next Próximo handler
 */
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const err = result
      .array()
      .map((error) => error.msg)
      .filter((msg) => msg !== 'Invalid value');

    return res.json({ errors: err });
  }

  next();
};
