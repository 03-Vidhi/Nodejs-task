const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  active: Boolean,
  location: {
    latitude: Number, 
    longitude: Number 
  }
});

module.exports = mongoose.model('Post', postSchema);
