// Imports
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config.js');
const serviceAccount = require('./serviceAccount.json');

// Import data.json to Firestore
const importJsonFile = async () => {
    try {
        await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
        console.log('Firebase Initialized');

        await firestoreService.restore('./data.json');
        console.log('Upload success');
    } catch (err) {
        console.error(err);
    }
};

importJsonFile();