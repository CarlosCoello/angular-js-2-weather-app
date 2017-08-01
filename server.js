const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://young-sea-76737.herokuapp.com/'
}

app.use( cors(corsOptions));
app.use( express.static(__dirname + '/dist') );

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
