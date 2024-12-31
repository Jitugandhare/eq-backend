const passport = require('passport');
const User=require('../models/user.model.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (token, tokenSecret, profile, done) => {
    try {
      let user = await User.findOne({ where: { googleId: profile.id } });
      if (!user) {
        // If user doesn't exist, create a new one
        user = await User.create({
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          googleId: profile.id,
          email: profile.emails[0].value,  
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//   },
//   async (token, tokenSecret, profile, done) => {
//     try {
//       let user = await User.findOne({ where: { facebookId: profile.id } });
//       if (!user) {
//         // If user doesn't exist, create a new one
//         user = await User.create({
//           firstname: profile.name.givenName,
//           lastname: profile.name.familyName,
//           facebookId: profile.id,
//           email: profile.emails[0].value,  // You can store more user data here
//         });
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err, null);
//     }
//   }
// ));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;






