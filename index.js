const axios = require("axios");

let urlStr = `https://vinabiz.us`;

function getListUrlCompany(data) {
  let regexUrl = /href="\/company\/detail(.*?)"/g;
  //   return regexUrl.exec(data);
  let m;
  let listUrl = [];
  while ((m = regexUrl.exec(data)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regexUrl.lastIndex) {
      regexUrl.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      if (!match.includes("href")) {
        listUrl.push(match);
      }
      //   console.log(`Found match, group ${groupIndex}: ${match}`);
    });
  }
  return listUrl;
}

// Handle data when connect each site
async function handleData(url) {
  console.log(`${urlStr}/company/detail${url}`);
  return axios.get(`${urlStr}/${url}`);
}
// Return json data from raw data
function formatData(raw) {
  let regex = /href="\/company\/detail(.*?)"/g;
}
function handleDetail() {}
(async () => {
  try {
    console.log(`${urlStr}/company`, "url");
    const resp = await axios.get(`${urlStr}/company`);
    let listUrl = getListUrlCompany(resp.data);
    console.log("res ", listUrl);
    let rawData = await Promise.all(
      listUrl.map(async (item) => {
        let res = await handleData(item);
        return res.data;
      })
    );
    let jsonData = formatData(rawData[0]);
    console.log(rawData[0]);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
})();
