/* eslint-disable no-unused-vars */
/**
 * This file begin the server application.
 * Enviroments:
 * PORT: 3000
 */

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import * as database from './config/database.js';
import Routes from './routes/index.js';

const App = express().use(
   express.json(),
   express.urlencoded({ extended: false }),
   cors(),
   Routes
);

App.listen(process.env.PORT || 3000, () => console.log('Server is up'));
