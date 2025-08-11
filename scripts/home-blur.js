let lastPostsParent;
let lastTrendingParent;

function blurPostElements(elements) {
  Array.from(elements).forEach((post) => {
    if (
      post.classList.contains("blur-post") ||
      post.getAttribute("element-init")
    )
      return;

    post.classList.add("blur-post");
    post.setAttribute("element-init", true);

    post.addEventListener("mouseenter", () => {
      post.classList.remove("blur-post");
    });

    post.addEventListener("mousemove", () => {
      post.classList.remove("blur-post");
    });

    post.addEventListener("mouseleave", () => {
      post.classList.add("blur-post");
    });
  });
}

function initScrollListner() {
  window.addEventListener("scroll", () => {
    if (lastPostsParent && lastPostsParent?.children?.length > 0) {
      Array.from(lastPostsParent.children).forEach((post) => {
        post.classList.add("blur-post");
      });
    }
  });
}

function postsBlur(data) {
  if (!data?.blurPost?.value) {
    document.body.style.setProperty("--post-blur-amount", "0px");
    document.body.style.setProperty("--post-blur-gray-scale", "0");
    return;
  }

  initScrollListner();

  document.body.style.setProperty(
    "--post-blur-amount",
    (data.blurPost.blurAmount || 10) + "px"
  );
  document.body.style.setProperty("--post-blur-gray-scale", "1");

  setInterval(() => {
    const parent = document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div.css-175oi2r.r-f8sm7e.r-13qz1uu.r-1ye8kvj > section > div > div"
    );

    if (!parent) return;

    if (parent == lastPostsParent) return;

    lastPostsParent = parent;

    blurPostElements(parent.children);
    observeDOM(parent, () => {
      blurPostElements(parent.children);
    });
  }, 200);
}

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

// Trending blur

function TrendingBlur(data) {
  if (!data?.blurTrending?.value) {
    document.body.style.setProperty("--trending-blur-amount", "0px");
    document.body.style.setProperty("--trending-blur-gray-scale", "0");
    return;
  }

  initScrollListner();

  document.body.style.setProperty(
    "--trending-blur-amount",
    (data.blurTrending.blurAmount || 10) + "px"
  );
  document.body.style.setProperty("--trending-blur-gray-scale", "1");

  setInterval(() => {
    const parent = document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-1l8l4mf.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div > div:nth-child(4) > section > div > div"
    );

    if (!parent) return;

    if (parent == lastTrendingParent) return;

    lastTrendingParent = parent;

    blurTrendingElements(parent.children);
    observeDOM(parent, () => {
      blurTrendingElements(parent.children);
    });
  }, 200);
}

function homeBlur(data) {
  postsBlur(data);
  TrendingBlur(data);
}
