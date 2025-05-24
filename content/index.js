if (typeof browser == "undefined") {
  globalThis.browser = chrome;
}

const settingsIdentifier = "data";

let intialData = {
  blurPost: false,
  blurTrending: false,
  blurMessage: false,
  blurProfilePicture: false,
  blurSearch: false,
  blurTextInputs: false,
};

const actionPopup = document.getElementById("action-popup");

Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(
  (input) => {
    input.addEventListener("change", (event) => {
      const key = event.target.getAttribute("eventId");
      const value = !!event.target.checked;

      intialData[key] = value;

      const button = document.querySelector(`button[eventId="${key}"]`);
      if (button) button.disabled = !value;

      browser.storage.sync.set({
        data: JSON.stringify(intialData),
      });
    });
  }
);

Array.from(document.querySelectorAll("button")).forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const rect = event.target.getBoundingClientRect();

    actionPopup.style.top = rect.y + "px";
    actionPopup.style.left = rect.x - 150 + "px";

    actionPopup.style.opacity = "1";

    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    }, 1);
  });
});

function handleOutsideClick(event) {
  if (event.target == actionPopup || actionPopup.contains(event.target)) return;

  actionPopup.style.opacity = "0";
  window.removeEventListener("click", handleOutsideClick, true);
}

function intiData() {
  browser.storage.sync.get([settingsIdentifier]).then((result) => {
    if (!result || !result.data) {
      browser.storage.sync.set({
        data: JSON.stringify(intialData),
      });
      return;
    }

    const data = JSON.parse(result.data);
    intialData = { ...intialData, ...data };
    browser.storage.sync.set(result);

    Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(
      (input) => {
        const key = input.getAttribute("eventId");
        input.checked = intialData[key];

        const button = document.querySelector(`button[eventId="${key}"]`);
        if (button) button.disabled = !intialData[key];

        console.log(intialData, key, button);
      }
    );
  });
}

intiData();
