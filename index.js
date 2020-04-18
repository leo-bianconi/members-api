const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

// Settings
app.set('views', './views');                           // views folder
app.set('view engine', 'pug');                         // template engine: PUG

// Init middleware
// app.use(logger);

// Body Parser Middleware (!!!)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Index routes
app.use('/', require('./routes/www/index'));

// Members API routes
app.use('/api/members', require('./routes/api/members'));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));