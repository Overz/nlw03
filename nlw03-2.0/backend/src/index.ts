import { app } from './app';

const PORT = process.env.PORT || 3000;

const start = async () => {
  app.listen(PORT, () => {
    console.log('running on port', PORT);
  });
};

const finish = async () => {
  process.exit();
};

start();

process.on('SIGINT', finish);
process.on('SIGTERM', finish);
