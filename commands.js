// imports
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from "@discordjs/voice" // discord voice utilities
import ytdl from "ytdl-core" // create stream from youtube
import ytsr from "ytsr" // youtube search
import { client } from "./index.js" // bot obj

let connection = null
let player = null
let queue = []
let i = 0

// play audio
async function play (message) {
    console.log("play")

    // join voice channel
    connection = joinVoiceChannel({
        channelId: message.member.voice?.channel?.id,
        guildId: message.guildId,
        adapterCreator: message.guild.voiceAdapterCreator,
        selfDeaf: true
    })

    add(message)
    .then(() => {

        // player
        player = createAudioPlayer()
        const resource = createAudioResource(ytdl(queue[0].url))
        player.play(resource);
        connection.subscribe(player);

        // send song preview
        client.channels.cache.get(message.channelId).send(queue[0].title + "\n" + queue[i].url)

        // when song finish remove from queue
        player.on("stateChange", a => {
            if (a.status === "playing") queue.shift()
        })

        player.on("error", e => console.log("Error: " + e))
    })
    
}

async function add (message, type = "unshift") {
    // get song youtube url
    const song = message.content.substring(message.content.indexOf(" ")+1)
    const result = await ytsr(song, { gl: "IT", limit: 1 })
    // add to queue
    if (type === "unshift ") queue.unshift({ title: result.items[0].title, url: result.items[0].url })
    else queue.push({ title: result.items[0].title, url: result.items[0].url })
}

function next () {
    i++
    play
}

// stop audio
const stop = () => {
    console.log("stop")
    try { connection.destroy() }
    catch (e) {}
}

export {
    play,
    stop,
    add,
    next
}