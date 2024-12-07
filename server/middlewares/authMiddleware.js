import jwt from 'jsonwebtoken';

class AuthMiddleware {
  static async verifyAccessToken(req, res, next) {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return res.status(400).json({
        status: 'error',
        message: 'Bad request. Please check your request again.',
        error: process.env.NODE_ENV === 'production' ?
          undefined : 'The authorization header is missing'
      });
    }

    const [ tokenHeader, accessToken ] = authHeader.split(' ');

    if (tokenHeader !== 'Bearer' || !accessToken) {
      return res.status(400).json({
        status: 'error',
        message: 'Bad request. Please check your request again.',
        error: process.env.NODE_ENV === 'production' ? undefined :
          'The authorization is not a Bearer type or token is missing'
      });
    }

    try {
      const payload = await new Promise((resolve, reject) => {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET,
          (err, decoded) => {
            if (err)
              return reject(err);
            resolve(decoded);
          });
      });
      if (!payload || !payload.userId || !payload.role) {
        return res.status(403).json({
          status: 'error',
          message: 'Forbidden access. Authorization denied.',
          error: process.env.NODE_ENV === 'production' ? undefined :
            'Invalid token. Missing values from the token payload.'
        });
      }

      req.user = payload;
      next();
    } catch(error) {
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred. Please try again later.',
        error: error.message
      });
    }
  }

  static async optionalVerifyAccessToken(req, res, next) {
    const authHeader = req.get('Authorization');
    if (authHeader) {
      const [tokenHeader, accessToken] = authHeader.split(' ');

      if (tokenHeader === 'Bearer' && accessToken) {
        try {
          const payload = await new Promise((resolve, reject) => {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET,
              (err, decoded) => {
                if (err) return reject(err);
                resolve(decoded);
              });
          });
          if (payload && payload.userId)
            req.user = payload;
        } catch(error) {
          // ignoring token errors and proceeding without setting req.user
        }
      }
    }
    next();
  }
  static async checkAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({
      status: 'error',
      message: 'Forbidden. Access denied.',
      error: process.env.NODE_ENV === 'production' ?
        undefined : 'User\'s role is not an admin, hence access denied'
    });
  }
}

export default AuthMiddleware;
