const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String },
  article: { type: String },
  image: { type: String },
  video: { type: String },
  author: { type: String },
  date: { type: Date },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;