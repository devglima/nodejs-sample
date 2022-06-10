'use strict';

import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);
const { Schema, model } = mongoose;

const UserSchema = new Schema({
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
});

UserSchema.plugin(AutoIncrement, { id: 'user_id', inc_field: 'id' });
const User = model('users', UserSchema);
export default User;
