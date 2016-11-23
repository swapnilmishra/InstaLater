'use strict';

chrome.runtime.onInstalled.addListener(details => {
  createContentxMenu()
  chrome.browserAction.onClicked.addListener(getSelectedContent)
})

/**
 * Create a context menu which will only show up for images.
 */

function createContentxMenu(){
  chrome.contextMenus.create({
    'title' : 'Save image to Insta Later',
    'type' : 'normal',
    'contexts' : ['image'],
    'onclick' : handleContextMenuClick
  })
}

function getSelectedContent(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: 'getSelectedContent'}, function(response) {
      const articleBaseObject = getArticleBaseObject()
      const {selectedContent} = response

      if(!selectedContent){
        sendRequest(Object.assign(articleBaseObject,{articleUrl: tabs[0].url}))
        return;
      }
      sendRequest(Object.assign(articleBaseObject,{textContent:selectedContent}))
    });
  });
}

function handleContextMenuClick(info,tab) {
    const articleBaseObject = getArticleBaseObject()
    const {srcUrl} = info
    sendRequest(Object.assign(articleBaseObject,{imageUrl:srcUrl}))
};

function sendRequest(articleObj){
    const articleParamObj = fromObjectToUrlParam(articleObj)
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/saveData?${articleParamObj}`, true)
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        const resp = JSON.parse(xhr.responseText);
        let message = 'article url';
        if(articleObj.textContent){
          message = 'text snippet'
        }
        else if(articleObj.imageUrl){
          message = 'image'
        }
        createNotification(`Saved the ${message} for you!`)
      }
    }
    xhr.send()
}

function createNotification(message = 'Your data is saved'){
  var opt = {
    type: "basic",
    title: "Insta Later",
    message ,
    iconUrl: "../images/ic_restore_black_24dp_1x.png"
  }
  chrome.notifications.create(opt)
}

function getArticleBaseObject(){
  const savedDate = new Date().toString()

  return ({savedDate});
}

function fromObjectToUrlParam(obj){
  const keys = Object.keys(obj)

  return keys.map((key) => {
    return `${key}=${obj[key]}`
  }).join('&')
}
