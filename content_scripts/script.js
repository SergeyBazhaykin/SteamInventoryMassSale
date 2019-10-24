const elements = document.getElementsByClassName('itemHolder');

window.addEventListener('message', function(event) {
  if (event.data.type === 'page_js_command') {
    appStep3(event.data.data.price);
  }
});

function appStep3(price) {
  for (let e of elements) {
    if (!e.hasChildNodes() || e.style.display === 'none') continue;
    let elemChildes = e.childNodes;
    if (elemChildes[0].type !== 'checkbox' || !elemChildes[0].checked) continue;
    let elementId = elemChildes[1].id;
    let appId = parseInt(elementId);
    let counter = appId.toString().length;
    let contextId = parseInt(elementId.slice(counter + 1));
    counter += contextId.toString().length;
    let assetId = parseInt(elementId.slice(counter + 2));
    console.log(price, g_sessionID);
    $J.ajax({
      url: 'https://steamcommunity.com/market/sellitem/',
      type: 'POST',
      async: false,
      data: {
        sessionid: g_sessionID,
        appid: appId,
        contextid: contextId,
        assetid: assetId,
        amount: 1,
        price: price,
      },
      crossDomain: true,
      xhrFields: {
        withCredentials: true,
      },
    }).done(function(data) {
      window.postMessage({
            type: 'page_js_log',
            data: {success: true, price: price},
          },
          '*' /* targetOrigin: any */);
    }).fail(function(jqxhr) {
      let data = $J.parseJSON(jqxhr.responseText);
      window.postMessage({
            type: 'page_js_log',
            data: {success: false, error: data},
          },
          '*' /* targetOrigin: any */);
    });
  }
}
