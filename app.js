const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT} link: http://localhost:3000`)
);
