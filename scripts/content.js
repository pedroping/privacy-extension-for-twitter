const imgUrl =
  "https://media.licdn.com/dms/image/D4E35AQETAqiK4ib7CQ/profile-framedphoto-shrink_800_800/0/1632423158873?e=1698854400&v=beta&t=6Dj84AtVqWsTcI9Hmkcqtka-YsopHYr9dFIpUV7-zc0";

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
  const imgs = document.querySelectorAll("img").toArray();
  if (!imgs) return false;
  return imgs.every((img) => img.src == imgUrl);
}

// changeImgs();

const config = { attributes: true, childList: true, subtree: true };

new MutationObserver(() => {
  // changeImgs()
}).observe(document, config);
