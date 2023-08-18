chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "Wył",
    });
  });

const pracujPl = 'https://www.pracuj.pl/praca'
function getData(url){
  console.log(url);
  var job =  document.querySelector('[data-scroll-id="job-title"]').textContent;
  console.log(job);
  var company =  document.querySelector('[data-scroll-id="employer-name"]').childNodes[0].nodeValue;
  var company3 =  document.querySelector('[data-scroll-id="employer-name"]');
  console.log(company);
  navigator.clipboard.writeText(company+"\n"+job+"\n"+url)
}

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(pracujPl)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'Wł' ? 'Wył' : 'Wł'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
    

    if (nextState === 'Wł') {
        // Insert the CSS file when the user turns the extension on
        //await chrome.scripting.insertCSS({
          //files: ['focus-mode.css'],
          //target: { tabId: tab.id }
        //});
        await   chrome.scripting.executeScript({
          target: {tabId: tab.id},
          function: getData,
          args: [tab.url]

        })

      } else if (nextState === 'Wył') {
        // Remove the CSS file when the user turns the extension off
        //await chrome.scripting.removeCSS({
          //files: ['focus-mode.css'],
          //target: { tabId: tab.id }
        //});
      }
    }
  });