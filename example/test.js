const { musicCard } = require("../build/index");
const fs = require("fs");

// Create a new music card
const card = new musicCard()
    .setName("Faded")
    .setAuthor("By Alan Walker")
    .setColor("03cdff")
    .setThumbnail("https://th.bing.com/th/id/OIP.WcM-Snz7PSuKGlrUqzsENgHaHa?pid=ImgDet&rs=1")
    .setProgress(60)
    .setStartTime("0:00")
    .setEndTime("3:00")
    .setMode("play")

// Build the card
const cardBuffer = card.build();

// Write the card to a file
fs.writeFileSync("musicCard.png", cardBuffer);