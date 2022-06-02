'use strict';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CartsSchema = new Schema({});

const Carts = model('carts', CartsSchema);
export default Carts;
