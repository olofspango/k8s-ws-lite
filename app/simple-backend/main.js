const os = require('os');
const restify = require('restify');
const port = process.env.PORT || 11111;

const server = restify.createServer({
  name: 'simple-be',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));

server.get('/', function (req, res, next) {
  console.log("GET /");
    res.send({ date: new Date(), hostname: os.hostname() });
  return next();
});

server.listen(port, '0.0.0.0', function () {
  console.log('%s listening at %s', server.name, server.url);
});
