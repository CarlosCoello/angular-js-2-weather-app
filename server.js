const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});

app.use( express.static(__dirname + '/dist') );
app.use( cors());
