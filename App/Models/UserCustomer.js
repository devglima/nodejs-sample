'use strict';

import mongoose from 'mongoose';
/* import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose); */
const { Schema, model } = mongoose;

const UserCustmerSchema = new Schema(
   {
      id_user: { type: Number, required: true },
      cIDCustomer: { type: String, required: true },
      cIDCompany: { type: String, required: true },
      cDocument1: { type: String, required: true },
   },
   {
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
   }
);

/* UserCustmerSchema.plugin(AutoIncrement, {
   id: 'user_customer_id',
   inc_field: 'id',
}); */

const UserCustomer = model('user_customer', UserCustmerSchema);
export default UserCustomer;
