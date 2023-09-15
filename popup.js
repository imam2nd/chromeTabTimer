// Access the tabOpenTimes variable from the background script
chrome.runtime.sendMessage({ action: "getTabOpenTimes" }, (tabOpenTimes) => {
  // Now you can use the tabOpenTimes variable in your popup.js
  // Get the current tab's tabId using chrome.tabs.query
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      const openTime = tabOpenTimes[tabId] || 0;

      console.log("tabId", tabId);

      // Calculate the time difference in milliseconds
      const currentTime = Date.now();
      const timeDifference = currentTime - openTime;

      // Convert the time difference to a human-readable format
      const formattedTimeDifference = formatTimeDifference(timeDifference);

      // Display the formatted time difference in the popup
      document.getElementById(
        "time-difference"
      ).textContent = `Tab has been open for: ${formattedTimeDifference}`;
    }
  });
});

// Function to format the time difference as hours, minutes, and seconds
function formatTimeDifference(timeDifference) {
  // Convert milliseconds to seconds
  const seconds = Math.floor(timeDifference / 1000);
  let formattedTime = "";

  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Format the result as "hh:mm:ss"
  if (remainingSeconds < 60)
    formattedTime = `${remainingSeconds.toString().padStart(2, "0")}s`;
  if (minutes < 60 && minutes > 0)
    formattedTime = `${minutes.toString().padStart(2, "0")}m:${formattedTime}`;
  if (hours > 0)
    formattedTime = `${hours.toString().padStart(2, "0")}h:${formattedTime}`;

  return formattedTime;
}
