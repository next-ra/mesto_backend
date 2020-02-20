const express = require('express');
const path = require('path');
const PORT = require('./config');

const routes = require('./routes/routes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT} link: http://localhost:3000`)
);
