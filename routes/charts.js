const {
    db
} = require('./../firebase');

const {
    Router
} = require('express');

const router = new Router();

//Get top 5 winning hamsters
router.get('/top', async (req, res) => {

    try {
        let topHamsters = [];

        //Find hamsters where id = req.params.id
        let getHamsters = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get()

        //Push top 5 winner to topHamsters array
        getHamsters.forEach(doc => {
            topHamsters.push(doc.data());
        })

        res.status(200).send(topHamsters)

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})

//Get bottom 5 hamsters
router.get('/bottom', async (req, res) => {

    try {
        let mostDefeatedHamsters = [];

        //Find hamsters where id = req.params.id
        let getHamsters = await db.collection('hamsters').orderBy('defeats', 'desc').limit(5).get()

        //Push top 5 winner to topHamsters array
        getHamsters.forEach(doc => {
            mostDefeatedHamsters.push(doc.data());
        })

        res.status(200).send(mostDefeatedHamsters)

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})


module.exports = router;