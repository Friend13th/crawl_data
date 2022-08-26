// const { handleData, exportJson, exportExcel } = require("./main");

const trData = document.getElementById("data-render");
const bttShowData = document.getElementById("show-data");

bttShowData.addEventListener("click", async () => {
  console.log("pmd");
  const data = await window.electronAPI.showDataInTable;
  data();
});
