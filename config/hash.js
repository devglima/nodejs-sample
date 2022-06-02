import bcrypt from 'bcryptjs';
const saltRounds = 10;

export const Hash = {
   make: async (pass) => {
      return await bcrypt.hash(pass, saltRounds);
   },
   compare: async (text, hash) => {
      return await bcrypt.compare(text, hash);
   },
};
