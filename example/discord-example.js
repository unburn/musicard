const { Client, AttachmentBuilder } = require("discord.js");
const { Manager } = require("erela.js");
const { musicCard } = require("musicard");

const client = new Client({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
        "GuildVoiceStates",
        "MessageContent"
    ]
});

const nodes = [
    {
        host: "localhost",
        password: "youshallnotpass",
        port: 2333,
        secure: false
    }
]

client.manager = new Manager({
    nodes,
    send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    }
});

client.manager.on("nodeConnect", node => {
    console.log(`Node "${node.options.identifier}" connected.`)
})

client.manager.on("nodeError", (node, error) => {
    console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)
})

client.once("ready", () => {
    client.manager.init(client.user.id);
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("raw", d => client.manager.updateVoiceState(d));

client.on("messageCreate", async message => {
    if (!message.content.startsWith("!") || !message.guild || message.author.bot) return;

    const [command, ...args] = message.content.slice(1).split(/\s+/g);

    if (command === "nowplaying") {
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.reply("there is no player for this guild.");

        console.log(player);
        function formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        }

        const musicLength = player.position;
        const starttime = formatTime(Math.round(musicLength / 1000));
        const endtime = formatTime(Math.round(player.queue.current.duration / 1000));

        const position = (player.position * 100 / player.queue.current.duration).toFixed(1);

        const buffer = await musicCard({
            name: player.queue.current.title,
            author: player.queue.current.author,
            color: "00fe9b", // remove # from hex code
            thumbnail: player.queue.current.displayThumbnail("mqdefault"),
            progress: `${position}`,
            starttime: `${starttime}`,
            endtime: `${endtime}`,
            mode: "play"
        })

        const attachment = new AttachmentBuilder(buffer, "musicCard.png");

        return message.channel.send({
            files: [attachment]
        })
    }

    if (command === "play") {
        if (!message.member.voice.channel) return message.reply("you need to join a voice channel.");
        if (!args.length) return message.reply("you need to give me a URL or a search term.");

        const search = args.join(" ");
        let res;

        try {
            res = await client.manager.search(search, message.author);
            if (res.loadType === "LOAD_FAILED") throw res.exception;
            else if (res.loadType === "PLAYLIST_LOADED") throw { message: "Playlists are not supported with this command." };
        } catch (err) {
            return message.reply(`there was an error while searching: ${err.message}`);
        }

        if (res.loadType === "NO_MATCHES") return message.reply("there was no tracks found with that query.");

        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
        });

        player.connect();
        player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused && !player.queue.size) player.play()

        return message.reply(`enqueuing ${res.tracks[0].title}.`);
    }
});

client.manager.on("trackStart", async (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    const musicLength = track.duration;
    const formattedLength = formatTime(Math.round(musicLength / 1000));

    const card = new musicCard()
        .setName(track.title)
        .setAuthor(track.author)
        .setColor("03cdff")
        .setThumbnail(await track.displayThumbnail("mqdefault"),)
        .setProgress(0)
        .setStartTime("0:00")
        .setEndTime(formattedLength)
        .setMode("play")

    const buffer = await card.build();

    const attachment = new AttachmentBuilder(buffer, { name: `musicard.png` });

    const embed = new EmbedBuilder()
        .setColor("03cdff")
        .setImage(`attachment://musicard.png`)

    await channel.send({
        embeds: [embed],
        files: [attachment]
    })
});

client.manager.on("queueEnd", player => {
    const channel = client.channels.cache.get(player.textChannel);
    channel.send("Queue has ended");
    player.destroy();
});

client.login("TOKEN")