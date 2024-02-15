<img src="https://ik.imagekit.io/unburn/Musicard.png?updatedAt=1708002748488" />

<p align="center">Musicard is one of the best canvas libraries to create a variety of music cards.</p>

<p align="center">
    <a href="https://github.com/unburn/musicard/wiki/"><b>Documentation</b></a> •
    <a href="https://discord.gg/66uGX7t4ww"><b>Support</b></a>
</p>

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/musicard)](https://www.npmjs.com/package/musicard)
[![NPM Downloads](https://img.shields.io/npm/dw/musicard)](https://www.npmjs.com/package/musicard)
[![NPM License](https://img.shields.io/npm/l/musicard)](https://github.com/unburn/musicard/blob/main/LICENSE)
[![GitHub Repo stars](https://img.shields.io/github/stars/unburn/musicard)](https://github.com/unburn/musicard)

</div>

# Installation
```js
// using npm
npm install musicard

// using yarn
yarn add musicard
```

# Usage
You can use the Musicard package in your Discord bots, websites, etc.

## Using Create File
```js
(async () => {
    const { Classic } = require("musicard");
    const fs = require("fs")

    const musicard = await Classic({ });

    // Creates PNG file
    fs.writeFileSync("musicard.png", musicard);
})()
```

## Using Discord Bot
```js
const { Classic } = require("musicard");
const fs = require("fs")

const musicard = await Classic({});

...

return message.channel.send({
    files: [{
        attachment: musicard
    }]
})
```

# Themes
Musicard is the #1 canvas library to create music cards with awesome themes.

## Classic

![classic](https://ik.imagekit.io/unburn/Classic.png?updatedAt=1707999483727)

```js
(async () => {
    const { Classic } = require("musicard");
    const fs = require("fs")

    const musicard = await Classic({
        thumbnailImage: "https://lh3.googleusercontent.com/yavtBZZnoxaY21GSS_VIKSg0mvzu1b0r6arH8xvWVskoMaZ5ww3iDMgBNujnIWCt7MOkDsrKapSGCfc=w544-h544-l90-rj",
        backgroundColor: "#070707",
        progress: 10,
        progressColor: "#FF7A00",
        progressBarColor: "#5F2D00",
        name: "Burn",
        nameColor: "#FF7A00",
        author: "By 2WEI & Edda Hayes",
        authorColor: "#696969",
        startTime: "0:00",
        endTime: "4:00",
        timeColor: "#FF7A00"
    });

    fs.writeFileSync("musicard.png", musicard);
})()
```

***

## Classic Pro

![classicpro](https://ik.imagekit.io/unburn/ClassicPro.png?updatedAt=1707999483420)

```js
(async () => {
    const { ClassicPro } = require("musicard");
    const fs = require("fs")

    const musicard = await ClassicPro({
        thumbnailImage: "https://lh3.googleusercontent.com/yavtBZZnoxaY21GSS_VIKSg0mvzu1b0r6arH8xvWVskoMaZ5ww3iDMgBNujnIWCt7MOkDsrKapSGCfc=w544-h544-l90-rj",
        backgroundColor: "#070707",
        progress: 10,
        progressColor: "#FF7A00",
        progressBarColor: "#5F2D00",
        name: "Burn",
        nameColor: "#FF7A00",
        author: "By 2WEI & Edda Hayes",
        authorColor: "#696969",
        startTime: "0:00",
        endTime: "4:00",
        timeColor: "#FF7A00"
    });

    fs.writeFileSync("musicard.png", musicard);
})()
```

***

## Dynamic

![dynamic](https://ik.imagekit.io/unburn/Dynamic.png?updatedAt=1707999789888)

```js
(async () => {
    const { Dynamic } = require("musicard");
    const fs = require("fs")

    const musicard = await Dynamic({
        thumbnailImage: "https://lh3.googleusercontent.com/yavtBZZnoxaY21GSS_VIKSg0mvzu1b0r6arH8xvWVskoMaZ5ww3iDMgBNujnIWCt7MOkDsrKapSGCfc=w544-h544-l90-rj",
        backgroundColor: "#070707",
        progress: 10,
        progressColor: "#FF7A00",
        progressBarColor: "#5F2D00",
        name: "Burn",
        nameColor: "#FF7A00",
        author: "By 2WEI & Edda Hayes",
        authorColor: "#696969"
    });

    fs.writeFileSync("musicard.png", musicard);
})()
```

***

## Mini

![mini](https://ik.imagekit.io/unburn/Mini.png?updatedAt=1707999483700)

```js
(async () => {
    const { Mini } = require("musicard");
    const fs = require("fs")

    const musicard = await Mini({
        thumbnailImage: "https://lh3.googleusercontent.com/yavtBZZnoxaY21GSS_VIKSg0mvzu1b0r6arH8xvWVskoMaZ5ww3iDMgBNujnIWCt7MOkDsrKapSGCfc=w544-h544-l90-rj",
        backgroundColor: "#070707",
        progress: 10,
        progressColor: "#FF7A00",
        progressBarColor: "#5F2D00",
        menuColor: "#FF7A00",
        paused: false
    });

    fs.writeFileSync("musicard.png", musicard);
})()
```

***

## Mini Pro

![minipro](https://ik.imagekit.io/unburn/MiniPro.png?updatedAt=1707999483423)

```js
(async () => {
    const { MiniPro } = require("musicard");
    const fs = require("fs")

    const musicard = await MiniPro({
        thumbnailImage: "https://lh3.googleusercontent.com/yavtBZZnoxaY21GSS_VIKSg0mvzu1b0r6arH8xvWVskoMaZ5ww3iDMgBNujnIWCt7MOkDsrKapSGCfc=w544-h544-l90-rj",
        backgroundColor: "#070707",
        progress: 10,
        progressColor: "#FF7A00",
        progressBarColor: "#5F2D00",
        name: "Burn",
        nameColor: "#FF7A00",
        author: "By 2WEI & Edda Hayes",
        authorColor: "#696969"
    });

    fs.writeFileSync("musicard.png", musicard);
})()
```

# Resource
Pull request to add your project here.

| Riffy Music Bot | https://github.com/riffy-team/riffy-music-bot |
| --------------- | --------------------------------------------- |

# Licence
[GPL](https://github.com/unburn/musicard/blob/main/LICENSE)