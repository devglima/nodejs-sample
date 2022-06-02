'use strict';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const NotificationsSchema = new Schema({});

const Notifications = model('notifications', NotificationsSchema);

export default Notifications;
