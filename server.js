const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});

app.use( express.static(__dirname + '/dist') );
app.use( cors({origin: 'https://young-sea-76737.herokuapp.com/'}));

const forceSSL = function(){
  return function(req, res, next){
    if(req.headers['x-forwarded-proto'] !== 'https'){
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  }
}

app.use(forceSSL());
