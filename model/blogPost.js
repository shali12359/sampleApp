const mongoose = require('mongoose');

// MONGO SCHEMA
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now()
  }
});

// MODEL
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
