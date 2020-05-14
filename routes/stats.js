const {
    db
} = require('./../firebase');

const {
    Router
} = require('express');

const router = new Router();

//Get all total number of games
router.get('/total', async (req, res) => {

    try {

        let totalGames;

        //Get total number of games from fs (collection games, document counter)
        let getTotalGames = await db.collection('games').doc('counter').get()

        //Set totalGames
        totalGames = getTotalGames.data().gameCount;

        res.status(200).send({
            totalGames
        })

    } catch {
        console.log(err)
        res.status(500).send(err);
    }

})


module.exports = router;