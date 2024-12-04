import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/User.js';

// Configure Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user || password !== user.password) {
      return done(null, false, { message: 'Incorrect username or password' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialize User - Save user info to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize User - Retrieve user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});