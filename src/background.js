// Google seems to change the language codes sometimes. English used to be en_CA, en_US, en_GB, etc.
// but none of those work anymore.
const TRANSLATION_URL_SLUG = "https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text="

function onCreated() {
  if (browser.runtime.lastError) {
    console.debug(`Error: ${browser.runtime.lastError}`);
  } else {
    console.debug("send-to-translate extension initialized.");
  }
}

browser.menus.create({
  id: "translate",
  title: "Translate selected...",
  // see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/ContextType
  contexts: ["selection"]
}, onCreated);

browser.contextMenus.onClicked.addListener(function (info, tab) {
  browser.tabs.query({ active: true, windowId: browser.windows.WINDOW_ID_CURRENT }, function (tabs) {
    browser.tabs.sendMessage(tabs[0].id, { method: "returnSelected" }, function (response) {
      openTranslateTab(response.data);
    });
  });
});

function openTranslateTab(selectedText) {
  let url = TRANSLATION_URL_SLUG + selectedText;
  browser.tabs.create({ url: url });
}
