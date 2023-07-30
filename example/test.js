const { musicCard } = require("../build/index");
const fs = require("fs");

musicCard({
    name: "Faded",
    author: "By Alan Walker",
    color: "ea00ff", // remove # from hex code
    thumbnail: "https://raw.githubusercontent.com/A3PIRE/musicard.js/main/asset/thumbnail-preview.jpg",
    progress: 90, // 0 - 100
    starttime: "0:00",
    endtime: "3:00",
    mode: "pause"
}).then((buffer) => {
    // Generate a card and save it to a file
    fs.writeFileSync("example/musicCard.png", buffer)
    console.log("Your music card has been generated!")
})