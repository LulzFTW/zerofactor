var notp = require('notp');

console.log('zerofactor init');

function login(deviceName, secret, counter) {
  try {
    var deviceID = getDeviceID(deviceName);
    var passcode = notp.hotp.gen(secret, {
      counter
    });

    sendInput(deviceID, passcode);

    // increment HOTP counter
    browser.storage.local.set({
      counter: counter + 1
    });
  } catch (e) {
    onError(e);
  }
}

function getDeviceID(deviceName) {
  var devices = document.querySelector('select[name="device"]');
  for (var i = 0; i < devices.options.length; i++) {
    var option = devices.options[i];
    if (option.text == deviceName) {
      return option.value;
    }
  }
  throw new Error(`device ${deviceName} not found`);
}

function sendInput(deviceID, passcode) {
  var selector = `[data-device-index="${deviceID}"] .passcode-label`;
  var row = document.querySelector(selector);

  var input = row.querySelector('.passcode-input');
  var button = row.querySelector('.auth-button');

  input.value = passcode;
  button.click();
  input.value = '';
}

function onLoad(result) {
  var counter = parseInt(result.counter)
  login(result.device, result.secret, counter);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

var getting = browser.storage.local.get();
getting.then(onLoad, onError);

