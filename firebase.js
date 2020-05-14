const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hamsterwars-project.firebaseio.com"
});

const auth = admin.auth();
const db = admin.firestore();
const fieldValue = admin.firestore.FieldValue;

module.exports = {
    auth,
    db,
    fieldValue
}