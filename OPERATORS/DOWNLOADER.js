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


// STARTUP


