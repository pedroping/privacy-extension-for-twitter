if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

function updateData() {
  browser.storage.sync.get([settingsIdentifier]).then((result) => {
    browser.storage.sync.set(result);

    try {
      const data = JSON.parse(result.data);

      if (!data) return;

      blurContent(data);
    } catch (err) {
      console.log(err);
    }
  });
}

async function blurContent(data) {
  const main = document.body.querySelector("main");
  const contentSection = await getSectionContent();

  observeDOM(contentSection, (a) => {
    console.log(contentSection.children);
  });
}

function getSectionContent() {
  return new Promise((resolve) => {
    let contentSection = document.body.querySelector(
      '[aria-labelledby="accessible-list-0"]'
    );

    if (contentSection) {
      resolve(contentSection);
    }

    const interval = setInterval(() => {
      contentSection = document.body.querySelector(
        '[aria-labelledby="accessible-list-0"]'
      );

      if (contentSection) {
        clearInterval(interval);
        resolve(contentSection);
      }
    }, 1000);
  });
}

const settingsIdentifier = "data";

browser.storage.onChanged.addListener(() => {
  updateData();
});

updateData();

function observeDOM(obj, callback) {
  const MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;

  if (!obj || obj.nodeType !== 1) {
    return;
  }

  if (MutationObserver) {
    const mutationObserver = new MutationObserver(callback);

    mutationObserver.observe(obj, { childList: true, subtree: true });
    return mutationObserver;
  } else if (window.addEventListener) {
    obj.addEventListener("DOMNodeInserted", callback, false);
    obj.addEventListener("DOMNodeRemoved", callback, false);
  }
}
