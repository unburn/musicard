const { Dynamic, Classic, ClassicPro, Mini} = require('musicard');
const fs = require('node:fs');

const classicThemeOptions = {
    thumbnailImage:
            'https://lh3.googleusercontent.com/yavtBZZnoxaY21GSS_VIKSg0mvzu1b0r6arH8xvWVskoMaZ5ww3iDMgBNujnIWCt7MOkDsrKapSGCfc=w544-h544-l90-rj',
        backgroundColor: '#070707',
        progress: 0,
        progressColor: '#FF7A00',
        progressBarColor: '#5F2D00',
        name: 'Burn',
        nameColor: '#FF7A00',
        author: 'By 2WEI & Edda Hayes',
        authorColor: '#696969',
        startTime: '0:00',
        endTime: '4:00',
        timeColor: '#FF7A00',
}

// console.log("Musicard -- TEST")

console.log("generating Dynamic Theme, Check the output-dynamic.png file, After few seconds");

Dynamic({
    name: "Name",
    author: "Author",
    thumbnailImage: "https://i.imgur.com/HjuSDcu.png",
    backgroundImage: "https://i.imgur.com/ADDITOX.jpg",
    imageDarkness: 60,
    nameColor: '#DC92FF',
    progressColor: '#DC92FF',
    progressBarColor: '#2B2B2B',
    progress: 0,
}).then(x => {
    fs.writeFileSync('output-dynamic.png', x);
})

console.log("generating Classic AND ClassicPro Theme, Check the output-classic.png & output-classicpro.png file, After few seconds");

Classic({ ...classicThemeOptions }).then(x => {
    fs.writeFileSync('output-classic.png', x);
});

ClassicPro({ ...classicThemeOptions }).then(x => {
    fs.writeFileSync('output-classicpro.png', x);
});

console.log("generating Mini Theme, Check the output-mini.png file, After few seconds");

Mini({
    thumbnailImage:
            'https://lh3.googleusercontent.com/yavtBZZnoxaY21GSS_VIKSg0mvzu1b0r6arH8xvWVskoMaZ5ww3iDMgBNujnIWCt7MOkDsrKapSGCfc=w544-h544-l90-rj',
        backgroundColor: '#070707',
        progress: 0,
        progressColor: '#FF7A00',
        progressBarColor: '#5F2D00',
        menuColor: '#FF7A00',
        paused: false,
}).then(x => {
    fs.writeFileSync('output-mini.png', x);
});

console.log("Done! ✅");