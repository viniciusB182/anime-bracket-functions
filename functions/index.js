const functions = require('firebase-functions');
const admin = require('firebase-admin');
const animes = require('./data/animes');
const express = require('express');
const cors = require('cors');
const app = express();

//enable for all origins
app.use(cors());

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

exports.pushWinner = functions.https.onRequest((req, res) => {  
    const dataBase = admin.database();

    const original = req.query.text;

    dataBase.ref('/winners').push({ nome: original});

    res.sendStatus(202);
});

exports.getAllAnime = functions.https.onRequest((req, res) => {  
    const dataBase = admin.database();
    var animeList = [];

    dataBase.ref('/animes').on("value", function (snapshot) {
        snapshot.forEach((anime) => { animeList.push(anime) });

        res.send(animeList);
    });
    
});
