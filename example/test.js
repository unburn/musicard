(async () => {
    const { musicCard } = require("musicard");
    const fs = require("fs");

    // Create a new music card
    const card = new musicCard()
        .setName("Paradise")
        .setAuthor("By Alan Walker")
        .setColor("auto") // or hex color without # (default: auto) (auto: dominant color from thumbnail)
        .setBrightness(50)
        .setThumbnail("https://i0.wp.com/is4-ssl.mzstatic.com/image/thumb/Music115/v4/20/6a/38/206a382f-da9e-0a6c-81a7-8db2397b6438/886449597628.jpg/600x600bb-60.jpg")
        .setProgress(0)
        .setStartTime("0:00")
        .setEndTime("3:00")

    // Build the card
    const cardBuffer = await card.build();

    // Write the card to a file
    fs.writeFileSync(`musicCard.png`, cardBuffer);
    console.log("Done!");
})()