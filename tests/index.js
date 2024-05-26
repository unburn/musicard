const { Classic } = require('musicard');
const fs = require('fs');

Classic({
    thumbnailImage:
        'https://cdn.discordapp.com/attachments/1220001571228880917/1220001571690123284/01.png?ex=660d5a01&is=65fae501&hm=a8cfb44844e61aa0fd01767cd363af048df28966c30d7b04a59f27fa45cf69c4&',
    backgroundImage:
        'https://cdn.discordapp.com/attachments/1220001571228880917/1220001571690123284/01.png?ex=660d5a01&is=65fae501&hm=a8cfb44844e61aa0fd01767cd363af048df28966c30d7b04a59f27fa45cf69c4&',
    imageDarkness: 60,
    nameColor: '#DC92FF',
    progressColor: '#DC92FF',
    progressBarColor: '#2B2B2B',
    progress: 50,
}).then(x => {
    fs.writeFileSync('output.png', x);
});
