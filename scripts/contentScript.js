if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

console.log("Content Script");

function updateStyles() {
  browser.storage.sync.get([settingsIdentifier]).then((result) => {
    console.log(result);
  });
}

const settingsIdentifier = "data";

browser.storage.onChanged.addListener((changes, area) => {
  console.log("Test", changes, area, document);
  updateStyles();
});

updateStyles();
