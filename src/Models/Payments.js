'use strict';
import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);
const { Schema, model } = mongoose;

const PaymentSchema = new Schema(
   {
      user_id: { type: Number, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
      status: { type: String, required: true },
      method: { type: String, required: true },
      invoice_url: { type: String },
      invoice_pdf: { type: String },
      invoice_id: { type: String },
   },
   {
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
   }
);

PaymentSchema.plugin(AutoIncrement, { id: 'payment_id', inc_field: 'id' });
const Payments = model('payments', PaymentSchema);

export default Payments;
