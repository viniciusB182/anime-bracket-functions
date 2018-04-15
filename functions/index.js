const functions = require('firebase-functions');
const admin = require('firebase-admin');
const animes = require('./data/animes');

admin.initializeApp(functions.config().firebase);

exports.createNewDatabase = functions.https.onRequest((req, res) => {
    const dataBase = admin.database();

    dataBase.ref('/animes').remove();

    animes.Data.map(a => {
        dataBase.ref('/animes').push(a);
    });
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, dataBase.ref());
});

exports.allLogoUrl = functions.https.onRequest((req, res) => {
    const dataBase = admin.database()
    let logoUrlList;

    dataBase.ref('/animes').map(a => {
        console.log(a);
    });

    // animes.Data.map(a => {
    //     a.logo = dataBase.ref().child(a.logo);
    //     logoUrlList.push(a);
    // });

    // res = logoUrlList;

    return res;
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
