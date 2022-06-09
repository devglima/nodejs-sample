/* eslint-disable no-undef */
import { Http, useAuth } from './bootstrap';

// Authenticate user
beforeEach(async () => {});

describe('create()', () => {
   it('Create new category', async () => {
      const { token } = await useAuth();

      //Authenticate
      const result = await Http.get('/categories').set(
         'Authorization',
         `Bearer ${token}`
      );
      expect(result.status).toEqual(200);
   });
});

describe('index()', () => {
   it('Return all categories', async () => {
      const { token } = await useAuth();

      //Authenticate
      const result = await Http.get('/categories').set(
         'Authorization',
         `Bearer ${token}`
      );
      expect(result.status).toEqual(200);
   });
});

describe('show()', () => {
   it('Return all categories', async () => {
      const { token } = await useAuth();

      //Authenticate
      const result = await Http.get('/categories').set(
         'Authorization',
         `Bearer ${token}`
      );
      expect(result.status).toEqual(200);
   });
});

describe('update()', () => {
   it('Return all categories', async () => {
      const { token } = await useAuth();

      //Authenticate
      const result = await Http.get('/categories').set(
         'Authorization',
         `Bearer ${token}`
      );
      expect(result.status).toEqual(200);
   });
});

describe('update()', () => {
   it('Return all categories', async () => {
      const { token } = await useAuth();

      //Authenticate
      const result = await Http.get('/categories').set(
         'Authorization',
         `Bearer ${token}`
      );
      expect(result.status).toEqual(200);
   });
});
