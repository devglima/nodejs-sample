import jwt from 'jsonwebtoken';
import { authenticate } from '../Middleware/AuthMiddleware.js';
import User from '../Models/user.js';

const useAuth = (req) => {
   /* let headers = req.headers['authorization'];
   headers = headers ? headers.split(' ') : []; // ['Bearer', 'token'] */

   const user = {
      id: 12,
   };

   return {
      user,
   };
};

export default useAuth;
