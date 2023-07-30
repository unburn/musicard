![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard.js/main/asset/musicard.jpg)
# About
**Musicard.js** is a lightweight and futuristic music card library designed for Discord bots.

- Fully Customizable
- Lightweight
- High Quality Assets


# Installation
```
npm install musicard.js
```

# Example
This example code will generate a music card image and save it.
```js
const { musicCard } = require("musicard.js");
const fs = require("fs");

musicCard({
    name: "Faded",
    author: "Alan Walker",
    color: "00fe9b", // remove # from hex code
    thumbnail: "https://raw.githubusercontent.com/A3PIRE/musicard.js/main/asset/thumbnail-preview.jpg",
    progress: 50,
    starttime: "0:00",
    endtime: "3:00",
    mode: "play" // or pause
}).then((buffer) => {
    // Generate a card and save it to a file
    fs.writeFileSync("example/musicCard.png", buffer)
    console.log("Your music card has been generated!")
})
```
**Output** : musicCard.png
![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard.js/main/asset/example.png)
**Mode**: pause
![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard.js/main/asset/example-pause.png)
**Progress**: 90
![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard.js/main/asset/example-progress.png)
**Color**: ea00ff (purple)
![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard.js/main/asset/example-color.png)
**And many more....**
# Projects
We will create projects soon, but if you want your project here using **musicard.js**, join our [Discord](https://discord.gg/TvjrWtEuyP) server and contact us.

