## Musicard (Beta)

<a href="https://unburn.tech"><img style="width: 150px" src="https://ik.imagekit.io/unburn/unburn-badge-small.svg"/></a>

**Musicard** is a futuristic music card library designed for Discord bots.

## Installation

```
npm install musicard
```

**Get API key from our site here https://unburn.tech**

## Usage

```js
const fs = require("fs")
const { Musicard } = require("musicard");

const musicard = new Musicard("API_KEY");

musicard.vibrant({
    thumbnailImage: "https://lh3.googleusercontent.com/hOrOngQbjo0Lw-wuTTvyDTsT-TkrNEo3Ms88PMyGwEvHvnTrHWU0cKAbkFseCLs7IvLiJPv_7884X5hc-w=w544-h544-l90-rj",
    progressColor: "#e92725",
    progressBarColor: "#4f4f4f"
    backgroundColor: "#000000",
    menuColor: "#e92725",
    progress: 10,
    paused: false,
}).then((data) => {
    if (data.status !== 200) {
        return console.log(data.message)
    } else {
        const base64Data = `${data.message}`.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        fs.writeFile("vibrant.png", buffer, (err) => {
            if (err) {
                console.error('Error:', err);
                return;
            }
            console.log('File has been created successfully!');
        });
    }
})
```

## Output

<img style="width: 250px" src="https://ik.imagekit.io/unburn/vibrant.png?updatedAt=1707732494506"/>