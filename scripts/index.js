console.log('HAHAHAHAHAHH OLHA O LOG', document);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log('teste', request, sender, sendResponse);
  sendResponse('我收到你的消息');
});