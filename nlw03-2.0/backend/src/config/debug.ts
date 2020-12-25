import * as env from 'env-var';

export const debugOptions = () => {
  if (env.get('TS_NODE_DEV').asBool()) {
    return {
      DB_URL: '',
    };
  }
};
