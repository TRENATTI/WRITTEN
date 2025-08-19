/*

Downloads files from Firebase connected to Trenati Studio's 
public blacklist data used to ban inviduals in our games.

*/


// EXTERNAL REQUIRES

require("dotenv").config();

const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccountKey.json")
const fs = require("fs");


// FUNCTION

async function startApp() {
    var database = admin.database()
    var dataLocation = database.ref(process.env.DATA_LOCATION)
    dataLocation.once("value", function(data){
        console.log(data.val())
        const stringedData = JSON.stringify(data, null, 4);

      fs.writeFile('../LISTING/download.json', stringedData, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
    })
}

// STARTUP

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_RDBURL,
  databaseAuthVariableOverride: {
    uid: process.env.FIREBASE_AUTHVARIABLEOVERRIDE
  }
});

startApp()