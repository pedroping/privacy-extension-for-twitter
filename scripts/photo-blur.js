let lastPhotoParent;
let lastPhotoCommentsParent;

function blurPhotoElement(elements) {
  Array.from(elements)
    .map((element) => element?.firstChild?.firstChild ?? element)
    .forEach((post) => {
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

function imagesBlur() {
  setInterval(() => {
    let parent = document.querySelector(
      "#layers > div:nth-child(2) > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-17gur6a.r-1pi2tsx.r-13qz1uu > div > div.css-175oi2r.r-16y2uox.r-1wbh5a2 > div.css-175oi2r.r-1pi2tsx.r-11yh6sk.r-buy8e9.r-13qz1uu > div.css-175oi2r.r-13awgt0.r-184en5c > div.css-175oi2r.r-13awgt0.r-1ny4l3l > div.css-175oi2r.r-16y2uox.r-10m9thr > ul"
    );

    if (!parent) {
      const otherParent = document.querySelector(
        "#layers > div:nth-child(2) > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-17gur6a.r-1pi2tsx.r-13qz1uu > div > div.css-175oi2r.r-16y2uox.r-1wbh5a2 > div.css-175oi2r.r-1pi2tsx.r-11yh6sk.r-buy8e9.r-13qz1uu > div.css-175oi2r.r-13awgt0.r-184en5c > div > div > div > div"
      );

      if (!otherParent) return;

      parent = {
        children: [otherParent],
      };
    }

    if (
      parent == lastPhotoParent ||
      parent?.children?.[0] == lastPhotoParent?.children?.[0]
    )
      return;

    lastPhotoParent = parent;

    blurPhotoElement(parent.children);
    observeDOM(parent, () => {
      blurPhotoElement(parent.children);
    });
  }, 200);
}

function blurPhotoComments(elements) {
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
      lastPostHovered = post;
    });
    post.addEventListener("mousemove", () => {
      post.classList.remove("blur-post");
      lastPostHovered = post;
    });
    post.addEventListener("mouseleave", () => {
      post.classList.add("blur-post");
      lastPostHovered = null;
    });
  });
}

function photoCommentsBlur() {
  setInterval(() => {
    const parent = document.querySelector(
      "#layers > div:nth-child(2) > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-17gur6a.r-1pi2tsx.r-13qz1uu > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-th6na.r-1phboty.r-1dqxon3.r-1hycxz > section > div > div"
    );

    if (!parent) return;

    if (parent == lastPhotoCommentsParent) return;
    lastPhotoCommentsParent = parent;

    blurPhotoComments(parent.children);

    observeDOM(parent, () => {
      blurPhotoComments(parent.children);
    });
  }, 50);
}

function photoBlur(data) {
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

  imagesBlur();
  photoCommentsBlur();
}
