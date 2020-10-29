const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

// Crud Operations **
const cors = require('cors');
const path = require('path');

// Express App
const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true , useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// ** Crud Operations
app.use(cors());
app.use(express.json());

// ** Crud Routes
const blogRouter = require('./routes/blog.route');
app.use('/blog.route', blogRouter);

// ** Home Path
app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index.js'));
app.use('/connexion', require('./routes/connexion.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Serveur fonctionnel sur le PORT ${PORT}`));