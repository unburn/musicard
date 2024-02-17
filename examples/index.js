(async () => {
    const { Classic } = require("../index");
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