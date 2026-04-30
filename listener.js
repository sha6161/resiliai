// Listener for the ResilliAI extension. Forwards window.postMessage events
// from the extension's portal-bridge content script into the page state.
(function () {
  const EXT_TAG = 'resiliai-extension';

  window.addEventListener('message', (e) => {
    if (e.source !== window) return;
    const m = e.data;
    if (!m || m.source !== EXT_TAG) return;
    if (window.ResilliAIPortal && typeof window.ResilliAIPortal.onEvent === 'function') {
      window.ResilliAIPortal.onEvent(m);
    }
  });

  // Ask for an initial snapshot once the page loads.
  function requestSnapshot() {
    window.postMessage({ target: EXT_TAG, action: 'request_snapshot' }, '*');
  }
  setTimeout(requestSnapshot, 300);
})();
