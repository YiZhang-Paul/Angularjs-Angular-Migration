import { Request, Response } from 'express';
import Express = require('express');
import config = require('config');
import routes from './routes';
import '../../database';

const app = Express();
const port = config.get<{ api: string }>('port').api;
const rootUrl = config.get<string>('root_url');

app.get('/', (_: Request, res: Response) => res.redirect(rootUrl));

app.use(rootUrl, routes.index);
app.use(`${rootUrl}/users`, routes.user);

app.get('*', (_: Request, res: Response) => res.sendStatus(404));

// export server for api testing
export const server = app.listen(port, () => {

    console.log(`API started listening on port ${port}.`);
});
