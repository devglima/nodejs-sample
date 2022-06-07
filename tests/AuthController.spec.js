/* eslint-disable no-undef */

import { Http } from './bootstrap';

describe('Login', () => {
   it('should return a token', async () => {
      const auth = await Http.post('/login', {
         email: 'rosario@gmail.com',
         password: '12345',
      });

      expect(auth).sta;
   });
});
