![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard/main/assets/musicard.jpg)
# About
**Musicard** is a lightweight and futuristic music card library designed for Discord bots.

- Fully Customizable
- Lightweight
- High Quality Assets


# Installation
```
npm install musicard
```

# Example
This example code will generate a music card image and save it.
```js
(async () => {
    const { musicCard } = require("../build/index");
    const fs = require("fs");

    // Create a new music card
    const card = new musicCard()
        .setName("Faded")
        .setAuthor("By Alan Walker")
        .setColor("03cdff")
        .setThumbnail("https://th.bing.com/th/id/OIP.WcM-Snz7PSuKGlrUqzsENgHaHa?pid=ImgDet&rs=1")
        .setProgress(0)
        .setStartTime("0:00")
        .setEndTime("3:00")
        .setMode("play")

    // Build the card
    const cardBuffer = await card.build();

    // Write the card to a file
    fs.writeFileSync("musicCard.png", cardBuffer);
    console.log("Done!");
})()
```
**Output** : musicCard.png
![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard/main/assets/example.png)
**Mode**: pause
![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard/main/assets/example-pause.png)
**Progress**: 90
![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard/main/assets/example-progress.png)
**Color**: ea00ff (purple)
![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard/main/assets/example-color.png)
**And many more....**
# Projects
We will create projects soon, but if you want your project here using **Musicard**, join our [Discord](https://discord.gg/TvjrWtEuyP) server and contact us.

