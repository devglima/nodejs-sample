'use strict';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let cachedDb = null;

async function connectToDatabase() {
   if (cachedDb) {
      return cachedDb;
   }
   const options = {
      ssl: true,
      sslValidate: false,
      sslCA: './rds-combined-ca-bundle.pem',
      connectTimeoutMS: 100000,
      keepAlive: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      maxIdleTimeMS: 270000,
      minPoolSize: 2,
      maxPoolSize: 4,
   };
   const client = await mongoose.connect(
      process.env.DATABASE_URL,
      options,
      (err) => {
         if (err) console.log(err);
         else console.log('Connected to database');
      }
   );
   cachedDb = client;
   return client;
}

connectToDatabase();
