const router = require('express').Router();
let Blog = require('../models/blog.model');

// Crud Operations

router.route('/').get((req, res) => {
  Blog.find()
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const article = req.body.article;
  const image = req.body.image;
  const video = req.body.video;
  const author = req.body.author;
  const date = Date.parse(req.body.date);

  const newBlog = new Blog({
    title,
    article,
    image,
    video,
    author,
    date,
  });

  newBlog.save()
  .then(() => res.json('Nouveau post enregistré !'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Blog.findById(req.params.id)
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post supprimé'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      blog.title = req.body.title;
      blog.article = req.body.article;
      blog.image = req.body.image;
      blog.video = req.body.video;
      blog.author = req.body.author;
      blog.date = Date.parse(req.body.date);

      blog.save()
        .then(() => res.json('Post mis à jour !'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;