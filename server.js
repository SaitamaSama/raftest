const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'ui-dist')));

app.listen(80, () => console.log('Listening at port 80'));
