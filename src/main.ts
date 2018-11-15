import { Routing } from './route';

import { Logging } from './services/logging.service';

declare var require:any;

var express = require('express');
var process = require('process');
var mongoose = require('mongoose');
var mongoClient = require("mongodb").MongoClient;

var vEnv = require('./config/mode.json')['mode'];
var bodyParser = require('body-parser');
var vValidator = require('validator');
var config = require('./config/config.json')[vEnv];
var multipart = require('connect-multiparty');
var path = require('path');
var multipartMiddleware = multipart({ uploadDir: path.join('./img-temp-dir')});

var app = express();
var router = express.Router();
var port: number = process.env.PORT || config.port || 4000; //configuration of port

let whiteList = (origin:string) => {
    var data = config.whitelist_domain; //whitelist
    for (let i in data) {
        if (origin == data[i])
            return origin;
    }
    if (data.length == 0)
        return null;
    else
        return data[0];
}
// connect to mongodb
// mongoose.connect('mongodb://heroku_kc4xthmk:sg2tpc5h6l735m5damrq5oi50n@ds061391.mlab.com:61391/heroku_kc4xthmk');
// mongoClient.connect('mongodb://25b5aa57-0ee0-4-231-b9ee:R0TsYM7CSLv4RGcV434jnamcZoiq9QqaI8dTi1dE8nS9C9UZ4xLJVQWauKLzvqlurdB1E5bTVaw6fxyB5Rr0aw==@25b5aa57-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true', {useNewUrlParser: true } ).then(() => console.log('MongoDB Connected'))
// .catch((err:any) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req:any, res:any, next:any) {
    //update
    let origin = req.get('origin');
    let vOrigin = /*origin;*/whiteList(origin);
    res.header("Access-Control-Allow-Origin",vOrigin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept,authorization,Proxy-Authorization,X-session,appVersion");
    res.header("Access-Control-Expose-Headers", "accessToken,created,Content-Disposition");
    res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST");
    res.header("X-XSS-Protection", "1");
    res.header("X-Content-Type-Options", "nosniff");
    res.header("Content-Security-Policy", "object-src 'none';img-src 'self';media-src 'self';frame-src 'none';font-src 'self' data:;connect-src 'self';style-src 'self'");

    Logging('incoming request host : ' + req.headers.host);
    Logging('Incoming request method : ' + req.method);
    Logging('Incoming request path : ' + req.path);
    Logging('cookies : ' + JSON.stringify(req.cookies));

    next();
});
Routing(router, multipartMiddleware);
app.use('/api', router);
app.listen(port);
Logging('listening : ' + port);
