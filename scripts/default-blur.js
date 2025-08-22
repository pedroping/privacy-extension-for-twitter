class DefaultBlur {
  allPostsList = [];
  lastPostsParent = null;
  scrollStart = false;
  lastElementHovered = null;

  data;
  dataKey;
  cssClass;
  getParentFn;
  listBlurFn;
  customListValidation;

  constructor(
    _data,
    _dataKey,
    _cssClass,
    _getParentFn,
    _listBlurFn = this.defaultListBlurFn,
    _customListValidation = null
  ) {
    this.data = _data;
    this.dataKey = _dataKey;
    this.cssClass = _cssClass;
    this.getParentFn = _getParentFn;
    this.listBlurFn = _listBlurFn;
    this.customListValidation = _customListValidation;

    this.initPostsScrollListner();
  }

  initBlur(_data) {
    this.data = _data;

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

    setInterval(() => {
      const parent = this.getParentFn();

      if (!parent) return;

      if (parent == this.lastPostsParent) return;
      this.lastPostsParent = parent;

      this.blurPostElements(parent.children);

      observeDOM(parent, () => {
        this.blurPostElements(parent.children);
      });
    }, 50);
  }

  defaultListBlurFn(post) {
    if (post != this.lastElementHovered) post.classList.add("blur-post");
  }

  debounce(func, wait) {
    var timeout;

    return () => {
      var args = arguments;

      this.scrollStart = true;
      this.allPostsList.forEach(this.listBlurFn.bind(this));

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
          this.allPostsList.forEach(this.listBlurFn.bind(this));
        }, 1);
      }, 200)
    );
  }

  blurFn(post, action) {
    let timeOut = false;
    let onFirst = true;

    return () => {
      if (action == "add") {
        this.lastElementHovered?.classList?.add("blur-post");
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

        post.classList[action]("blur-post");
        this.lastElementHovered = post;
      }, 10);
    };
  }

  blurPostElements(elements) {
    this.allPostsList.forEach(this.listBlurFn.bind(this));

    Array.from(elements).forEach((post, i) => {
      if (
        this.customListValidation &&
        !this.customListValidation.apply(this, post, i)
      )
        return;

      if (post.getAttribute("element-init") || this.allPostsList.includes(post))
        return;
      
      if (post != this.lastElementHovered) post.classList.add("blur-post");

      this.allPostsList.push(post);

      post.setAttribute("element-init", true);
      post.addEventListener("mouseenter", this.blurFn(post, "remove"));
      post.addEventListener("mousemove", this.blurFn(post, "remove"));
      post.addEventListener("mouseleave", this.blurFn(post, "add"));
    });
  }
}
