'use strict';

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CurrenciesSchema = new Schema({});

const Currencies = model('currencies', CurrenciesSchema);

export default Currencies;
