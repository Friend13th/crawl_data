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
    
}

(async () => {
  try {
    console.log(`${urlStr}/company`, "url");
    const resp = await axios.get(`${urlStr}/company`);
    const listUrl = getListUrlCompany(resp.data);
    console.log("res ", listUrl);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
})();

