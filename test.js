const fs = require("fs");
const XlsxTemplate = require("xlsx-template-ex");

let data = {
  reportBuildDate: 1526443275041,

  results: [
    { text: "some text 1", answerText: "a text of an answer 1" },
    { text: "some text 2", answerText: "a text of an answer 2" },
    { text: "some text 3", answerText: "a text of an answer 3" },
    { answerText: "a text of an answer 3" },
  ],
};
XlsxTemplate.xlsxBuildByTemplate(data, "tmp1.xlsx")
  .then((buffer) => {
    fs.writeFileSync(`./out${Date.now()}.xlsx`, buffer);
  })
  .catch((error) => console.log("xlsxHelper error:", error));
