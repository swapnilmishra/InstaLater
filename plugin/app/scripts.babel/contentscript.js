'use strict';

chrome.runtime.onMessage.addListener(handleOnMessageEvent);

function handleOnMessageEvent(request, sender, sendResponse) {
  switch (request.message) {
    case 'getSelectedContent':
      sendResponse({selectedContent: window.getSelection().toString()})
      break;
    default:
      break;
  }
}
