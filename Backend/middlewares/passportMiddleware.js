import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { User } from '../modals/user.models.js';
export const configurePassport = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER}/auth/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
    try{
        const email=profile.email;
        const user=await User.findOne({email});
        if(!user){
            const newuser=new User({
                name :profile.displayName,
                email:profile.email,
                role:3,
                isAccVarified:true
            });
            newuser.save();
            done(null, newuser);
        }
        else{
            done(null, user); 
        }  
    } catch (error) {
            done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
