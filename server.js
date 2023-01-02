const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // <== Will be created later
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3200; // <== You can change the port

server.use(middlewares);


// Set up a domainList and check against it:
const domainList = ['http://127.0.0.1:5500']

const corsOptions = {
  origin: function (origin, callback) {
    if (domainList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

// Then pass them to cors:
server.use(cors(corsOptions));


server.use(router);


server.listen(port);
