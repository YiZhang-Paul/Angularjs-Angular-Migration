import config = require('config');
import Express = require('express');
import { Request, Response } from 'express';

const app = Express();
const port = config.get<{ server: string }>('port').server;

app.get('/', (_: Request, res: Response) => res.sendStatus(200));
app.get('*', (_: Request, res: Response) => res.sendStatus(404));

app.listen(port, () => {

    console.log(`Server started listening on port ${port}.`);
});
