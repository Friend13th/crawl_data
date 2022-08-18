const cheerio = require("cheerio"); // khai báo module cheerio

const request = require("request-promise"); // khai báo module request-promise

let urlStr = `https://vinabiz.us`;
let strRq = "/company/detail";
async function getListUrl() {
  await request(`${urlStr}/company`, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let listUrl = [];
      $(".well")
        .find("a")
        .each((idx, el) => {
          const val = $(el).attr("href");
          if (val && val.includes(strRq)) {
            listUrl.push(val);
          }
        });
      return listUrl;
    }
  });
}
let tmp =
  "/company/detail/cong-ty-co-phan-co-khi-vnc/3000390030003100310032003500350033003300";

async function getDetail(url) {
  let data = [];
  await request(`${urlStr}${url}`, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      console.log("yes");
      const $ = cheerio.load(html);
      $(".table-responsive")
        .find("td")
        .each((i, el) => {
          const val = $(el).text();
          data.push(val);
        });
    }
  });
  console.log(data);
}
getDetail(tmp);
