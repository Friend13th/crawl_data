const cheerio = require("cheerio"); // khai báo module cheerio
const request = require("request-promise"); // khai báo module request-promise
const fs = require("fs");
const XlsxTemplate = require("xlsx-template-ex");

let urlStr = `https://vinabiz.us`;
let strRq = "/company/detail";
async function getListUrl() {
  let listUrl = [];
  await request(`${urlStr}/company`, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $(".well")
        .find("a")
        .each((idx, el) => {
          const val = $(el).attr("href");
          if (val && val.includes(strRq)) {
            listUrl.push(val);
          }
        });
    }
  });
  return listUrl;
}

async function getDetail(url) {
  let data = [];
  await request(`${urlStr}${url}`, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $(".table-responsive")
        .find("td:not(.bg_table_th)")
        .each((i, el) => {
          let val = $(el).text() || "";
          val = val.replace(/\n/g, "");
          if (!val.includes("adsbygoogle")) {
            data.push(val);
          }
        });
    }
  });
  let obj = {};
  data.forEach((val, i) => {
    if (i % 2 == 0 && !obj[val]) {
      obj[val] = data[i + 1];
    } else if (i % 2 == 0 && obj[val]) {
      obj[val + "1"] = data[i + 1];
    }
  });
  return obj;
}

async function handleData() {
  const listUrl = await getListUrl();
  let arrData = await Promise.all(
    listUrl.map(async (item) => {
      return await getDetail(item);
    })
  );
  const data = {
    reportBuildDate: Date.now(),
    results: arrData,
  };

  console.log(arrData);
  await XlsxTemplate.xlsxBuildByTemplate(data, "template2.xlsx")
    .then((buffer) =>
      fs.writeFileSync(`./report_${data.reportBuildDate}.xlsx`, buffer)
    )
    .catch((error) => console.log("xlsxHelper error:", error));

  // write file response.json
  // arrData = JSON.stringify(arrData);
  // fs.writeFile("response.json", arrData, "utf8", () => {
  //   console.log("write success");
  // });
}
// getDetail(tmp);
handleData();
