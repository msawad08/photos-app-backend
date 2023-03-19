import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {sign} from "jsonwebtoken"
 import {User} from '../app/user.model'; 
 import { Request } from 'express';
import { verifyUser } from '../app/app.service';


var cookieExtractor = function(req: Request) {
  var token = null;

  if (req && req.cookies)
  {
      token = req.cookies['accessToken'];

  }
  return token;
};

export const initiasePassport = function(){
  // Set up options for JWT strategy
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET,
  };

// Create JWT strategy
  const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
    try {

      if (!payload.email) {
        return done(null, false);
      }

      const user = await verifyUser(payload.email);

      if (!user) {
        return done(null, false);
      }

      // Otherwise, return user
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });

  passport.use(jwtStrategy);

}



export function generateToken(user: {email: string} ) {
    const jwtPayload = { email: user.email };
    const jwtOptions = { expiresIn: '1d' };
    return sign(jwtPayload, process.env.JWT_SECRET??"", jwtOptions);
}

export const authMiddleware = passport.authenticate('jwt', { session: false });


// Use the strategy

// Export the Passport module
export  {passport};