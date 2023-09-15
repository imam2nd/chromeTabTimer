//Currently it is not being used as we won't be inject any code to the page

// // Get the current tab's tabId using chrome.tabs.query
// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   if (tabs.length > 0) {
//     const tabId = tabs[0].id;

//     // Send the tabId to the background script
//     chrome.runtime.sendMessage(
//       { action: "getOpenDuration", tabId },
//       (response) => {
//         console.log("response", response);
//         const openDuration = response.openDuration || 0;

//         // Send the openDuration to the background script
//         chrome.runtime.sendMessage({ action: "updateTimer", openDuration });
//       }
//     );
//   }
// });
