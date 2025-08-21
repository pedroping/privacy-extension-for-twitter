let lastPostsParent;
let allPostsList = [];

globalThis.scrollStart = false;
globalThis.lastElementHovered = null;

function blurFn(post, action) {
  let timeOut = false;

  return () => {
    if (action == "add") globalThis.lastElementHovered = null;
    if (timeOut) return;

    timeOut = true;

    setTimeout(() => {
      timeOut = false;

      if (globalThis.scrollStart) return;

      post.classList[action]("blur-post");
      globalThis.lastElementHovered = post;
    }, 50);
  };
}

function blurPostElements(elements) {
  allPostsList.forEach((post) => {
    if (post != globalThis.lastElementHovered) post.classList.add("blur-post");
  });

  Array.from(elements).forEach((post) => {
    if (post.getAttribute("element-init") || allPostsList.includes(post))
      return;
    if (post != globalThis.lastElementHovered) post.classList.add("blur-post");

    allPostsList.push(post);

    post.setAttribute("element-init", true);
    post.addEventListener("mouseenter", blurFn(post, "remove"));
    post.addEventListener("mousemove", blurFn(post, "remove"));
    post.addEventListener("mouseleave", blurFn(post, "add"));
  });
}

function debounce(func, wait) {
  var timeout;

  return function () {
    var context = this,
      args = arguments;

    globalThis.scrollStart = true;
    allPostsList.forEach((post) => {
      if (post != globalThis.lastElementHovered)
        post.classList.add("blur-post");
    });

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

function initPostsScrollListner() {
  window.addEventListener(
    "scroll",
    debounce(
      () => {
        globalThis.scrollStart = false;

        setTimeout(() => {
          allPostsList.forEach((post) => {
            if (post != globalThis.lastElementHovered)
              post.classList.add("blur-post");
          });
        }, 1);
      },
      500,
      true
    )
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

    if (parent == lastPostsParent) return;
    lastPostsParent = parent;

    blurPostElements(parent.children);

    observeDOM(parent, () => {
      blurPostElements(parent.children);
    });
  }, 50);
}
