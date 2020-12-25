import { connect } from '../models';
import { Connection } from 'typeorm';

export let db: Connection;

beforeAll(async () => {
  db = await connect({ type: 'sqlite', database: ':memory:' });
});

beforeEach(async () => {
  jest.clearAllMocks();
  await db.synchronize(true);
});

afterAll(async () => {
  await db.close();
});
