let lastPostElement;
let commentsParent;
let lastPostHovered;
let blurPostOnScroll = false;

function postElementListener(element) {
  if (
    element.parentElement?.parentElement?.parentElement.classList.contains(
      "blur-post"
    )
  )
    return;

  element.classList.add("blur-post");
  element.setAttribute("element-init", true);

  element.addEventListener("mouseenter", () => {
    if (lastPostElement != element) return;

    element.classList.remove("blur-post");
    lastPostHovered = element;
  });

  element.addEventListener("mousemove", () => {
    if (lastPostElement != element) return;

    element.classList.remove("blur-post");
    lastPostHovered = element;
  });

  element.addEventListener("mouseleave", () => {
    if (lastPostElement != element) return;

    element.classList.add("blur-post");
    lastPostHovered = null;
  });
}

function initPostScrollListner() {
  window.addEventListener("scroll", () => {
    if (
      blurPostOnScroll ||
      (lastPostElement && lastPostElement != lastPostHovered)
    ) {
      lastPostElement?.classList?.add("blur-post");
    }
  });
}

function mainSectionBlur() {
  initPostScrollListner();

  setInterval(() => {
    const parent = document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div > div:nth-child(1) > div > div > article"
    );

    if (!parent) return;

    if (parent == lastPostElement) return;

    if (lastPostElement == lastPostHovered) {
      lastPostElement?.classList?.remove("blur-post");
      lastPostHovered = parent;
      lastPostElement = parent;

      postElementListener(lastPostElement);
      return;
    }

    lastPostElement = parent;
    postElementListener(lastPostElement);
  }, 200);
}

function postBlur(data) {
  blurPostOnScroll = !!data?.blurOnScroll?.value;

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
  postCommentsBlur.initBlur(data);
}
