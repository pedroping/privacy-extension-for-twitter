let lastPostElement;
let commentsParent;

function postElementListener() {
  lastPostElement.classList.add("blur-post");
  lastPostElement.setAttribute("element-init", true);

  lastPostElement.addEventListener("mouseenter", () => {
    lastPostElement.classList.remove("blur-post");
  });

  lastPostElement.addEventListener("mousemove", () => {
    lastPostElement.classList.remove("blur-post");
  });

  lastPostElement.addEventListener("mouseleave", () => {
    lastPostElement.classList.add("blur-post");
  });
}

function commentsElementListener(elements) {
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

function initPostScrollListner() {
  window.addEventListener("scroll", () => {
    if (lastPostElement) {
      lastPostElement.classList.add("blur-post");
    }

    if (commentsParent && commentsParent?.children?.length > 0) {
      Array.from(commentsParent.children).forEach((post) => {
        post.classList.add("blur-post");
      });
    }
  });
}

function commentsBlur() {
  setInterval(() => {
    const parent = document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div"
    );

    if (!parent) return;

    if (parent == commentsParent) return;

    commentsParent = parent;

    commentsElementListener(parent.children);
    observeDOM(parent, () => {
      commentsElementListener(parent.children);
    });
  }, 200);
}

function mainSectionBlur() {
  initPostScrollListner();

  setInterval(() => {
    const parent = document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div > div:nth-child(1) > div > div > article"
    );

    if (!parent) return;

    if (parent == lastPostElement) return;

    lastPostElement = parent;
    postElementListener();
  }, 200);
}

function postBlur(data) {
  if (!data?.blurPost?.value) {
    document.body.style.setProperty("--post-blur-amount", "0px");
    document.body.style.setProperty("--post-blur-gray-scale", "0");
    return;
  }

  document.body.style.setProperty(
    "--post-blur-amount",
    (data.blurPost.blurAmount || 10) + "px"
  );
  document.body.style.setProperty("--post-blur-gray-scale", "1");

  mainSectionBlur();
  commentsBlur();
}
