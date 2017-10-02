console.log('zerofactor init');

var device = document.querySelector('[data-device-index="phone1"]');
var passcode = device.querySelector('.passcode-label');

var input = passcode.querySelector('.passcode-input');
var button = passcode.querySelector('.auth-button');

input.value = '1337';
button.click();
input.value = '';

