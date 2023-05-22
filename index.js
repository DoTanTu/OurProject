var express =  require('express');
var bodyparser = require('body-parser');
const cors = require('cors');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());


app.set('view engine', 'ejs');

require('./app/routes/timKiem.router')(app);
require('./app/routes/thietBi.router')(app);
require('./app/routes/NCC.router')(app);
require('./app/routes/LoaiTB.router')(app);

const phieuXuatDataRoute = require('./app/routes/phieuxuatdata.route');
app.use(phieuXuatDataRoute);
const chitietthietbixuatRoute = require('./app/routes/chitietthietbixuat.router');
app.use('/chitietthietbixuat', chitietthietbixuatRoute);

require('./app/routes/phieuxuat.router')(app);
require('./app/routes/OptionValue.router')(app);

app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000/');
});

