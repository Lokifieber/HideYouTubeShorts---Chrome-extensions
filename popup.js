document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById("toggleSwitch");
    
    chrome.storage.local.get("shortsHidden", (data) => {
      toggleSwitch.checked = data.shortsHidden !== false;
    });
  
    toggleSwitch.addEventListener("change", () => {
      const newState = toggleSwitch.checked;
      chrome.storage.local.set({ "shortsHidden": newState }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: () => location.reload()
            });
          }
        });
      });
    });
  });