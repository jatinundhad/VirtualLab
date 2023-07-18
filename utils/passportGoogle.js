import passport from "passport";
import Strategy from "passport-google-oauth2";
import dotenv from "dotenv";
import User from "../model/User.js";
dotenv.config();

const GoogleStrategy = Strategy.Strategy;
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        $and: [
          { "google.email": profile.emails[0].value },
          { "google.name": profile.displayName },
        ],
      });

      if (existingUser) {
        // If the user already exists, return the user
        return done(null, existingUser);
      } else {
        // If the user does not exist, create a new user in the database
        const newUser = new User({
          method: "google",
          google: {
            name: profile.displayName,
            email: profile.emails[0].value,
          },
          isValid: true,
        });

        await newUser.save();

        return done(null, newUser);
      }
    }
  )
);
