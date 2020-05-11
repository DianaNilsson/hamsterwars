const {
    db
} = require('./../firebase');

const {
    Router
} = require('express');

const router = new Router();

//Get all hamsters
router.get('/', async (req, res) => {

    try {
        let hamsters = [];
        let snapShot = await db.collection('hamsters').get();

        snapShot.forEach(doc => {
            hamsters.push(doc.data());
        })

        res.send({
            hamsters: hamsters
        })
    } catch (err) {
        res.status(500).send(err);
    }
})


module.exports = router