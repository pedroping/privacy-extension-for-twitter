let lastParent;

function blueElements(elements) {
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
    console.log("scroll");

    if (lastParent && lastParent?.children?.length > 0) {
      Array.from(lastParent.children).forEach((post) => {
        post.classList.add("blur-post");
      });
    }
  });
}

async function homeBlur(data) {
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

    if (parent == lastParent) return;

    lastParent = parent;

    blueElements(parent.children);
    observeDOM(parent, () => {
      blueElements(parent.children);
    });
  }, 200);
}
