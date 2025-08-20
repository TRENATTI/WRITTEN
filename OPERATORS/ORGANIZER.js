/*

Formats files from Firebase connected to Trenati Studio's 
public blacklist data used to ban inviduals in our games.

*/


// EXTERNAL REQUIRES

const fs = require("fs");

const data = fs.readFileSync('../LISTING/download.json', 'utf8')


// EXECUTTION

var parsedObject = JSON.parse(data)

 for (const key in parsedObject.users) {
     if (parsedObject.users.hasOwnProperty(key)) { 
            parsedObject.users[key].associatedAccounts.robloxAccounts = parsedObject.users[key].associatedAccounts.robloxAccounts.replace(/[^0-9,]/g, '')
            parsedObject.users[key].associatedAccounts.discordAccounts = parsedObject.users[key].associatedAccounts.discordAccounts.replace(/[^0-9,]/g, '')
            if (parsedObject.users[key].permanent == true) {
                parsedObject.users[key].expiry = -1
            } else {
                parsedObject.users[key].expiry = "Tier Unset"
            }
        }
 }

var stringifiedObject = JSON.stringify(parsedObject, null, 4);
console.log(stringifiedObject)


 fs.writeFile('../LISTING/index.json', stringifiedObject, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!")
 });