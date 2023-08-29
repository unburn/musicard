(async () => {
    const { musicCard } = require("../build/index");
    const fs = require("fs");

    // Create a new music card
    const card = new musicCard()
        .setName("Makeba (Ian Asher Remix)")
        .setAuthor("By Ian Asher")
        .setColor("auto") // or hex color without # (default: auto) (auto: dominant color from thumbnail)
        .setBrightness(50)
        .setThumbnail("https://indexmusic.it/wp-content/uploads/2023/07/jain-makeba-ian-asher-remix.jpg")
        .setProgress(0)
        .setStartTime("0:00")
        .setEndTime("3:00")

    // Build the card
    const cardBuffer = await card.build();

    // Write the card to a file
    fs.writeFileSync(`musicCard.png`, cardBuffer);
    console.log("Done!");
})()