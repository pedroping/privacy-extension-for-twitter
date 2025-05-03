if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

const settingsIdentifier = "data";

const intialData = {
  blurPost: false,
  blurTrending: false,
};

Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(
  (input) => {
    input.addEventListener("change", (event) => {
      const key = event.target.getAttribute("eventId");
      const value = event.target.checked;

      intialData[key] = value;

      browser.storage.sync.set({
        data: JSON.stringify(intialData),
      });
    });
  }
);

function intiData() {
  browser.storage.sync.get([settingsIdentifier]).then((result) => {
    if (!result || !result.data) {
      browser.storage.sync.set({
        data: JSON.stringify(intialData),
      });
      return;
    }

    const data = JSON.parse(result.data);
    intialData.blurPost = data.blurPost;
    intialData.blurTrending = data.blurTrending;
    browser.storage.sync.set(result);

    Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(
      (input) => {
        const key = input.getAttribute("eventId");
        input.checked = intialData[key];
      }
    );
  });
}

intiData();
