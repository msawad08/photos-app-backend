import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {sign} from "jsonwebtoken"
 import {User} from '../user/user.model'; 
 import { Request } from 'express';


var cookieExtractor = function(req: Request) {
  var token = null;
  // console.log(req);

  if (req && req.cookies)
  {
      console.log(req.cookies);
      token = req.cookies['accessToken'];
      console.log(req.cookies, token);

  }
  return token;
};

// Set up options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET || "your_secret_key_here",
};

// Create JWT strategy
const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
  try {
    console.log(payload);
    // Find the user associated with the token
    // const user = await User.findById(payload.sub);

    // If user not found, return error
    if (!payload.email) {
      return done(null, false);
    }

    // Otherwise, return user
    done(null, payload);
  } catch (err) {
    done(err, false);
  }
});

export function generateToken(user: User) {
    const jwtPayload = { email: user.email };
    const jwtOptions = { expiresIn: '1d' };
    return sign(jwtPayload, 'your_secret_key_here', jwtOptions);
}

export const authMiddleware = passport.authenticate('jwt', { session: false });


// Use the strategy
passport.use(jwtStrategy);

// Export the Passport module
export  {passport};