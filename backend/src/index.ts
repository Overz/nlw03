import { connect } from './db/connection';
import { Connection } from 'typeorm';
import { app } from './app';

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

let db: Connection;
const start = async () => {
  db = await connect();

  app.listen(+port, host, () => {
    console.log(`Running on PORT ${port}`);
  });
};

const finish = async () => {
  console.log('\nCleaning...');

  if (db) {
    db.close();
  }

  process.exit();
};

start();

process.on('SIGINT', finish);
process.on('SIGTERM', finish);
