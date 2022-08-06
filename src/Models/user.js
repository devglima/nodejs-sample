'use strict';

import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';
import paginate from 'mongoose-paginate-v2';

const AutoIncrement = Inc(mongoose);

const { Schema, model } = mongoose;

const UserSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      device_token: {
         type: String,
      },
      device_chosen_language: {
         type: String,
      },
      custom_fields: {
         type: Object,
      },
      has_media: {
         type: Boolean,
      },
      media: {
         type: Array,
      },
   },
   {
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
   }
);

UserSchema.plugin(AutoIncrement, { id: 'user_id', inc_field: 'id' });
UserSchema.plugin(paginate);

const User = model('users', UserSchema);
export default User;
