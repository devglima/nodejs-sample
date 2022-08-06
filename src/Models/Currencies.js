'use strict';

import mongoose from 'mongoose';

import Inc from 'mongoose-sequence';
import paginate from 'mongoose-paginate-v2';

const AutoIncrement = Inc(mongoose);

const { Schema, model } = mongoose;

const CurrenciesSchema = new Schema(
   {
      name: { type: String, required: true },
      code: { type: String, required: true },
      symbol: { type: String, required: true },
      decimal_digits: { type: String, required: true },
      rounding: { type: String, required: true },
   },
   {
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
   }
);

CurrenciesSchema.plugin(AutoIncrement, { id: 'currency_id', inc_field: 'id' });
CurrenciesSchema.plugin(paginate);

const Currencies = model('currencies', CurrenciesSchema);

export default Currencies;
