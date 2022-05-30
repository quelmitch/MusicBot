import 'dotenv/config'
import Discord from 'discord.js'
import { play, stop } from './commands.js' 
 
const botID = '980913652775395328'
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', "GUILD_VOICE_STATES"] });

client.login(process.env.TOKEN);

const commandList = [
    {
        command: 'play',
        reply: 'play',
        action: play
    },
    {
        command: 'stop',
        reply: 'stop',
        action: stop
    }
]

client.once('ready', () => {
    console.log(`Ready`)
})

client.on('messageCreate', message => {
    // initial check
    if (message.content[0] !== '-' || message.author.id === botID) return

    let channelId = message.member.voice.channel?.id

    let command = message.content.substring(1).split(' ')
    const i = commandList.findIndex(e => e.command === command[0])
    if (i === -1 ) return

    // execute command
    commandList[i].action(message)

});