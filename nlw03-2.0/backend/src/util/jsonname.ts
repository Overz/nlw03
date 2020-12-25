import 'reflect-metadata';

export const META_JSON_NAME = 'nlw03:annotations:jsonname';

/**
 * Define um nome JSON ao ser usado como saída para uma determinada
 * propriedade quando uma instância desta classe for serializada.
 *
 * Este nome também é usado para identificar os campos passados pelo
 * usuário em uma consulta paginada.
 *
 * @param name String: O nome 'user-friendly' a ser usado por essa propriedade.
 * @constructor Reflect API
 */
export const JsonName = (name: string) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any,
  propertyKey: string | symbol
) => {
  Reflect.defineMetadata(META_JSON_NAME, name, target, propertyKey);
};
