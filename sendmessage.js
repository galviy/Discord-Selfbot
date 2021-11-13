const fetch = require('node-fetch');
const config = require("./config2.json");

token = config.token;
serverid = config.serverid;

async function Message(message) {
    try {
        fetch(`https://discord.com/api/v9/channels/${config.MessageID}/messages`, {
            body: JSON.stringify({
                'content': message,
            }),
            method: "POST",
            headers: {
                "Host": "discord.com",
                "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Mobile Safari/537.36",
                "Content-Type": "application/json; charset=UTF-8",
                "authorization": config.token,
            }

        }).then(resp => resp.json()).then(response => {
            if (response.message == "401: Unauthorized") {
                console.log(`${response.code} | Invalid token provided`)
            } else if (response.message == "404: Not Found") {
                console.log(`${response.code} | Couldn't found message's ID.`)
            } else if (response.message == "Missing Access") {
                console.log(`${response.code} | Something went wrong token missing access.`)
            } else if (response.code == 50007) {
                console.log("50007: Cannot send messages to this user")
            } else if (response.code == 20028) {
                console.log(`Discord rate limit: ${response.retry_after}`)
            } else if (response.type == 0) {
                console.log(`${response.code}\nDate: ${response.timestamp}\nMessage: ${response.content}`)
            }
        })
    } catch (e) {
        console.log(e)
    }
}

async function channel(name) {
    try {
        let channels = {
            "name": name
        }
        fetch("https://discord.com/api/v9/guilds/" + guildid + "/channels", {
            method: "POST",
            body: JSON.stringify(channels),
            headers: {
                "Host": "discord.com",
                "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Mobile Safari/537.36",
                "Content-Type": "application/json; charset=UTF-8",
                "content-length": "999",
                "authorization": config.token
            }
        }).then(resp => resp.json()).then(response => {
            if (response.code == 50013) {
                console.log(response.message)
            } else if (response.global == true) {
                console.log("Discord cooldown (rate limit): " + response.retry_after)
            } else {
                console.log("Created channel: " + response.name + "\nChannel ID: " + response.id)
            }
        }).catch(err => console.log("[Fetch] ECONNRESET"))
    } catch (e) {
        console.log(e)
    }

}

module.exports = {
    Message: Message,
    channel: name,
}
