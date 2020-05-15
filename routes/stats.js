const { db } = require('./../firebase');

const { Router } = require('express');

const router = new Router();

//Get total number of games
router.get('/total', async (req, res) => {

    try {
        let totalGames;

        //Get total number of games from fs (no need to return all games, instead I use a counter)
        let getTotalGames = await db.collection('games').doc('counter').get()

        //Set totalGames
        totalGames = getTotalGames.data().gameCount;

        res.status(200).send({
            totalGames
        })

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})

//Get funny hamster facts
router.get('/facts', async (req, res) => {

    try {

        let age = []
        let favFood = []
        let favActivities = []

        let getHamsters = await db.collection('hamsters').get()

        //Push hamster properties into different arrays
        getHamsters.forEach(hamster => {
            age.push(hamster.data().age)
            favFood.push(hamster.data().favFood)
            favActivities.push(hamster.data().loves)
        })

        //Get average age
        function sumAge(total, num) {
            return (total + num);
        }
        let averageAge = age.reduce(sumAge) / age.length

        //Get most popular food
        var distinctFood = {};
        var mostPopularFood = {
            count: 0,
            food: null
        };
        for (let i = 0; i < favFood.length; i++) {
            //If property does not exist in distinctFood create new property and asign 1
            if (!distinctFood.hasOwnProperty(favFood[i])) {
                distinctFood[favFood[i]] = 1;
            }
            // If property exist then increment its value
            else {
                distinctFood[favFood[i]]++;
            }

            // Set mostPopularFood to the object with highest count
            if (distinctFood[favFood[i]] > mostPopularFood.count) {
                mostPopularFood.count = distinctFood[favFood[i]];
                mostPopularFood.food = favFood[i];
            }
        }

        //Get most popular activity
        var distinctActivity = {};
        var mostPopularActivity = {
            count: 0,
            activity: null
        };
        for (let i = 0; i < favActivities.length; i++) {
            //If property does not exist in distinctActivity create new property and asign 1
            if (!distinctActivity.hasOwnProperty(favActivities[i])) {
                distinctActivity[favActivities[i]] = 1;
            }
            // If property exist then increment its value
            else {
                distinctActivity[favActivities[i]]++;
            }

            // Set mostPopularActivity to the object with highest count
            if (distinctActivity[favActivities[i]] > mostPopularActivity.count) {
                mostPopularActivity.count = distinctActivity[favActivities[i]];
                mostPopularActivity.activity = favActivities[i];
            }
        }

        res.status(200).send({
            averageAge,
            mostPopularFood: mostPopularFood.food,
            mostPopularActivity: mostPopularActivity.activity
        })

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})


module.exports = router;