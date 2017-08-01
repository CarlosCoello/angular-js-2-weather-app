const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});

const corsOptions = {
  origin: 'https://api.darksky.net/forecast/8faa7b95e3a14d8e2f746aba2c2cbecf/',
}

app.use( cors(corsOptions));
app.use( express.static(__dirname + '/dist') );
