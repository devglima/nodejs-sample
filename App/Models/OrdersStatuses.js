'use strict';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const OrdersStatusesSchema = new Schema({});

const OrdersStatuses = model('order_statuses', OrdersStatusesSchema);

export default OrdersStatuses;
