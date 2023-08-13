(async () => {
    const { musicCard } = require("../build/index");
    const fs = require("fs");

    // Create a new music card
    const card = new musicCard()
        .setName("Makeba (Ian Asher Remix)")
        .setAuthor("By Ian Asher")
        .setColor("auto") // or hex color without # (default: auto) (auto: dominant color from thumbnail)
        .setBrightness(50)
        .setThumbnail("https://th.bing.com/th/id/OIP.TReQbbMLSu6fwHvqxIUS0gHaHa?pid=ImgDet&rs=1")
        .setProgress(0)
        .setStartTime("0:00")
        .setEndTime("3:00")
        .setMode("pause")

    // Build the card
    const cardBuffer = await card.build();

    // Write the card to a file
    fs.writeFileSync("musicCard.png", cardBuffer);
    console.log("Done!");
})()