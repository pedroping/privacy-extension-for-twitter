let lastMessageParent;

function blurMessagesElements(elements) {
  Array.from(elements).forEach((post, i) => {
    if (
      post.classList.contains("blur-message") ||
      post.getAttribute("element-init") ||
      i < 1
    )
      return;

    post.classList.add("blur-message");
    post.setAttribute("element-init", true);

    post.addEventListener("mouseenter", () => {
      post.classList.remove("blur-message");
    });

    post.addEventListener("mousemove", () => {
      post.classList.remove("blur-message");
    });

    post.addEventListener("mouseleave", () => {
      post.classList.add("blur-message");
    });
  });
}

function initMessageDropdownBlur(data) {
  if (!data?.blurMessage?.value) {
    document.body.style.setProperty("--message-blur-amount", "0px");
    document.body.style.setProperty("--message-blur-gray-scale", "0");
    return;
  }

  document.body.style.setProperty(
    "--message-blur-amount",
    (data.blurMessage.blurAmount || 10) + "px"
  );
  document.body.style.setProperty("--message-blur-gray-scale", "1");

  setInterval(() => {
    const parent =
      document.querySelector(
        "#layers > div > div:nth-child(2) > div > div > div > div > div > div > div.css-175oi2r.r-kemksi.r-16y2uox.r-f8sm7e.r-13qz1uu.r-1ye8kvj > section > div > div"
      ) ||
      document.querySelector(
        "#layers > div > div:nth-child(2) > div > div > div > div > div.r-6koalj.r-eqz5dr.r-16y2uox > div > div > div > div.css-175oi2r.r-150rngu.r-kemksi.r-11yh6sk.r-st84sj.r-j3xhw6.r-ouzzow.r-16y2uox.r-1pi2tsx > div.css-175oi2r.r-16y2uox.r-10m9thr.r-1h0z5md.r-f8sm7e.r-13qz1uu.r-3pj75a.r-1ye8kvj > div"
      );

    if (!parent) return;

    if (parent == lastMessageParent) return;

    lastMessageParent = parent;

    blurMessagesElements(parent.children);
    observeDOM(parent, () => {
      blurMessagesElements(parent.children);
    });
  }, 200);
}
