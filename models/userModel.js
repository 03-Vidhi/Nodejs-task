const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String
});

// Hash the password before saving to the database
userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    
   
    
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

//  compare passwords
userSchema.methods.validPassword = async function(password) {
  try {
    console.log("password", password)
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = mongoose.model('User', userSchema);
