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

OrderStatusSchema.plugin(AutoIncrement, {
   id: 'order_status_id',
   inc_field: 'id',
});
const OrderStatus = model('order_statuses', OrderStatusSchema);

export default OrderStatus;
