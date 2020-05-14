const dotenv = require('dotenv')
dotenv.config()

const express = require('express');
const app = express();

//Serve static images 
app.use('/assets', express.static('hamsters'))

// alla post.body > json
app.use(express.json());


//Auth middleware
let auth = (req, res, next) => {

    const APIKey = process.env.KEY;

    if (req.method !== 'GET') {
        if (APIKey === req.headers['authorization']) {
            next();
        } else {
            res.status(403).send({
                msg: 'Cant find the correct key'
            })
        }
    } else {
        next();
    }
}

app.use(auth)

//Routes
const hamstersRoute = require('./routes/hamsters');
const chartsRoute = require('./routes/charts');
const gamesRoute = require('./routes/games');
const statsRoute = require('./routes/stats');

app.use('/hamsters', hamstersRoute);
app.use('/charts', chartsRoute);
app.use('/games', gamesRoute);
app.use('/stats', statsRoute);


//Listen to port
app.listen(3000, () => {
    console.log('Server up and running!');
})