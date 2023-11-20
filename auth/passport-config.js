const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize (passport, getUserByEmail){
    const authenticateUser = async (email, password) => {
        const user = getUserByEmail(email)
        if(user == null) {
            return done(null, false, { msg: 'user not found'})
        }

        try {
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else {
                return done(null, false, { msg: 'password incorrect'})
            }
        } catch (error){
            return done(error)
        }
    }
    passport.use(new localStrategy({ usernameField: 'email'}), authenticateUser)
    passport.serializeUser((user, done)=> {})
    passport.deserializeUser((user, done)=> {})
}

module.exports= initialize