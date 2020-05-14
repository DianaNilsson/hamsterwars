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

        //Get all hamster docs from fs
        let getHamsters = await db.collection('hamsters').get();

        //Push the hamster docs into hamsters array
        getHamsters.forEach(doc => {
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

        //Get all hamster docs from fs
        let getHamsters = await db.collection('hamsters').get()

        //Push the hamster docs into hamsters array
        getHamsters.forEach(doc => {
            hamsters.push(doc.data());
        })

        //Choose random/unique contestants (one or more)
        //Check that req.params.number exists
        if (req.params.number) {
            //check that req.params.number is a number
            if (req.params.number > 0) {
                for (let i = 0; i < req.params.number * 1; i++) {
                    let rand = Math.floor(Math.random() * hamsters.length);
                    let randomHamster = hamsters.splice(rand, 1);
                    contestants.push(randomHamster[0]);
                }
            } else {
                console.log('No valid number!');
            }
        } else {
            for (let i = 0; i < 1; i++) {
                let rand = Math.floor(Math.random() * hamsters.length);
                contestants.push(hamsters[rand]);
            }
        }

        //Check if hamsters is set and send response
        if (contestants[0] !== undefined) {
            res.status(200).send(contestants)
        } else {
            res.status(404).send('This is no valid number, please choose the number of random hamsters that you want to see')
        }

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})

//Get hamster by id
router.get('/:id', async (req, res) => {

    try {
        let hamster;

        //Get hamster docs where id = req.params.id
        let getHamsters = await db.collection('hamsters').where("id", "==", req.params.id * 1).get()

        //Set hamster
        getHamsters.forEach(doc => {
            hamster = (doc.data())
        })

        //Check if the hamster is set and send response
        if (hamster !== undefined) {
            res.status(200).send(hamster)
        } else {
            res.status(404).send('This id does not match any of the hamsters id:s, please try again!');
        }


    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }

})

module.exports = router