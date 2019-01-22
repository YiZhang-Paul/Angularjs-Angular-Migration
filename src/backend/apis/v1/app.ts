import config = require('config');
import Express = require('express');
import { Request, Response } from 'express';

import '../../mongo-database';
import '../../redis-database';

import routes from './routes';

const app = Express();
const port = config.get<{ api: string }>('port').api;
const rootUrl = config.get<string>('root_url');

app.disable('x-powered-by');

app.get('/', (_: Request, res: Response) => res.redirect(rootUrl));

app.use((_: Request, res: Response, next) => {
    // TODO: use cors
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});

app.use(rootUrl, routes.index);
app.use(`${rootUrl}/games`, routes.game);
app.use(`${rootUrl}/users`, routes.user);

app.get('*', (_: Request, res: Response) => res.sendStatus(404));

// export server for api testing
export const server = app.listen(port, () => {

    console.log(`API started listening on port ${port}.`);
});
