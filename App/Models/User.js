'use strict';

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
   id: {
      type: Number,
   },
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

const User = model('users', UserSchema);
export default User;
