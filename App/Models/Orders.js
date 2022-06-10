'use strict';
import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);
const { Schema, model } = mongoose;

const OrdersSchema = new Schema(
   {
      user_id: { type: Number, required: true },
      order_status_id: { type: Number, required: true },
      tax: { type: Number },
      hint: { type: String },
      payment_id: { type: Number },
      cIDOrder: { type: String },
      xOrderStatus: { type: String },
   },
   {
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
   }
);

OrdersSchema.plugin(AutoIncrement, { id: 'order_id', inc_field: 'id' });
const Orders = model('orders', OrdersSchema);

export default Orders;
