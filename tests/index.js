const { Classic,Upcoming  } = require("../dist");
const fs = require('fs')

Upcoming({
    thumbnailImage: "https://img.youtube.com/vi/lmG0kY9FtRY/maxresdefault.jpg",
    backgroundImage: fs.readFileSync("bg.png"),
    imageDarkness: 70,
    // titleColor: "#DC92FF",
    author: "Testing by UG",
    title: "Bad Boy (feat. Luana Kiara)",
    trackIndexBackgroundRadii: [10, 20, 30, 40, 50, 60, 70, 80, 80, 100]
}).then(x => {
    fs.writeFileSync("output.png", x)
})