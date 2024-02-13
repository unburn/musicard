# __About__
**Musicard** is a futuristic music card library designed for Discord bots.

# __Installation__
```
npm install musicard
```

# __Example__
This example code will generate a music card image and save it.
```js
(async () => {
    const { musicCard } = require("musicard");
    const fs = require("fs");

    const card = new musicCard()
        .setName("Bad Habits")
        .setAuthor("By Ed Sheeran")
        .setColor("auto")
        .setTheme("dynamic")
        .setBrightness(50)
        .setThumbnail("https://static.qobuz.com/images/covers/ga/ua/rmk2cpqliuaga_600.jpg")
        .setProgress(10)
        .setStartTime("0:00")
        .setEndTime("3:00")

    const cardBuffer = await card.build();

    fs.writeFileSync(`musicard.png`, cardBuffer);
    console.log("Done!");
})()
```

# __Output__
This is the **classic** output of musicard.
![classic](https://s6.imgcdn.dev/ZDw99.png)

This is the **dynamic** output of musicard.
![dynamic](https://s6.imgcdn.dev/ZD6Jy.png)

# Projects
|  Sr.  |            Name            |  Platform  |
|:-----:|:--------------------------:|:----------:|
| **1** | [Riffy Music Bot (Official)](https://github.com/riffy-team/riffy-music-bot) | discord.js |