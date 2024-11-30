import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { User } from '../modals/user.models.js';
import { Strategy as LinkedInStrategy } from '../passport-linkedin-oauth2/lib/index.js';
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
        const user=await User.findOne({contact:email});
        if(!user){
            const newuser=new User({
                name :profile.displayName,
                contact:profile.email,
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
export const configureLinkedinPassport = (passport) => {
  passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.LINKDIN_CLIENT_ID,
        clientSecret: process.env.LINKDIN_CLIENT_SECRATE,
        callbackURL: `${process.env.SERVER}/auth/linkedin/callback`,
        scope: ['openid', 'profile', 'email'],
        state: true
      },
      async(accessToken, refreshToken, profile, done)=>{
        const email=profile.email;
        const user=await User.findOne({contact:email});
        if(!user){
          const newuser=new User({
            name :profile.displayName,
            contact:profile.email,
            role:3,
            isAccVarified:true
          });
          newuser.save();
        }
        process.nextTick(function (){
          return done(null, profile);
        });
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
