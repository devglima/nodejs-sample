'use strict';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

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

export default mongoose.connect(process.env.DATABASE_URL, options, () => {
   //if (err)
});
