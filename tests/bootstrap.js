import { resolve } from 'path';
import request from 'supertest';
import '../config/database.js';

require('dotenv').config({
   path: resolve(__dirname, '..', '.env.test'),
});

const HOST = `http://${process.env.HOST}:${process.env.PORT}`;
export const Http = request(HOST);
