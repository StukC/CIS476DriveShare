const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => res.send('DriveShare Home Page'));

app.listen(port, () => console.log(`DriveShare app listening at http://localhost:${port}`));
