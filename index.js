const express = require('express');
const app = express();

app.use('/assets', express.static('hamsters'))

app.listen(3000, () => {
    console.log('Server up and running!');
})