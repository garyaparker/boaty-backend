const express = require('express');

const app = express();
app.use((req, res) => res.send('hello boats'));

app.listen(process.env.PORT || 3000);
