import { debugOptions } from '../config/debug';
import * as env from 'env-var';

export const envRequired =
  process.env.NODE_ENV !== 'teste' && !process.env.TS_NODE_DEV;

const debug = debugOptions();

export const DB_URL = env
  .get('DB_URL')
  .required(envRequired)
  .default(`${debug?.DB_URL}`)
  .asString();
