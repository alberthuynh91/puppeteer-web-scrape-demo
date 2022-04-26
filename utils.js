const fs = require("fs");

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 50;
      var distance = 10;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;

        window.scrollBy(0, distance);
        totalHeight += distance;

        if (scrollHeight > 8000) {
          clearInterval(timer);
          resolve();
        }
      }, 5);
    });
  });
}

function generateDataFile (data) {
  fs.writeFile("itemlist.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("wrote new data to file itemlist.json")
  })
}


module.exports = { autoScroll, generateDataFile };