'use strict';
import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);
const { Schema, model } = mongoose;

const CartsSchema = new Schema(
   {
      user_id: { type: Number, required: true },
      cIDCompany: { type: String, required: true },
      cIDProduct: { type: String, required: true },
      quantity: { type: Number, required: true },
   },
   {
      quantity: false,
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
   }
);

CartsSchema.plugin(AutoIncrement, { id: 'cart_id', inc_field: 'id' });

const Carts = model('carts', CartsSchema);
export default Carts;
