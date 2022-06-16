import { resolve } from 'path';
//import '../config/database.js';
import request from 'supertest';

require('dotenv').config({
   path: resolve(__dirname, '..', '.env.test'),
});

export async function useAuth() {
   const res = await Http.post('/login').send({
      email: 'adm@mc1.com',
      password: 'mc1#123',
   });

   return JSON.parse(res.text);
}

const HOST = `http://${process.env.HOST}:${process.env.PORT}`;
export const Http = request(HOST);
