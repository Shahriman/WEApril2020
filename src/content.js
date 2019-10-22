browser.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.method == "returnSelected") {
      sendResponse({ data: window.getSelection().toString() });
    } else {
      sendResponse({});
    }
  }
)
