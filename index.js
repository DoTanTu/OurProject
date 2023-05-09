var express =  require('express');
var bodyparser = require('body-parser');
const cors = require('cors');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());


app.set('view engine', 'ejs');

require('./app/routes/book.router')(app);


app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000/');
});

