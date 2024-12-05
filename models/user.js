// In the models directory, create a model module for users. The module defines a schema 
//and compiles a model for users in your application. Each user document should include at least the following fields:

// first name 
// last name
// email
// password

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName: {type: String, required: [true, "You need a first name in order to create a new user"]}, 
    lastName: {type: String, required: [true, "You need a last name in order to create a new user"]},
    email: {type: String, required: [true, "You need to provide an email address"], unique: [true, 'This email is already in use.']}, 
    // TODO another time, make the password validator toxic and annoying for the user 
    password: {type: String, required: [true, "Password field is required."],
      validate: {
        validator: function (value) {
          return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(value);
        },
        message: "Password must contain at least one number, one uppercase letter, and one special character and be length of 8."

    }},
    offers: {
      type: Schema.Types.ObjectId, ref: 'Offer'
    }

}); 


userSchema.pre('save', function(next){
    let user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => next(err));
  });
  

userSchema.methods.comparePassword = function(inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
}


module.exports = mongoose.model('User', userSchema); 