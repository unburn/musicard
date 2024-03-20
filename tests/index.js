const { Classic } = require("musicard");
const fs = require('fs')

Classic({}).then(x => {
    fs.writeFileSync("output.png", x)
})