'use strict';

var savingEl = document.querySelector('#saving'),
    savedEl = document.querySelector('#saved'),
    saveBtn = document.querySelector('#saveBtn')

saveBtn.addEventListener('click', function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: 'getSelectedContent'}, function(response) {
      console.log(response.selectedContent);
      sendRequestToServer(response.selectedContent);
    });
  });
})

function sendRequestToServer(data){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `http://localhost:3000?data=${data}`, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // JSON.parse does not evaluate the attacker's scripts.
      var resp = JSON.parse(xhr.responseText);
      savedEl.classList.remove('hide');
      savedEl.classList.add('show');
      savingEl.classList.add('hide');
    }
  }
  xhr.send();
}
