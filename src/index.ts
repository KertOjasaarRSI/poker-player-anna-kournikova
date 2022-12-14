/// <reference path='../typings/index.d.ts'/>
import express, { Request } from 'express';
import bodyParser from 'body-parser';
import Player from './Player';

const VERSION = "69.420";

const app = express();
const player = new Player();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', ({ }, res) => res.send(200, 'OK'));

app.post('/', (req, res) => {
    console.log('Incoming request', {
        action: req.body.action,
        game_state: req.body.game_state,
    });

    if (req.body.action === 'bet_request') {
        player.betRequest(JSON.parse(req.body.game_state), bet => res.status(200).send(bet.toString()));
    } else if (req.body.action === 'showdown') {
        player.showdown(JSON.parse(req.body.game_state));
        res.status(200).send('OK');
    } else if (req.body.action === 'version') {
        res.status(200).send(VERSION);
    } else {
        res.status(200).send('OK');
    }
});

const port = parseInt(process.env['PORT'] || 1337);
const host = "0.0.0.0";
app.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
