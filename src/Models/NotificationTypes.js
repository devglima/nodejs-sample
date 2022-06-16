'use strict';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const NotificationTypesSchema = new Schema({});

const NotificationTypes = model('notification_types', NotificationTypesSchema);

export default NotificationTypes;
