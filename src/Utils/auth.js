import jwt from 'jsonwebtoken';
import User from '../Models/user.js';

const auth = async (req) => {
   let headers = req.headers['authorization'];
   headers = headers ? headers.split(' ') : []; // ['Bearer', 'token']

   const token = headers[1]; //Get token string\
   return jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (!err) {
         const user = await User.findById(decoded.id);
         return user;
      }
   });
};

export default auth;
