import moment from 'moment';
import User from '../Models/user.js';
import { v4 as uuidv4 } from 'uuid';
import VerificationCode from '../Models/VerificationCode.js';

export class VerificationCodeRepository {
   static async generate(user_id, type) {
      const expire_at = moment().add(1, 'hour').toISOString();
      const token = uuidv4();
      const code = Math.ceil(Math.random() * 5696357859)
         .toString()
         .substring(0, 6);

      const generate = await VerificationCode.create({
         user_id,
         type,
         code,
         token,
         status: false,
         expire_at,
      });

      return {
         token: generate.token,
         code: generate.code,
      };
   }

   static async verify(query, type) {
      const verified = await VerificationCode.findOne(query);

      if (!verified)
         return {
            success: false,
            message: `Verification ${type} invalid.`,
         };

      if (moment(verified.expire_at).isBefore(moment())) {
         await VerificationCodeRepository.delete();

         return {
            success: false,
            message: `Verification ${type} expired.`,
         };
      }

      return {
         success: true,
         expire_at: verified.expire_at,
         status: verified.status,
         user: await User.findById(verified.user_id).select({
            email: true,
         }),
      };
   }

   static async update(where, data) {
      await VerificationCode.findOneAndUpdate(where, data);
   }

   static async expire(query) {
      await VerificationCode.findOneAndUpdate(query, {
         expire_at: moment().add(-5, 'minutes').toISOString(),
      });
   }

   static async delete(query) {
      await VerificationCode.findOneAndDelete(query);
   }
}
