let content = document.getElementById('content');
const marketCommission = 0.86956521739131;

let button1 = document.createElement('button');
button1.type = 'button';
button1.onclick = () => {
  chrome.tabs.query({active: true, currentWindow: true},
      function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {func: 'appStep1'});
      });
};
button1.style.fontSize = '16px';
button1.innerHTML = 'Step 1: add checkboxes';
button1.style.position = 'relative';
button1.style.height = '69px';
button1.style.width = '200px';
content.appendChild(button1);

let inputPriceDiv = document.createElement('div');
inputPriceDiv.style.marginLeft = '210px';
inputPriceDiv.style.width = '200px';
inputPriceDiv.style.top = '-80px';
inputPriceDiv.style.position = 'relative';
let PriceText = document.createElement('p');
PriceText.style.fontSize = '16px';
PriceText.style.position = 'relative';
PriceText.style.color = 'black';
PriceText.innerHTML = 'Step 2. Buyer pays (rub.):';
inputPriceDiv.appendChild(PriceText);
let inputPrice = document.createElement('input');
inputPrice.type = 'text';
inputPrice.style.fontSize = '16px';
inputPrice.style.position = 'relative';
inputPrice.style.marginLeft = '5px';
inputPrice.style.color = 'black';
inputPrice.style.width = '190px';
inputPrice.onsubmit = () => {
};
inputPriceDiv.appendChild(inputPrice);
content.appendChild(inputPriceDiv);

let button2 = document.createElement('button');
button2.type = 'button';
button2.onclick = () => {
  chrome.tabs.query({active: true, currentWindow: true},
      function(tabs) {
        const value = parseInt(content.childNodes[1].childNodes[1].value);
        chrome.tabs.sendMessage(tabs[0].id, {
              func: 'appStep3', price: Math.round(
              value *
              marketCommission *
              100),
            });
      });
};
button2.style.fontSize = '16px';
button2.innerHTML = 'Step 3: sell items';
button2.style.position = 'relative';
button2.style.marginLeft = '420px';
button2.style.height = '69px';
button2.style.top = '-144px';
button2.style.zIndex = '10';
content.appendChild(button2);

let button3 = document.createElement('button');
button3.type = 'button';
button3.onclick = () => {
  chrome.tabs.query({active: true, currentWindow: true},
      function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {func: 'checkAll'});
      });
};
button3.style.fontSize = '16px';
button3.innerHTML = '(Un)check all';
button3.style.position = 'relative';
button3.style.height = '69px';
button3.style.top = '-135px';
button3.style.zIndex = '10';
content.appendChild(button3);
