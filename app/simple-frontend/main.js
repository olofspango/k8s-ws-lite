const fastify = require('fastify')({logger: true});
const path = require('path');
const {Liquid} = require('liquidjs');
const POV = require('point-of-view');
const fetch = require('node-fetch')
const os = require('os')

const backendPort = process.env.BACKENDPORT || 11111;
const backendUrl = process.env.BACKENDURL || 'localhost'


const engine = new Liquid({
    root: path.join(__dirname, "views"),
    extname: ".liquid",
})

fastify.register(POV, {
    engine: {
      liquid: engine,
    },
})

fastify.get("/", async (request, response) => {
    const backendResponse = await fetch(`http://${backendUrl}:${backendPort}/`);
    const data = await backendResponse.json();

    return response.view('./views/index.liquid', {time: data.date, backendhostname: data.hostname, frontendhostname: os.hostname()});
})


fastify.listen(3000, '0.0.0.0', function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})  