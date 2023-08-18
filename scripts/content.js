var job =  document.querySelector('[data-scroll-id="job-title"]').textContent;
console.log(job);
var company =  document.querySelector('[data-scroll-id="employer-name"]').textContent;
console.log(company);
navigator.clipboard.writeText(job+"\n"+company)