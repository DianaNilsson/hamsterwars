const {
    db
} = require('./../firebase');

const {
    Router
} = require('express');

const router = new Router();

//Get all hamsters
router.get('/', async (req, res) => {

    let hamsters = [];
    try {
        let snapShot = await db.collection('hamsters').get();

        //Loop through the snapShot array and push all documents to hamsters
        snapShot.forEach(doc => {
            hamsters.push(doc.data());
        })

        res.status(200).send({
            hamsters
        })

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})

//Get random hamsters
router.get('/random/:number?', async (req, res) => {

    try {

        let hamsters = [];
        let contestants = [];

        //First get all hamsters documents
        let snapShot = await db.collection('hamsters').get()

        //Loop through the snapShot array
        snapShot.forEach(doc => {
            hamsters.push(doc.data());
        })

        //Choose random/unique contestants (one or more)
        if (req.params.number) {
            for (let i = 0; i < req.params.number * 1; i++) {
                let rand = Math.floor(Math.random() * hamsters.length);
                let randomHamster = hamsters.splice(rand, 1);
                contestants.push(randomHamster[0]);
            }
        } else {
            for (let i = 0; i < 1; i++) {
                let rand = Math.floor(Math.random() * hamsters.length);
                contestants.push(hamsters[rand]);
            }
        }
        res.status(200).send(contestants)

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})

//Get hamster by id
router.get('/:id', async (req, res) => {

    try {
        let hamster;

        //Get hamster where id = req.params.id
        let snapShot = await db.collection('hamsters').where("id", "==", req.params.id * 1).get()

        //Loop through the snapShot array and set hamster
        snapShot.forEach(doc => {
            hamster = (doc.data())
        })

        res.status(200).send(hamster)

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }

})

module.exports = router