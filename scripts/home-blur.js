let lastPostsParent;
let lastElementHovered;
let allPostsList = [];

globalThis.scrollStart = false;

function blurPostElements(elements) {
  allPostsList.forEach((post) => {
    if (post != lastElementHovered) post.classList.add("blur-post");
  });

  Array.from(elements).forEach((post) => {
    if (post.getAttribute("element-init")) return;
    if (post != lastElementHovered) post.classList.add("blur-post");

    post.setAttribute("element-init", true);

    post.addEventListener("mousemove", () => {
      if (globalThis.scrollStart) return;

      post.classList.remove("blur-post");
      lastElementHovered = post;
    });

    post.addEventListener("mouseenter", () => {
      if (globalThis.scrollStart) return;

      post.classList.remove("blur-post");
      lastElementHovered = post;
    });

    post.addEventListener("mouseleave", () => {
      lastElementHovered = null;
      if (globalThis.scrollStart) return;

      post.classList.add("blur-post");
    });
  });
}

function initPostsScrollListner() {
  function debounce(func, wait) {
    var timeout;

    allPostsList.forEach((post) => {
      if (post != lastElementHovered) post.classList.add("blur-post");
    });

    return function () {
      var context = this,
        args = arguments;

      globalThis.scrollStart = true;

      var later = function () {
        timeout = null;
        func.apply(context, args);
      };
      var callNow = !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  window.addEventListener(
    "scroll",
    debounce(() => {
      globalThis.scrollStart = false;

      allPostsList.forEach((post) => {
        if (post != lastElementHovered) post.classList.add("blur-post");
      });

      setTimeout(() => {
        allPostsList.forEach((post) => {
          if (post != lastElementHovered) post.classList.add("blur-post");
        });
      }, 1);
    }, 250)
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

    allPostsList.forEach((post) => {
      if (post != lastElementHovered) post.classList.add("blur-post");
    });

    if (!globalThis.scrollStart) blurPostElements(parent.children);

    observeDOM(parent, () => {
      allPostsList.forEach((post) => {
        if (post != lastElementHovered) post.classList.add("blur-post");
      });

      if (globalThis.scrollStart) return;

      blurPostElements(parent.children);
    });
  }, 50);
}
