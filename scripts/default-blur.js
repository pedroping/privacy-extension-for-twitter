class DefaultBlur {
  allPostsList = [];
  lastPostsParent = null;
  scrollStart = false;
  lastElementHovered = null;
  blurStart = false;

  interval = null;
  observer = null;

  data;
  dataKey;
  cssClass;
  getParentFn;
  hasTrending;
  hasMessages;

  constructor(
    _data,
    _dataKey,
    _cssClass,
    _getParentFn,
    _hasTrending = "",
    _hasMessages = false
  ) {
    this.data = _data;
    this.dataKey = _dataKey;
    this.cssClass = _cssClass;
    this.getParentFn = _getParentFn;
    this.hasTrending = _hasTrending;
    this.hasMessages = _hasMessages;

    this.initPostsScrollListner();
  }

  initBlur(_data, relatedClass = null) {
    this.data = _data;
    this.blurStart = true;
    disableOtherBlurs(this, relatedClass);

    if (this.hasTrending) trendingBlur(_data, this.hasTrending);
    if (this.hasMessages) initMessageDropdownBlur(_data);

    if (!this.data?.[this.dataKey]?.value) {
      document.body.style.setProperty(`--${this.cssClass}-blur-amount`, "0px");
      document.body.style.setProperty(
        `--${this.cssClass}-blur-gray-scale`,
        "0"
      );
      return;
    }

    document.body.style.setProperty(
      `--${this.cssClass}-blur-amount`,
      (this.data?.[this.dataKey]?.blurAmount || 10) + "px"
    );
    document.body.style.setProperty(`--${this.cssClass}-blur-gray-scale`, "1");

    this.disable(true);

    this.interval = setInterval(() => {
      const parent = this.getParentFn();

      if (!parent) return;

      if (parent == this.lastPostsParent) return;
      this.lastPostsParent = parent;

      this.blurPostElements(parent.children);

      this.observer = observeDOM(parent, () => {
        this.blurPostElements(parent.children);
      });
    }, 50);
  }

  disable(withouCheck = false) {
    if (!withouCheck && !this.blurStart) return;

    if (!withouCheck) this.blurStart = false;
    if (this.interval) clearInterval(this.interval);

    this.observer?.disconnect?.();
    this.lastPostsParent = null;

    if (withouCheck) return;

    this.allPostsList.forEach((post) => {
      post.classList.remove(`blur-${this.cssClass}`);
      post.removeAttribute("element-init");
    });
    this.allPostsList = [];
    this.lastElementHovered = null;
  }

  debounce(func, wait) {
    var timeout;

    return () => {
      var args = arguments;

      this.scrollStart = true;
      this.allPostsList.forEach((post) => {
        if (post != this.lastElementHovered)
          post.classList.add(`blur-${this.cssClass}`);
      });

      var later = function () {
        timeout = null;
        func.apply(this, args);
      };
      var callNow = !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(this, args);
    };
  }

  initPostsScrollListner() {
    window.addEventListener(
      "scroll",
      this.debounce(() => {
        this.scrollStart = false;

        setTimeout(() => {
          this.allPostsList.forEach((post) => {
            if (post != this.lastElementHovered)
              post.classList.add(`blur-${this.cssClass}`);
          });
        }, 1);
      }, 200)
    );
  }

  blurFn(post, action) {
    let timeOut = false;
    let onFirst = true;

    return () => {
      if (action == "add") {
        this.lastElementHovered?.classList?.add(`blur-${this.cssClass}`);
        this.lastElementHovered = null;
        onFirst = false;
      }

      if (onFirst) {
        setTimeout(() => {
          onFirst = false;
        }, 10);
        return;
      }
      if (timeOut) return;

      timeOut = true;

      setTimeout(() => {
        timeOut = false;

        if (this.scrollStart) return;

        post.classList[action](`blur-${this.cssClass}`);
        this.lastElementHovered = post;
      }, 10);
    };
  }

  blurPostElements(elements) {
    this.allPostsList.forEach((post) => {
      if (post != this.lastElementHovered)
        post.classList.add(`blur-${this.cssClass}`);
    });

    Array.from(elements).forEach((post) => {
      if (post.getAttribute("element-init") || this.allPostsList.includes(post))
        return;

      if (post != this.lastElementHovered)
        post.classList.add(`blur-${this.cssClass}`);

      this.allPostsList.push(post);

      post.setAttribute("element-init", true);
      post.addEventListener("mouseenter", this.blurFn(post, "remove"));
      post.addEventListener("mousemove", this.blurFn(post, "remove"));
      post.addEventListener("mouseleave", this.blurFn(post, "add"));
    });
  }
}
