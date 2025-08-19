let lastPostsParent;
let scrollStart = false;
let scrollCooldownUntil = 0;
let lastElementHovered;
let allPostsList = [];

function blurPostElements(elements) {
  Array.from(elements).forEach((post) => {
    if (post.getAttribute("element-init")) return;
    if (post != lastElementHovered) post.classList.add("blur-post");

    post.setAttribute("element-init", true);

    post.addEventListener("mousemove", () => {
      if (Date.now() < scrollCooldownUntil) return;
      if (scrollStart) return;

      post.classList.remove("blur-post");
      lastElementHovered = post;
    });

    post.addEventListener("mouseenter", () => {
      if (Date.now() < scrollCooldownUntil) return;
      if (scrollStart) return;

      post.classList.remove("blur-post");
      lastElementHovered = post;
    });

    post.addEventListener("mouseleave", () => {
      lastElementHovered = null;
      if (Date.now() < scrollCooldownUntil) return;
      if (scrollStart) return;

      post.classList.add("blur-post");
    });
  });
}

function initPostsScrollListner() {
  let timeoutId;

  const debounce = (func, delay) => {
    return function (event) {
      event.preventDefault();
      event.stopPropagation();

      scrollStart = true;
      scrollCooldownUntil = Date.now() + 100;

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        scrollCooldownUntil = Date.now() + 250;
        func(event);
      }, delay);
    };
  };

  window.addEventListener("mousemove", (event) => {
    if (scrollStart) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener("mouseenter", (event) => {
    if (scrollStart) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener(
    "scroll",
    debounce(() => {
      allPostsList.forEach((post) => {
        if (post != lastElementHovered) post.classList.add("blur-post");
      });

      setTimeout(() => {
        scrollStart = false;
      }, 100);
    }, 10)
  );
}

function postsBlur(data) {
  if (!data?.blurPost?.value) {
    document.body.style.setProperty("--post-blur-amount", "0px");
    document.body.style.setProperty("--post-blur-gray-scale", "0");
    return;
  }

  initPostsScrollListner();

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

    allPostsList = allPostsList.concat(Array.from(parent.children));

    if (parent == lastPostsParent) return;
    lastPostsParent = parent;

    blurPostElements(parent.children);

    observeDOM(parent, () => {
      if (Date.now() < scrollCooldownUntil) return;
      if (scrollStart) return;

      blurPostElements(parent.children);
    });
  }, 50);
}
