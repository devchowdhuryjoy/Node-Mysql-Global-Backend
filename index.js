const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const registerRoute = require('./routes/registerRoute');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Use registration route
app.use('/', registerRoute);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
