'use strict';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const OrdersStatusesSchema = new Schema({
   id: {
      type: Number,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
});

const OrdersStatuses = model('order_statuses', OrdersStatusesSchema);

export default OrdersStatuses;
