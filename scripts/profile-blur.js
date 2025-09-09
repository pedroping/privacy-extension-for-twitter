let lastHeaderHovered;
let lastHeaderInfoElement;
let blurProfileOnScroll = false;

function initProfileScrollListner() {
  window.addEventListener("scroll", () => {
    if (
      blurProfileOnScroll ||
      (lastHeaderInfoElement && lastHeaderInfoElement != lastHeaderHovered)
    ) {
      lastHeaderInfoElement?.classList?.add("blur-profile");
    }
  });
}

function profileHeaderElementListener(element) {
  if (!element) return;

  element?.classList?.add("blur-profile");
  element?.setAttribute("element-init", true);

  element.addEventListener("mouseenter", () => {
    if (lastHeaderInfoElement != element) return;

    element.classList.remove("blur-profile");
    lastHeaderHovered = element;
  });

  element.addEventListener("mousemove", () => {
    if (lastHeaderInfoElement != element) return;

    element.classList.remove("blur-profile");
    lastHeaderHovered = element;
  });

  element.addEventListener("mouseleave", () => {
    if (lastHeaderInfoElement != element) return;

    element.classList.add("blur-profile");
    lastHeaderHovered = null;
  });
}

function blurProfileHeader() {
  setInterval(() => {
    const headerInfoParent = document.querySelector(
      "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div:nth-child(3) > div > div > div:nth-child(1)"
    );

    if (!headerInfoParent) return;

    if (headerInfoParent != lastHeaderInfoElement) {
      lastHeaderInfoElement?.classList?.remove("blur-profile");
      lastHeaderInfoElement = headerInfoParent;
      profileHeaderElementListener(headerInfoParent);
    }
  }, 200);
}

function startProfileBlur(data) {
  blurProfileOnScroll = !!data?.blurOnScroll?.value;

  if (!data?.blurProfile?.value) {
    document.body.style.setProperty("--profile-blur-amount", "0px");
    document.body.style.setProperty("--profile-blur-gray-scale", "0");
    return;
  }

  document.body.style.setProperty(
    "--profile-blur-amount",
    (data.blurProfile.blurAmount || 10) + "px"
  );
  document.body.style.setProperty("--profile-blur-gray-scale", "1");

  profileBlur.initBlur(data);

  initProfileScrollListner();
  blurProfileHeader();
}
