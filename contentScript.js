if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

let lastData;

function updateData() {
  browser.storage.sync.get([settingsIdentifier]).then((result) => {
    browser.storage.sync.set(result);

    try {
      const data = JSON.parse(result.data);

      if (!data) return;

      lastData = data;
      blurContent();
    } catch (err) {
      console.log(err);
    }
  });
}

function observeDOM(obj, callback) {
  const MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;

  if (!obj || obj.nodeType !== 1) {
    return;
  }

  if (MutationObserver) {
    const mutationObserver = new MutationObserver(callback);

    mutationObserver.observe(obj, { childList: true, subtree: false });
    return mutationObserver;
  } else if (window.addEventListener) {
    obj.addEventListener("DOMNodeInserted", callback, false);
    obj.addEventListener("DOMNodeRemoved", callback, false);
  }
}

function blurContent() {
  if (window.location.href.match(/\/home/)?.[0]) {
    postsBlur(lastData);
    trendingBlur(lastData);
    return;
  }

  if (window.location.href.match(/\/photo/)?.[0]) return photoBlur(lastData);

  if (window.location.href.match(/\/status/)?.[0]) {
    postBlur(lastData);
    trendingBlur(lastData, true);

    return;
  }
}

const settingsIdentifier = "data";

updateData();

browser.storage.onChanged.addListener(() => {
  updateData();
});

let lastUrl = location.href;
setInterval(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;

    if (!lastData) return;

    blurContent();
  }
}, 500);
