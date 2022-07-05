'use strict';
import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);

const { Schema, model } = mongoose;

const ProductOrdersSchema = new Schema(

);

ProductOrdersSchema.plugin(AutoIncrement, {
    id: 'food_order_id',
    inc_field: 'id',
});

const ProductOrders = model('food_orders', ProductOrdersSchema);
export default ProductOrders;
