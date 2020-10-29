const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');

router.get('/admin', ensureAuthenticated, (req, res) =>
  res.render('admin', {
    msg: 'Espace administrateur'
  })
);

// Exemple : cacher des infos privées sur une route protégée
router.get('/posts', ensureAuthenticated, (req, res) =>
  res.render('posts', {
    posts_msg: 'Infos privées',
    private_data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porttitor orci a odio lobortis luctus. Phasellus et varius metus. Nulla facilisi. Maecenas in quam risus. Ut quis semper eros. Aliquam quis venenatis nibh. Nam dapibus risus ac nisi hendrerit accumsan. Curabitur faucibus purus id nulla sagittis, eget blandit nibh eleifend. Quisque bibendum orci sed egestas auctor. Integer odio mi, scelerisque eget convallis vitae, sollicitudin a orci. Mauris vitae elementum lacus. Quisque quis elementum velit. Pellentesque convallis lorem dui, sit amet pulvinar massa vulputate eu. Aenean non turpis porta eros pretium fermentum. Aliquam interdum libero at erat malesuada pellentesque. Nulla nec purus nec odio lacinia rutrum at vitae nibh.',
  })
);

// Exemple : protéger l'accès aux données Schema User Mongo
router.get('/getAllUsers', ensureAuthenticated, (req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;