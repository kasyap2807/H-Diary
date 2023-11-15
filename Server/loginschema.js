const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the diary entry schema
const diaryEntrySchema = new Schema({
  date: {
    type: String,
    required: true
  },
  diary: {
    type: String,
    required: true
  }
});

const ImageUploadSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc:{
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})

// Define the user schema
const userSchema = new Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  diary: [diaryEntrySchema],  // Embedding the diaryEntrySchema as an array
  Image: [ImageUploadSchema]
});

// Create a model for the User schema
const User = mongoose.model('DiaryApp-Maindb', userSchema);

module.exports = User;
