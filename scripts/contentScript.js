if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

function updateStyles() {
  browser.storage.sync.get([settingsIdentifier]).then((result) => {
    console.log("Result", result);

    browser.storage.sync.set(result);
  });
}

const settingsIdentifier = "data";

browser.storage.onChanged.addListener(() => {
  updateStyles();
});

updateStyles();
