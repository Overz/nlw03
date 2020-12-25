import request from 'supertest';
import { app } from '../../app';
import { showErrors } from '../../middlewares/error-handler';

it('', async () => {
  showErrors(true);

  const res = await request(app).post('/api/criar-orfanato').field({
    nome: 'teste',
    latitude: -27.5859169,
    longitude: -48.598233,
    about: 'asdasdasdasd',
    instructions: 'asdasdasdas',
    opening_hours: 'asdasdasd',
    open_on_weekends: false,
  });

  console.log(res.body);
});
