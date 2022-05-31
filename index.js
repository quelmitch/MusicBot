import "dotenv/config"
import Discord from "discord.js"
import { play, stop, add, next } from "./commands.js" 
 
const botID = "980913652775395328"
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });

client.login(process.env.TOKEN);

const commandList = [
    {
        command: "play",
        short: "p",
        action: play
    },
    {
        command: "stop",
        short: "s",
        action: stop
    },
    {
        command: "add",
        short: "a",
        action: add
    },
    {
        command: "queue",
        short: "q",
        action: ""
    },
    {
        command: "next",
        short: "n",
        action: next
    }
]

client.once("ready", () => {
    console.log(`Ready`)
})

client.on("messageCreate", message => {
    // initial check
    if (message.content[0] !== "-" || message.author.id === botID) return

    let command = message.content.substring(1).split(" ")
    const i = commandList.findIndex(e => e.command === command[0] || e.short === command[0])
    if (i === -1 ) return

    // execute command
    commandList[i].action(message, "push")
})

export {
    client
}