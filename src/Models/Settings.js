'use strict';
import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);
const { Schema, model } = mongoose;

const SettingSchema = new Schema(
   {
      key: { type: String, required: true },
      value: { type: Object, required: true },
   },
   {
      versionKey: false,
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
   }
);

SettingSchema.plugin(AutoIncrement, { id: 'setting_id', inc_field: 'id' });

const Settings = model('app_settings', SettingSchema);
export default Settings;
