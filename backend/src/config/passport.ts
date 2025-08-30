import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			callbackURL: '/api/auth/google/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
			const newUser = {
				googleId: profile.id,
				displayName: profile.displayName,
				firstName: profile.name?.givenName || '',
				email: profile.emails?.[0].value || '',
				image: profile.photos?.[0].value,
			};

			try {
				let user = await User.findOne({ googleId: profile.id });

				if (user) {
					done(null, user);
				} else {
					user = await User.create(newUser);
					done(null, user);
				}
			} catch (err) {
				console.error(err);
				done(err, false);
			}
		}
	)
);
