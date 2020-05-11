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
        //anropa fb, hämta doc med :id
        let hamster = await db.collection('hamsters').doc(req.params.id).get()
        res.status(200).send(hamster.data())
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }

})

// //Get hamster by id (with Promises)
// router.get('/:id', (req, res) => {
//     let snapShot = db.collection('hamsters').doc(req.params.id).get()
//         .then(doc => {
//             res.send(doc.data());
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         });
// })

module.exports = router