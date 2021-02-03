import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  //Get token from header
  let token;
  token = req.headers.authorization.split(' ')[1];

  //check if not token
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded.user;

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
};

const admin = (req, res, next) => {
  //Get token from header
  let token;
  token = req.headers.authorization.split(' ')[1];

  //check if not token
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY_ADMIN);

      console.log(decoded);
      req.user = decoded.user;
      req.doctor = decoded.doctor;

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
};

export { auth, admin };
