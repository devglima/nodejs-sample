'use strict';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const OrdersSchema = new Schema({});

const Orders = model('orders', OrdersSchema);

export default Orders;
