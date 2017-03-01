var app = require('koa')()
    , koa = require('koa-router')()
    , logger = require('koa-logger')
    , json = require('koa-json')
    , views = require('koa-views')
    , onerror = require('koa-onerror');

var MongoStore = require('koa-generic-session-mongo');
var session = require('koa-generic-session');

var router = require('./lib/router');
var config = require('./config');

// global middlewares
app.use(views('views', {
    root: __dirname + '/views',
    default: 'ejs'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

// session
app.use(session({
    store: new MongoStore({url: config.MONGO_URL})
}));

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(router.routes());

app.on('error', function(err, ctx){
    logger.error('server error', err, ctx);
});

module.exports = app;
