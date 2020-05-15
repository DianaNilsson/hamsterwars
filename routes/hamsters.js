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

        let getHamsters = await db.collection('hamsters').get();

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

    let statusCode = 500

    try {

        let hamsters = [];
        let contestants = [];

        let getHamsters = await db.collection('hamsters').get()

        getHamsters.forEach(doc => {
            hamsters.push(doc.data());
        })

        //Choose random and unique contestants (one or more)
        //Check if param is set
        if (req.params.number) {

            //Check that req.params.number is a valid number
            if (req.params.number > 0 && req.params.number <= hamsters.length) {
                for (let i = 0; i < req.params.number * 1; i++) {
                    let rand = Math.floor(Math.random() * hamsters.length);
                    let randomHamster = hamsters.splice(rand, 1);
                    contestants.push(randomHamster[0]);
                }
            } else {
                statusCode = 404;
                throw 'This is no valid number, please choose the number of random hamsters that you want to see';
            }
        }
        //If no param is set, choose one 
        else {
            for (let i = 0; i < 1; i++) {
                let rand = Math.floor(Math.random() * hamsters.length);
                contestants.push(hamsters[rand]);
            }
        }

        res.status(200).send(contestants)

    } catch (err) {
        console.log(err)
        res.status(statusCode).send(err);
    }
})

//Get hamster by id
router.get('/:id', async (req, res) => {

    let statusCode = 500;

    try {
        let hamster;

        let getHamsters = await db.collection('hamsters').where("id", "==", req.params.id * 1).get()

        getHamsters.forEach(doc => {
            hamster = (doc.data())
        })

        //Check if the hamster is set and send response
        if (hamster !== undefined) {
            res.status(200).send(hamster)
        } else {
            statusCode = 404;
            throw 'This id does not match any of the hamsters id:s, please try again!';
        }
    } catch (err) {
        console.log(err)
        res.status(statusCode).send(err);
    }
})

module.exports = router