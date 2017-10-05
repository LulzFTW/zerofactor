var notp = require('notp');

console.log('zerofactor init');

function onLoad(result) {
  var selector = `[data-device-index="${result.device}"] .passcode-label`;
  var passcode = document.querySelector(selector);

  var input = passcode.querySelector('.passcode-input');
  var button = passcode.querySelector('.auth-button');

  var counter = parseInt(result.counter);
  var passcode = notp.hotp.gen(result.secret, {
    counter: counter
  });
  browser.storage.local.set({
    counter: counter + 1
  });
  console.log(passcode);

  input.value = passcode;
  button.click();
  input.value = '';
}

function onError(error) {
  console.log(`Error: ${error}`);
}

var getting = browser.storage.local.get();
getting.then(onLoad, onError);

