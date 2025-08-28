if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

const settingsIdentifier = "data";

let initialData = {
  blurPost: {
    value: false,
    blurAmount: 10,
  },
  blurProfile: {
    value: false,
    blurAmount: 10,
  },
  blurTrending: {
    value: false,
    blurAmount: 10,
  },
  blurMessage: {
    value: false,
    blurAmount: 10,
  },
  blurSearch: {
    value: false,
    blurAmount: 10,
  },
  blurCommunities: {
    value: false,
    blurAmount: 10,
  },
  blurBookmarks: {
    value: false,
    blurAmount: 10,
  },
  blurExplore: {
    value: false,
    blurAmount: 10,
  },
  blurOnScroll: {
    value: false,
    blurAmount: 0,
  },
  blurNotifications: {
    value: false,
    blurAmount: 0,
  },
};

// blurTextInputs: {
//   value: false,
//   blurAmount: 10,
// },
// blurProfilePicture: {
//   value: false,
//   blurAmount: 10,
// },

let selectedData = {
  key: "",
  data: null,
};

const actionPopup = document.getElementById("action-popup");

function handleOutsideClick(event) {
  if (event.target == actionPopup || actionPopup.contains(event.target)) return;

  actionPopup.style.opacity = "0";

  const input = actionPopup.querySelector("input");

  initialData[selectedData.key] = {
    ...selectedData.data,
    blurAmount: Number(input.value),
  };

  browser.storage.sync.set({
    data: JSON.stringify(initialData),
  });

  selectedData = {
    key: "",
    data: null,
  };

  window.removeEventListener("click", handleOutsideClick, true);
}

function initAllCheckboxListener() {
  Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(
    function (input) {
      input.addEventListener("change", function (event) {
        const key = event.target.getAttribute("eventId");
        const value = !!event.target.checked;

        if (!key) return;

        initialData[key] = {
          value,
          blurAmount: initialData[key].blurAmount ?? 10,
        };

        const button = document.querySelector(`button[eventId="${key}"]`);
        if (button) button.disabled = !value;

        const isAnySelected = Object.keys(initialData).some(
          (key) => initialData[key].value
        );

        document.getElementById("globalBlur").checked = isAnySelected;

        browser.storage.sync.set({
          data: JSON.stringify(initialData),
        });
      });
    }
  );
}

function initGlobalCheckBoxListener() {
  document.getElementById("globalBlur").addEventListener("input", (event) => {
    const checked = event.target.checked;

    Object.keys(initialData).forEach((key) => {
      if (!key) return;

      const input = document.querySelector(`input[eventId="${key}"]`);

      if (!input) return;

      input.checked = checked;

      initialData[key].value = checked;

      browser.storage.sync.set({
        data: JSON.stringify(initialData),
      });
    });
  });
}

function initPopUpAndDownListener() {
  const input = actionPopup.querySelector("input");
  const more = document.getElementById("more");
  const less = document.getElementById("less");
  const reset = document.getElementById("resetBlur");

  more.addEventListener("click", () => {
    const newValue = Number(input.value || 0) + 1;

    input.value = newValue;
  });

  less.addEventListener("click", () => {
    const newValue = Math.max(Number(input.value || 0) - 1, 0);

    input.value = newValue;
  });

  reset.addEventListener("click", () => {
    input.value = selectedData.data.blurAmount ?? 10;
  });
}

function initAllConfigButtonsListener() {
  Array.from(document.querySelectorAll("button")).forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const eventId = button.getAttribute("eventId");

      if (!eventId) return;

      const data = initialData[eventId];

      if (!data.value) return;

      const rect = event.target.getBoundingClientRect();

      actionPopup.style.top = rect.y + "px";
      actionPopup.style.left = rect.x - 150 + "px";

      actionPopup.style.opacity = "1";

      const input = actionPopup.querySelector("input");

      selectedData = {
        data,
        key: eventId,
      };
      input.value = data.blurAmount;

      setTimeout(function () {
        window.addEventListener("click", handleOutsideClick);
      }, 1);
    });
  });
}

function intiData() {
  browser.storage.sync.get([settingsIdentifier]).then((result) => {
    if (!result || !result.data) {
      browser.storage.sync.set({
        data: JSON.stringify(initialData),
      });
      return;
    }

    const data = JSON.parse(result.data);

    document.getElementById("globalBlur").checked = Object.keys(data).find(
      (el) => el && data?.[el]?.value
    );

    initialData = { ...initialData, ...data };
    browser.storage.sync.set(result);

    Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(
      function (input) {
        const key = input.getAttribute("eventId");

        if (!key) return;

        input.checked = initialData[key].value;

        const button = document.querySelector(`button[eventId="${key}"]`);
        if (button) button.disabled = !initialData[key].value;
      }
    );
  });
}

initAllConfigButtonsListener();
initGlobalCheckBoxListener();
initPopUpAndDownListener();
initAllCheckboxListener();
intiData();
