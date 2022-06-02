import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
   let header = req.headers['authorization'];
   header = header ? header.split(' ') : []; // ['Bearer', 'token']

   // if there is no token
   if (header.length <= 0)
      return res
         .status(401)
         .json({ success: false, message: 'No token provided.' });

   // if there is no a bearer setence in the token
   if (header[0].toLowerCase() !== 'bearer')
      return res.status(500).json({ auth: false, message: 'Invalid token' });

   const token = header[1]; //Get token string

   // verify token
   jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err)
         return res
            .status(500)
            .json({ auth: false, message: 'Failed to authenticate token.' });

      //req.body.id = decoded.id;

      next();
   });
};
