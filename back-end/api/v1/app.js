process.env.NODE_ENV = process.env.NODE_ENV || 'development';
global.config = require('config');
process.env.PORT = process.env.PORT || global.config.port;

const app = require('express')();
const port = process.env.PORT;
const rootUrl = global.config.root_url;
const routes = require('./routes');

app.get('/', (_, res) => res.redirect(rootUrl));

app.use(rootUrl, routes.Index);

app.get('*', (_, res) => res.sendStatus(404));

const server = app.listen(port, () => {

    console.log(`Server started listening on port ${port}`);
});
// export server for api testing
module.exports = { server };
