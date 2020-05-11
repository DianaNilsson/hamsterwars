const express = require('express');
const app = express();

//Serve static images 
app.use('/assets', express.static('hamsters'))

// alla post.body > json
app.use(express.json());

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