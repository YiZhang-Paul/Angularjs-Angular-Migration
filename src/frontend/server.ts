import config = require('config');
import Express = require('express');
import { Request, Response } from 'express';
import path = require('path');

const app = Express();
const port = config.get<{ server: string }>('port').server;

app.disable('x-powered-by');

app.use(Express.static(path.join(__dirname, 'app')));

app.get('/*', (_: Request, res: Response) => {

    const index = path.join(__dirname, 'app', 'index.html');

    res.sendFile(index);
});

app.listen(port, () => {

    console.log(`Server started listening on port ${port}.`);
});
