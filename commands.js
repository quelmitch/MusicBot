import { joinVoiceChannel, createAudioPlayer, createAudioResource } from '@discordjs/voice';

let connection = null;

// play audio
const play = (message) => {
    console.log('play')

    connection = joinVoiceChannel({
        channelId: message.member.voice?.channel?.id,
        guildId: message.guildId,
        adapterCreator: message.guild.voiceAdapterCreator,
        selfDeaf: true
    })

    let song = message.content
    song = message.content.substring(song.indexOf(' ')+1)

    /* const player = createAudioPlayer();
    const resource = createAudioResource('audio.mp3');
    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
        stop()
    }); */
}

// stop audio
const stop = () => {
    console.log('stop')
    try {
        connection.destroy()
    } catch (e) {}
}

export {
    play,
    stop
}