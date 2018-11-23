const express = require('express');
const app = express();
const path = require('path')
const port = process.env.PORT || 5400;

app.use( express.static( `${__dirname}/../client/build` ) );


require('./routes')(app);

app.get('*', (req, res)=>{
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    })

app.listen(port, () => console.log(`Listening on port ${port}`));
