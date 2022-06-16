'use strict';
import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);
const { Schema, model } = mongoose;

const PaymentSchema = new Schema(
   {
      id: { type: Number, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
      user_id: { type: Number, required: true },
      status: { type: Number, required: true },
      method: { type: Number, required: true },
      invoice_url: { type: Number },
      invoice_pdf: { type: Number },
      invoice_id: { type: Number },
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
