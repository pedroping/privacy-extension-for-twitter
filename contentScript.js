let lastData;
let homeBlur;
let photoCommentsBlur;
let postCommentsBlur;
let communitiesBlur;
let bookmarksBlur;
let exploreBlur;
let messagesBlur;
let messagesOptionsBlur;

const settingsIdentifier = "data";

if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

const getHomeParentFn = () =>
  document.querySelector(
    "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div.css-175oi2r.r-f8sm7e.r-13qz1uu.r-1ye8kvj > section > div > div"
  );

const getCommentsParentFn = () =>
  document.querySelector(
    "#layers > div:nth-child(2) > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-17gur6a.r-1pi2tsx.r-13qz1uu > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-th6na.r-1phboty.r-1dqxon3.r-1hycxz > section > div > div"
  );

const getPostCommentsParentFn = () =>
  document.querySelector(
    "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div"
  );

const getCommunitiesParentFn = () =>
  document.querySelector(
    "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div:nth-child(3) > section > div > div"
  );

const getBookmarksParentFn = () =>
  document.querySelector(
    "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div:nth-child(3) > div.css-175oi2r.r-f8sm7e.r-13qz1uu.r-1ye8kvj > section > div > div"
  );

const getExploreParentFn = () =>
  document.querySelector(
    "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div.css-175oi2r.r-f8sm7e.r-13qz1uu.r-1ye8kvj > section > div > div"
  );

const getMessagesOptionsFn = () =>
  document.querySelector(
    "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > section.css-175oi2r.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-1udh08x.r-13awgt0.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div > div.css-175oi2r.r-kemksi.r-16y2uox.r-f8sm7e.r-13qz1uu.r-1ye8kvj > section > div > div"
  );

const getMessagesFn = () =>
  document.querySelector(
    "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > section:nth-child(2) > div > div > div.css-175oi2r.r-16y2uox.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div.r-6koalj.r-eqz5dr.r-16y2uox > div > div > div > div.css-175oi2r.r-150rngu.r-kemksi.r-11yh6sk.r-lqr4d2.r-11uj9h2.r-ouzzow.r-16y2uox.r-1pi2tsx > div > div"
  );

function initBlurClasses() {
  if (!homeBlur)
    homeBlur = new DefaultBlur(
      lastData,
      "blurPost",
      "post",
      getHomeParentFn,
      "posts",
      true
    );

  if (!photoCommentsBlur)
    photoCommentsBlur = new DefaultBlur(
      lastData,
      "blurPost",
      "post",
      getCommentsParentFn
    );

  if (!postCommentsBlur)
    postCommentsBlur = new DefaultBlur(
      lastData,
      "blurPost",
      "post",
      getPostCommentsParentFn,
      "post",
      true
    );

  if (!communitiesBlur)
    communitiesBlur = new DefaultBlur(
      lastData,
      "blurCommunities",
      "communities",
      getCommunitiesParentFn,
      "communities",
      true
    );

  if (!bookmarksBlur)
    bookmarksBlur = new DefaultBlur(
      lastData,
      "blurBookmarks",
      "bookmarks",
      getBookmarksParentFn,
      "bookmarks",
      true
    );

  if (!exploreBlur)
    exploreBlur = new DefaultBlur(
      lastData,
      "blurExplore",
      "explore",
      getExploreParentFn,
      null,
      true
    );

  if (!messagesOptionsBlur)
    messagesOptionsBlur = new DefaultBlur(
      lastData,
      "blurMessage",
      "message-option",
      getMessagesOptionsFn,
      null,
      false
    );

  if (!messagesBlur)
    messagesBlur = new DefaultBlur(
      lastData,
      "blurMessage",
      "messages",
      getMessagesFn,
      null,
      false
    );
}

function disableOtherBlurs(actualBlur, relatedClass = null) {
  [
    homeBlur,
    photoCommentsBlur,
    postCommentsBlur,
    communitiesBlur,
    bookmarksBlur,
    exploreBlur,
    messagesOptionsBlur,
    messagesBlur,
  ]
    .filter((blurClass) => blurClass != actualBlur && blurClass != relatedClass)
    .forEach((blurClass) => blurClass?.disable?.());
}

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

    return {
      disconnect: () => {
        obj.removeEventListener("DOMNodeInserted", callback, true);
        obj.removeEventListener("DOMNodeInserted", callback, false);
        obj.removeEventListener("DOMNodeRemoved", callback, true);
        obj.removeEventListener("DOMNodeRemoved", callback, false);
      },
    };
  }
}

function blurContent() {
  initBlurClasses();

  if (window.location.href.match(/\/home/)?.[0])
    return homeBlur.initBlur(lastData);

  if (window.location.href.match(/\/photo/)?.[0]) return photoBlur(lastData);

  if (window.location.href.match(/\/status/)?.[0]) return postBlur(lastData);

  if (
    window.location.href.match(
      /^https?:\/\/(?:x|twitter)\.com\/[^\/]+\/communities\//
    )?.[0]
  )
    return communitiesBlur.initBlur(lastData);

  if (window.location.href.match(/\/bookmarks/)?.[0])
    return bookmarksBlur.initBlur(lastData);

  if (window.location.href.match(/\/explore/)?.[0])
    return exploreBlur.initBlur(lastData);

  if (
    window.location.href.match(/\/messages/)?.[0]
  ) {
    messagesBlur.initBlur(lastData, messagesOptionsBlur);
    messagesOptionsBlur.initBlur(lastData, messagesBlur);
    return;
  }
}

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
