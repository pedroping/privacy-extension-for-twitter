if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

const settingsIdentifier = "data";

const requiredPermissions = {
  origins: ["https://www.google.com/*"],
  permissions: ["storage"],
};

browser.runtime.onInstalled.addListener(() => {
  browser.permissions.contains(requiredPermissions).then((hasPermissions) => {
    if (hasPermissions) return;
    browser.permissions.request(requiredPermissions);
  });
});