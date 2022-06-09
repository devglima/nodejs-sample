/* eslint-disable no-undef */

import { Http } from './bootstrap';

describe('Login', () => {
   it('Return a object with success preperty', async () => {
      const auth = await Http.post('/login').send({
         email: 'adm@mc1.com',
         password: 'mc1#123',
      });

      const result = JSON.parse(auth.text);
      expect(result.success).toBe(true);
   });
});
