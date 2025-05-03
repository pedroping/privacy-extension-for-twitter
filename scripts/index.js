if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

const settingsIdentifier = "data";

document.querySelector("button").addEventListener("click", () => {
  test();
});

function test() {
  browser.storage.sync.get([settingsIdentifier]).then((result) => {

    if (!result.hasOwnProperty(settingsIdentifier)) {
      browser.runtime.reload();
      return;
    }

    console.log("Click 4", result);
    browser.storage.sync.set({
      data: `${Math.random() * 10}`,
      aa: Math.random() * 10,
    });
  });
}