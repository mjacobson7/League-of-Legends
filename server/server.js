const express = require('express');
const app = express();
const port = process.env.PORT || 5400;

require('./routes')(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
