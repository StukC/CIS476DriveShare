const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(express.static('public'));

app.get('/', (req, res) => res.send('DriveShare Home Page'));

app.listen(port, () => console.log(`DriveShare app listening at http://localhost:${port}`));
