'use strict';
import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);
const { Schema, model } = mongoose;

const OrderStatusSchema = new Schema(
   {
      status: { type: Number, required: true },
   },
   {
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
   }
);

OrderStatusSchema.plugin(AutoIncrement, { id: 'order_id', inc_field: 'id' });
const OrderStatus = model('orders', OrderStatusSchema);

export default OrderStatus;
