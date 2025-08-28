let lastTrendingParent;

function blurTrendingElements(elements) {
  Array.from(elements).forEach((post, i) => {
    if (
      post.classList.contains("blur-trending") ||
      post.getAttribute("element-init") ||
      i < 2
    )
      return;

    post.classList.add("blur-trending");
    post.setAttribute("element-init", true);

    post.addEventListener("mouseenter", () => {
      post.classList.remove("blur-trending");
    });

    post.addEventListener("mousemove", () => {
      post.classList.remove("blur-trending");
    });

    post.addEventListener("mouseleave", () => {
      post.classList.add("blur-trending");
    });
  });
}

function getListOnHome() {
  return (
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div > div:nth-child(4) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-10f7w94.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-1xcajam > div > div > div > div > div:nth-child(4) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-10f7w94.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div > div:nth-child(4) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1jocfgc > div > div.css-175oi2r.r-1jocfgc.r-gtdqiz > div > div > div > div > div:nth-child(4) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-10f7w94.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div > div:nth-child(5) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div > div:nth-child(5) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1jocfgc > div > div.css-175oi2r.r-1jocfgc.r-gtdqiz > div > div > div > div > div:nth-child(5) > section > div > div"
    )
  );
}

function getListOnPost() {
  return (
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-10f7w94.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-1xcajam > div > div > div > div:nth-child(4) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-10f7w94.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-1xcajam > div > div > div > div:nth-child(4) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-1xcajam > div > div > div > div:nth-child(4) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1jocfgc > div > div.css-175oi2r.r-1jocfgc.r-gtdqiz > div > div > div > div:nth-child(4) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-10f7w94.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div:nth-child(5) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div:nth-child(5) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div:nth-child(4) > section > div > div"
    )
  );
}

function getListOnCommunities() {
  return (
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-10f7w94.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-1xcajam > div > div > div > div:nth-child(3) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1jocfgc > div > div.css-175oi2r.r-1jocfgc.r-gtdqiz > div > div > div > div:nth-child(3) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div:nth-child(3) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-10f7w94.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div:nth-child(3) > section > div > div"
    )
  );
}

function getListOnBookmarks() {
  return (
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1jocfgc > div > div.css-175oi2r.r-1jocfgc.r-gtdqiz > div > div > div > div:nth-child(3) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div:nth-child(3) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-10f7w94.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-1xcajam > div > div > div > div:nth-child(3) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-10f7w94.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div:nth-child(3) > section > div > div"
    )
  );
}

function getListOnNotifications() {
  return (
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-1xcajam > div > div > div > div:nth-child(3) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-10f7w94.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-1xcajam > div > div > div > div:nth-child(3) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div:nth-child(3) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1jocfgc > div > div.css-175oi2r.r-1jocfgc.r-gtdqiz > div > div > div > div:nth-child(3) > section > div > div"
    )
  );
}

function getListOnProfile() {
  return (
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-10f7w94.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-1xcajam > div > div > div > div:nth-child(4) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div:nth-child(4) > section > div > div"
    ) ||
    document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1jocfgc > div > div.css-175oi2r.r-1jocfgc.r-gtdqiz > div > div > div > div:nth-child(4) > section > div > div"
    )
  );
}

const listParentOptions = {
  default: () => getListOnHome(),
  posts: () => getListOnHome(),
  post: () => getListOnPost(),
  communities: () => getListOnCommunities(),
  bookmarks: () => getListOnBookmarks(),
  notifications: () => getListOnNotifications(),
  profile: () => getListOnProfile(),
};

function trendingBlur(data, pageKey = "default") {
  if (!data?.blurTrending?.value) {
    document.body.style.setProperty("--trending-blur-amount", "0px");
    document.body.style.setProperty("--trending-blur-gray-scale", "0");
    return;
  }

  document.body.style.setProperty(
    "--trending-blur-amount",
    (data.blurTrending.blurAmount || 10) + "px"
  );
  document.body.style.setProperty("--trending-blur-gray-scale", "1");

  setInterval(() => {
    const parent = listParentOptions[pageKey]();

    if (!parent) return;

    if (parent == lastTrendingParent) return;

    lastTrendingParent = parent;

    blurTrendingElements(parent.children);
    observeDOM(parent, () => {
      blurTrendingElements(parent.children);
    });
  }, 200);
}
