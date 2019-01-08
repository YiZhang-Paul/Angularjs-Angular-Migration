import { Request, Response } from 'express';
import Express = require('express');
import config = require('config');

const app = Express();
const port = config.get<{ server: string }>('port').server;

app.get('/', (_: Request, res: Response) => res.sendStatus(200));
app.get('*', (_: Request, res: Response) => res.sendStatus(404));

app.listen(port, () => {

    console.log(`Server started listening on port ${port}.`);
});
