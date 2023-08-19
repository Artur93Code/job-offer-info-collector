chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
    chrome.action.setBadgeBackgroundColor(
      {color: '#FF0000'},  
      () => { /* ... */ },
    );
  });

const pracujPl = 'https://www.pracuj.pl/praca'


//Change badge text when swith on active tab with Pracuj.pl offer
chrome.tabs.onActivated.addListener(async (tab) => {
    //get url active tab
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      let url = tabs[0].url;
      //Use `url` here inside the callback because it's asynchronous!
      if (url.startsWith(pracujPl) && url.includes('oferta')) {
        chrome.action.setBadgeText({
          tabId: tab.id,
          text: "ON",
        });
        chrome.action.setBadgeBackgroundColor(
          {color: '#00FF00'},  
          () => { /* ... */ },
        );

      }else{
        chrome.action.setBadgeText({
          tabId: tab.id,
          text: "OFF",
        });
        chrome.action.setBadgeBackgroundColor(
          {color: '#FF0000'},  
          () => { /* ... */ },
        );
      }
  });
});

//Change badge text active tab is updated. Check new url on active tab
chrome.tabs.onUpdated.addListener(function
  (tabId, changeInfo, tab) {
    if (changeInfo.url) {
  //get url active tab
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    //Use `url` here inside the callback because it's asynchronous!
    if (url.startsWith(pracujPl) && url.includes('oferta')) {
      chrome.action.setBadgeText({
        tabId: tab.id,
        text: "ON",
      });
      chrome.action.setBadgeBackgroundColor(
        {color: '#00FF00'},  
        () => { /* ... */ },
      );
    }else{
      chrome.action.setBadgeText({
        tabId: tab.id,
        text: "OFF",
      });
      chrome.action.setBadgeBackgroundColor(
        {color: '#FF0000'},  
        () => { /* ... */ },
      );
    }
});
    }
});

//get company name, job title and url address from offer
function getData(url){
  console.log(url);
  var job =  document.querySelector('[data-scroll-id="job-title"]').textContent;
  console.log(job);
  var company =  document.querySelector('[data-scroll-id="employer-name"]').childNodes[0].nodeValue;
  console.log(company);
  navigator.clipboard.writeText(company+"\n"+job+"\n"+url);
  alert("Job Title, Company and Link to Offer copied to clipboard");
}

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(pracujPl) && tab.url.includes('oferta')) {
    
    await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: getData,
      args: [tab.url]

      })
    }
  });