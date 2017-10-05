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

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get();
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("reset", e => {
    browser.storage.local.clear();
});
