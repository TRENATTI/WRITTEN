/*

Bans users from groups.

*/


// EXTERNAL REQUIRES

import fetch from "node-fetch"
import * as dotenv from "dotenv"
import * as fs from "fs"
dotenv.config()

const user_data = fs.readFileSync('../LISTING/index.json', 'utf8')
const group_data = fs.readFileSync('./groups.json', 'utf8')

const cookie = process.env.RBX_COOKIE

let xCsrfToken = ""


// EXECUTTION

var parsedObject = JSON.parse(user_data)
var GroupIds = JSON.parse(group_data)
 for (const key in parsedObject.users) {
     if (parsedObject.users.hasOwnProperty(key)) { 
        const ids = parsedObject.users[key].associatedAccounts.robloxAccounts = parsedObject.users[key].associatedAccounts.robloxAccounts.split(',')
        for (const UserId in ids) { 
            for (const GroupId in GroupIds) {
                var GET_URL = `https://groups.roblox.com/v1/groups/${GroupId}/bans`
                var POST_URL =`https://groups.roblox.com/v1/groups/${GroupId}/bans/${ids[UserId]}`
                var DELETE_URL =`https://groups.roblox.com/v1/groups/${GroupId}/bans/${UserId}`

                const rbxRequest = async (verb, url, body) => {
                    const response = await fetch(url, {
                        headers: {
                            Cookie: `.ROBLOSECURITY=${cookie}`,
                            "x-csrf-token": xCsrfToken,
                            "Content-Length": body?.length.toString() || "0"
                        },
                        method: "POST",
                        body: body || ""
                    })
                
                    if (response.status == 403) {
                        if (response.headers.has("x-csrf-token")) {
                            xCsrfToken = response.headers.get("x-csrf-token")
                            return rbxRequest(verb, url, body)
                        }
                    }
                
                    return response
                }
                
                const response = await rbxRequest("POST", "https://auth.roblox.com/v2/session/refresh")
                console.log(response.status)
                
                const banresponse = await rbxRequest("POST", POST_URL)
                console.log(response.status)
           }
        }
    }
 }


