const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Hosting = require('../models/hosting.model');
const config = require('../config/database');








module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        Hosting.getHostById(jwt_payload.data._id, (err, hosting) => {
            if (err) 
            {
                return done(err, false);
            }

            if (hosting) 
            {
                return done(null, hosting);
            } 
            else 
            {
                return done(null, false);
            }
        });
    }));
}