import { app } from './app';
import * as env from 'env-var';
import { Connection } from 'typeorm';
import { connect } from './models';
import { migrate } from './db/db';
import path from 'path';

const PORT = env.get('PORT').default(3000).asPortNumber();

let db!: Connection;
let DB_URL!: string;
const start = async () => {
  try {
    // if (envRequired) {
    // DB_URL = env.get('DB_URL').required(true).asString();
    DB_URL = 'postgresql://postgres:postgres@localhost:5555/postgres';
    // }
  } catch (error) {
    exit(error);
  }

  try {
    // if (envRequired) {
    db = await connect({ type: 'postgres', url: DB_URL });

    migrate(db, path.join(__dirname, '/migrations'));
    // }
  } catch (error) {
    exit(error);
  }

  try {
    app.listen(PORT, () => {
      console.log(`Running on PORT ${PORT}`);
    });
  } catch (error) {
    exit(error);
  }
};

const finish = async () => {
  console.log('\nCleaning...');

  if (db) {
    await db.close();
  }

  process.exit();
};

const exit = (msg: string) => {
  console.error(msg);
  process.exit(1);
};

start();

process.on('SIGINT', finish);
process.on('SIGTERM', finish);
