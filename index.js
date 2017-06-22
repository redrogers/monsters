console.log(Date());
const app = require('./mainMonster.js');

app.listen(8080, function(err) {
  if(err) {console.error(err);}
  console.log('mainMonster is listening on 8080');
});

