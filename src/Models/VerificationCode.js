'use strict';
import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);
const { Schema, Types, model } = mongoose;

const VerificationCodeSchema = new Schema(
   {
      user_id: { type: Types.ObjectId, required: true },
      code: { type: String, required: true },
      type: { type: String },
      token: { type: String },
      expire_at: { type: String },
   },
   {
      versionKey: false,
   }
);

VerificationCodeSchema.plugin(AutoIncrement, {
   id: 'verification_id',
   inc_field: 'id',
});
const VerificationCode = model('verification_code', VerificationCodeSchema);

export default VerificationCode;
