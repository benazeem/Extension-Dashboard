export const getAllHistory = async (): Promise<chrome.history.HistoryItem[]> => {
    return new Promise((resolve, reject) => {
      chrome.history.search(
        { text: "", startTime: 0, maxResults: 1000 },
        (historyItems) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(historyItems);
          }
        }
      );
    });
  };
  