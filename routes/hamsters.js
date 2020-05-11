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

        res.status(200).send({
            hamsters: hamsters
        })
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})

//Get hamster by id
router.get('/:id', async (req, res) => {

    try {
        let hamster;

        //Find hamster where id = req.params.id
        let snapShot = await db.collection('hamsters').where("id", "==", req.params.id * 1).get()

        //Loop through the snapShot array
        snapShot.forEach(doc => {
            hamster = (doc.data())
        })

        res.status(200).send(hamster)

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})


//Update hamster object (games, wins & defeats)
router.put('/:id/results', async (req, res) => {

    try {

        let hamster;

        //Find hamster where id = req.params.id
        let snapShot = await db.collection('hamsters').where("id", "==", req.params.id * 1).get()

        //Update
        snapShot.forEach(doc => {
            hamster = (doc.data())

            //Update wins
            if (req.body.wins == 1) {
                hamster.wins += parseInt(req.body.wins);
                hamster.games += 1;
            }

            //Update defeats
            if (req.body.defeats == 1) {
                hamster.defeats += parseInt(req.body.defeats);
                hamster.games += 1;
            }

            //UPDATE
            db.collection('hamsters').doc(doc.id).update(hamster)

        })

        //Update stats total games

        res.status(200).send(hamster)

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})


module.exports = router