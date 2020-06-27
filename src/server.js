const { Model } = require('objection');
const hapi = require('hapi');

const config=require('./config/config');
const routes=require('./routes/routes');

const server = hapi.server({    
    port: config.server.port,    
    host: config.server.host
});

//routes
server.route(routes.routeConfig);

const bootUpServer = async () => {    
  await server.register({
    plugin: require('hapi-cors'),
    options: {
      origins: ['http://localhost:4200']
    }
  });
  await server.start();   
  console.log(`Server is running at ${server.info.uri}`);
  process.on('unhandledRejection', (err) => {       
    console.log(err); 
    process.exit(1);    
  })
}
bootUpServer();
