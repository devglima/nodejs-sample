'use strict';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const options = {
   /* ssl: true,
   sslValidate: false,
   sslCA: './rds-combined-ca-bundle.pem',
   connectTimeoutMS: 100000,
   keepAlive: true,
   useFindAndModify: false,
   useUnifiedTopology: true,
   useNewUrlParser: true,
   maxIdleTimeMS: 270000,
   minPoolSize: 2,
   maxPoolSize: 4, */
};

(async () =>
   mongoose.connect(process.env.DATABASE_URL_DEV, options, (err) => {
      if (err) console.log(err);
      else console.log('Connected to database');
   }))();
