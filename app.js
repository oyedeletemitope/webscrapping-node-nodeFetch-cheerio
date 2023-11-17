import * as cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";

async function getFormulaOneDrivers() {
  try {
    const response = await fetch("https://www.formula1.com/en/drivers.html");

    const body = await response.text();

    const $ = cheerio.load(body);
    /*
    const wrapper = $(
      "body > div.site-wrapper > main > div.container.listing-items--wrapper.driver.during-season"
    );
    console.log(wrapper.length)
    ;
    */

    const items = [];
    $(
      "body > div.site-wrapper > main > div.container.listing-items--wrapper.driver.during-season > .row >.col-12"
    ).map((index, element) => {
      const rank = $(element).find(".rank").text();
      const points = $(element).find(".points > .f1-wide--s").text();
      const firstName = $(element)
        .find(".listing-item--name span:first")
        .text();
      const lastName = $(element).find(".listing-item--name span:last").text();
      const team = $(element).find(".listing-item--team").text();
      const photo = $(element)
        .find(".listing-item--photo img")
        .attr("data-src");

      items.push({
        rank,
        points,
        firstName,
        lastName,
        team,
        photo,
      });
    });
    fs.writeFile("formula1.json", JSON.stringify(items), function (err) {
      if (err) return console.log(err);
      console.log("formula 1 drivers were saved as: formula1.json");
    });
  } catch (error) {
    console.log(error);
  }
}

getFormulaOneDrivers();
