chrome.webRequest.onBeforeSendHeaders.addListener(function (detail) {
  // change origin for bypass CORS
  if ("url" in detail && "initiator" in detail) {
    if (detail.url.indexOf("https://www.instagram.com/") != -1 && detail.initiator.indexOf("chrome-extension://") != -1) {
      var newRef = "https://www.instagram.com/";
      var gotRef = false;
      for (var n in detail.requestHeaders) {
        gotRef = detail.requestHeaders[n].name.toLowerCase() == "referer";
        if (gotRef) {
          detail.requestHeaders[n].value = newRef;
          break;
        }
      }
      if (!gotRef) {
        detail.requestHeaders.push({ name: "referer", value: newRef });
      }
      var newOri = "https://www.instagram.com";
      var gotOri = false;
      for (var n in detail.requestHeaders) {
        gotOri = detail.requestHeaders[n].name.toLowerCase() == "origin";
        if (gotOri) {
          detail.requestHeaders[n].value = newOri;
          break;
        }
      }
      if (!gotOri) {
        detail.requestHeaders.push({ name: "origin", value: newOri });
      }
    }
    return { requestHeaders: detail.requestHeaders };
  }
}, {
  urls: ["<all_urls>"]
}, [
  "requestHeaders",
  "blocking",
  "extraHeaders"
])