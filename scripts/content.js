const extensionId = "lbdopdgceicfambnplhaalbnhcpbdfee";
const imgUrl =
  "https://media.licdn.com/dms/image/C4E0BAQECFqP4gGGneQ/company-logo_200_200/0/1610469472545/brunsker_tecnologia_logo?e=1706140800&v=beta&t=S5KW7D91Zu_ZadgzZ8kMgwqVm96hsHK6zp75VzYMBak";

function changeImgs() {
  if (allImgsHasUrl()) return;

  const imgs = document.querySelectorAll("img");

  imgs.forEach((img) => {
    const parentElement = img.parentElement;
    const width = img.width;
    const height = img.height;
    parentElement.removeChild(img);

    const newImg = document.createElement("img");
    newImg.src = imgUrl;
    newImg.width = width;
    newImg.height = height;

    parentElement.appendChild(newImg);
  });
}

function allImgsHasUrl() {
  const imgs = Array.from(document.querySelectorAll("img"));
  if (!imgs) return false;
  return imgs.every((img) => img.src == imgUrl);
}

document.querySelector("body").addEventListener("click", function (event) {
  if (event.target.nodeName != "IMG") return;
  event.stopPropagation();
  event.preventDefault();
  const parentElement = event.target.parentElement;
  const newImg = document.createElement("img");
  newImg.src = imgUrl;
  newImg.width = event.target.width;
  newImg.height = event.target.height;
  parentElement.removeChild(event.target);
  parentElement.appendChild(newImg);
});

document.querySelector("body").addEventListener("mouseover", function (event) {
  if (event.target.nodeName != "IMG") return;
  event.stopPropagation();
  event.preventDefault();
  const parentElement = event.target.parentElement;
  const newImg = document.createElement("img");
  newImg.src = imgUrl;
  newImg.width = event.target.width;
  newImg.height = event.target.height;
  parentElement.removeChild(event.target);
  parentElement.appendChild(newImg);
});

const config = { attributes: true, childList: true, subtree: true };

// new MutationObserver(() => {
//   if(!chrome.runtime) return;
//   chrome.runtime.sendMessage(extensionId, { messageFromWeb: 'Minha Menssagem' }, function(respnse) {
//     console.log(respnse)
//   })
// }).observe(document, config);
