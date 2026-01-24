import crypto from 'node:crypto';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { google } from 'googleapis';
import GoogleStrategy from 'passport-google-oidc';
import { User } from '../../generated/prisma/client.js' // * 'User' Type.
import { prisma } from '../database/prisma.js';

const router = express.Router();

passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/oauth2/redirect/google',
  scope: [ 'profile' ]
}, function verify (issuer : string, profile : {id: string, displayName: string}, cb : Function) {
  prisma.user.findFirst({
    where: {
      credentialProvider: issuer,
      credentialSubject: profile.id
    }
  }).then((user) => {
    if (!user) {
      return prisma.user.create({
        data: {
          name: profile.displayName,
          credentialProvider: issuer,
          credentialSubject: profile.id
        }
      }).then((newUser) => {
        return cb(null, newUser);
      })
    } else {
      return cb(null, user);
    }
  }).catch((err) => {
    cb(err);
  })
}));

router.get('/login/federated/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

passport.serializeUser(function(user : any, cb) { // ? Open Request: Replace 'any' with whatever it should be. (User doesn't work, but is what the function should take in.)
  process.nextTick(function() {
    return cb(null, { id: user.id, name: user.name });
  });
});

passport.deserializeUser(function(user : User, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

const oauth2Client = new google.auth.OAuth2(
  process.env['GOOGLE_CLIENT_ID'],
  process.env['GOOGLE_CLIENT_SECRET'],
  process.env['CALENDAR_REDIRECT_URL']
);

const scopes = ['https://www.googleapis.com/auth/calendar.readonly'];


router.get('/auth/calendar', (req, res) => {
  const state = crypto.randomBytes(32).toString('hex');
  
  // store state in session - presumably this should happen in a specific request
  req.session.state = state;
  
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'online', // do I need offline?
    scope: scopes,
    include_granted_scopes: true,
    state: state
  });

  res.redirect(authorizationUrl);
});

router.get('/auth/redirect/calendar', (req, res) => {
  console.log('calendar redirect');

  console.log(req.query);

  res.redirect('/');
});

export default router;