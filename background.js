// Define a variable to store tab open times in the global scope
const tabOpenTimes = {};

// Listen for tab created events
chrome.tabs.onCreated.addListener((tab) => {
  // Store the current timestamp as the tab's opening time
  tabOpenTimes[tab.id] = Date.now();
});

// Listen for tab removed events to clean up the stored open times
chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabOpenTimes[tabId];
});

chrome.windows.getAll({ populate: true }, (windows) => {
  for (const window of windows) {
    for (const tab of window.tabs) {
      tabOpenTimes[tab.id] = Date.now();
    }
  }
});

// Listen for messages from the popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getOpenDuration") {
    // Retrieve the tabId from the sender tab
    const tabId = sender.tab.id;
    // Calculate the open duration
    const openDuration = calculateOpenDuration(tabId);
    // Send the open duration to the popup
    sendResponse({ openDuration });
  }
  if (message.action === "getTabOpenTimes") {
    console.log("tabOpenTimes", tabOpenTimes);
    // Send the tabOpenTimes variable to the popup script
    sendResponse(tabOpenTimes);
  }
});

// Implement your logic to calculate open duration here
function calculateOpenDuration(tabId) {
  const openTime = tabOpenTimes[tabId] || 0;
  return Date.now() - openTime;
}
