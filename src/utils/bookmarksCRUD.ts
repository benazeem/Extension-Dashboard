export const getAllBookmarks = async () => {
    return new Promise<chrome.bookmarks.BookmarkTreeNode[]>((resolve, reject) => {
      chrome.bookmarks.getTree((bookmarks) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(bookmarks);
        }
      });
    });
  };
  