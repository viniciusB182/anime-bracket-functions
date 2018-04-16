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
    res.redirect(303, dataBase.ref());
});

exports.getAllAnime = functions.https.onRequest((req, res) => {
    //const dataBase = admin.database();
    //var animeList = [];

    // dataBase.ref('/animes').once('value').then(function (snapshot) {
    //     //snapshot.forEach(function(childSnapshot) {
    //     animeList = snapshot.val();
    //     //console.log(childSnapshot.val());
    //     //});
    //     //console.log(snapshot.val());
    // });

    // dataBase.ref('/animes').on("child_added", function (snapshot) {
    //     var articleData = snapshot.val();
    //     animeList.push(articleData);
    //     //console.log(animeList);
    // });

    //console.log(animeList);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed);

    res.send(animes.Data);
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
