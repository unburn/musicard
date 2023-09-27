// With functions
(async () => {
  const { MusicCard } = require("musicard");
  const fs = require("fs");

  const card = new MusicCard()
    .setName("Bad Habits")
    .setAuthor("By Ed Sheeran")
    .setColor("auto")
    .setTheme("dynamic")
    .setBrightness(50)
    .setThumbnail(
      "https://static.qobuz.com/images/covers/ga/ua/rmk2cpqliuaga_600.jpg"
    )
    .setProgress(10)
    .setStartTime("0:00")
    .setEndTime("3:00");

  const cardBuffer = await card.build();

  fs.writeFileSync(`musicCard.png`, cardBuffer);
  console.log("Done!");
})();

// With direct constructor object
(async () => {
  const { MusicCard } = require("musicard");
  const fs = require("fs");

  const card = new MusicCard({
    name: "Bad Habits",
    author: "By Ed Sheeran",
    color: "random",
    theme: "dynamic",
    brightness: 50,
    thumbnail:
      "https://static.qobuz.com/images/covers/ga/ua/rmk2cpqliuaga_600.jpg",
    progress: 10,
    starttime: "0:00",
    endtime: "3:00",
  });

  const cardBuffer = await card.build();

  fs.writeFileSync(`musicCard.png`, cardBuffer);
  console.log("Done!");
})();
