const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});

app.use( express.static(__dirname + '/dist') );
app.use( cors());

const forceSSL = function(){
  return function(req, res, next){
    if(req.headers['x-forwarded-proto'] !== 'https'){
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  }
}

app.use(forceSSL());

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})
