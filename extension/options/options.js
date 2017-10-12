function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    device: document.querySelector("#device").value,
    secret: document.querySelector("#secret").value,
    counter: document.querySelector("#counter").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    if (result.device) {
      document.querySelector("#device").value = result.device;
    }
    if (result.secret) {
      document.querySelector("#secret").value = result.secret;
    }
    if (result.counter) {
      document.querySelector("#counter").value = result.counter;
    }
  }

  var getting = browser.storage.local.get();
  getting.then(setCurrentChoice, onError);
}

function importQR(e) {
  e.preventDefault();

  var parsedUrl = new URL(document.querySelector("#url").value);
  var data = parsedUrl.searchParams.get('value').split('-');

  var code = data[0];
  var host = atob(data[1]);

  fetch(`https://${host}/push/v2/activation/${code}`, {
    method: 'post'
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    if (json.stat == "OK") {
      var secret = json.response.hotp_secret;
      document.querySelector("#secret").value = secret;
      document.querySelector("#counter").value = 0;
    } else {
      onError(json.message || 'Invalid reponse');
    }
  });
}

function onError(error) {
  console.log(`Error: ${error}`);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#config").addEventListener("submit", saveOptions);
document.querySelector("#config").addEventListener("reset", e => {
    browser.storage.local.clear();
});
document.querySelector("#qr").addEventListener("submit", importQR);
