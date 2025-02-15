function hideShorts() {
    chrome.storage.local.get("shortsHidden", (data) => {
      if (data.shortsHidden === false) return;
  
      const shortsSelectors = [
        "ytd-rich-section-renderer", // Shorts-Karussell
        "ytd-reel-shelf-renderer", // Shorts in Empfehlungen
        "ytd-reel-item-renderer", // Einzelne Shorts
        "ytd-grid-video-renderer", // Shorts in der Grid-Ansicht
        "ytd-video-renderer", // Shorts in der Liste
        "a[href*='/shorts/']" // Alle Links zu Shorts
      ];
  
      shortsSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.style.display = "none";
        });
      });
    });
  }
  
  const observer = new MutationObserver(hideShorts);
  observer.observe(document.body, { childList: true, subtree: true });
  
  document.addEventListener("DOMContentLoaded", hideShorts);