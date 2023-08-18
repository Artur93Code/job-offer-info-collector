chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });

const pracujPl = 'https://www.pracuj.pl/praca'

//Change badge text when dedected Pracuj.pl on active tab
chrome.tabs.onActivated.addListener(async (tab) => {
  //get url active tab
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    //Use `url` here inside the callback because it's asynchronous!
    if (url.startsWith(pracujPl)) {
      chrome.action.setBadgeText({
        tabId: tab.id,
        text: "ON",
      });
    }else{
      chrome.action.setBadgeText({
        tabId: tab.id,
        text: "OFF",
      });
    }
});
});

function getData(url){
  console.log(url);
  var job =  document.querySelector('[data-scroll-id="job-title"]').textContent;
  console.log(job);
  var company =  document.querySelector('[data-scroll-id="employer-name"]').childNodes[0].nodeValue;
  console.log(company);
  navigator.clipboard.writeText(company+"\n"+job+"\n"+url)
}

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(pracujPl)) {
    
    await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: getData,
      args: [tab.url]

      })
    }
  });