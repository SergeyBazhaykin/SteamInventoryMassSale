const elements = document.getElementsByClassName('itemHolder');
let totalCheckboxes = 0, totalSelectedCheckboxes = 0, totalUnselectedCheckboxes = 0, totalSelled = 0, totalFailed = 0;
let lastMes3 = '', lastMes4 = '';

const s = document.createElement('script');
s.src = chrome.runtime.getURL('content_scripts/script.js');
(document.end || document.documentElement).appendChild(s);

let logSIMSdiv = document.createElement('div');
logSIMSdiv.style.marginLeft = '100px';
logSIMSdiv.style.width = '260px';
logSIMSdiv.style.height = 'auto';
logSIMSdiv.style.top = '-75px';
logSIMSdiv.style.position = 'relative';
logSIMSdiv.style.color = 'white';
logSIMSdiv.innerHTML = 'SIMS log.';
let simsLogInv = document.getElementById('inventory_logos').
    appendChild(logSIMSdiv);

function appStep1() {
  let i = 0;
  for (let e of elements) {
    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = false;
    checkBox.style.zIndex = '10';
    checkBox.style.position = 'absolute';
    checkBox.addEventListener('click', function() {
      handleClickLog(this);
    });
    if (e.firstElementChild.id === 'market_sell_dialog_item' ||
        e.firstElementChild.type === 'checkbox') continue;
    e.insertBefore(checkBox, e.firstElementChild);
    i++;
  }
  totalCheckboxes += i;
  return {added: i};
}

function checkAll() {
  let i = 0, j = 0;
  for (let e of elements) {
    if (e.hasChildNodes() && e.firstElementChild.type ===
        'checkbox') {
      if (e.firstElementChild.checked) {
        j++;
      } else {
        i++;
      }
      e.firstElementChild.checked = !e.firstElementChild.checked;
    }
  }
  return {checked: i, unchecked: j};
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.func === 'appStep1') {
        let resp = appStep1();
        simsLog1(resp.added);
      }
      if (request.func === 'appStep3') {
        window.postMessage({
              type: 'page_js_command',
              data: {price: request.price},
            },
            '*' /* targetOrigin: any */);
      }
      if (request.func === 'checkAll') {
        let resp = checkAll();
        simsLog2(resp.checked - resp.unchecked, resp.unchecked - resp.checked);
      }
    },
);

window.addEventListener('message', function(event) {
  if (event.data.type === 'page_js_log') {
    event.data.data.success ?
        simsLog3('Selling.. (You receive: ' + event.data.data.price / 100 + 'rub)') :
        simsLog4('Failed..' + JSON.stringify(event.data.data.error));
  }
});

function handleClickLog(cb) {
  cb.checked ? simsLog2(1, -1) : simsLog2(-1, 1);
}

function simsLog1(i) {
  let inn = simsLogInv.innerHTML.split('<br>');
  inn[0] = 'SIMS log. Chechboxes: ' + totalCheckboxes + ' (added: ' + i + ')';
  simsLogInv.innerHTML = inn.join('<br>');
  simsLog2(0, i);
}

function simsLog2(i, j) {
  totalSelectedCheckboxes += i;
  totalUnselectedCheckboxes += j;
  let inn = simsLogInv.innerHTML.split('<br>');
  inn[1] = 'Selected: ' + totalSelectedCheckboxes + ' , unselected: ' + totalUnselectedCheckboxes;
  simsLogInv.innerHTML = inn.join('<br>');
}

function simsLog3(message) {
  let inn = simsLogInv.innerHTML.split('<br>');
  if (lastMes3 === message) {
    totalSelled++;
    inn[2] = message + '. Total: ' + totalSelled;
  } else {
    totalSelled = 1;
    lastMes3 = message;
    inn[2] = message + '. Total: ' + totalSelled;
  }
  simsLogInv.innerHTML = inn.join('<br>');
}

function simsLog4(message) {
  let inn = simsLogInv.innerHTML.split('<br>');
  if (lastMes4 === message) {
    totFail++;
    inn[3] = message + '. Total: ' + totSel;
  } else {
    totFail = 1;
    lastMes4 = message;
    inn[3] = message + '. Total: ' + totSel;
  }
  simsLogInv.innerHTML = inn.join('<br>');
}
