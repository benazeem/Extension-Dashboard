import fetchFavicon from "../utils/fetchFavicon";
import getWebsiteColor from "../utils/getWebsiteColor";
import { convertImageToBase64 } from "../utils/convertImagetoBase64";

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.action === "fetchFavicon") {
        fetchFavicon(request.url)
            .then((faviconUrl) => sendResponse({ faviconUrl }))
            .catch(() => sendResponse({ faviconUrl: "" }));
        return true; // Keep async response open
    }

    if (request.action === "getWebsiteColor") {
        getWebsiteColor(request.url)
            .then((color) => sendResponse({ color }))
            .catch(() => sendResponse({ color: null }));
        return true;
    }

    if (request.action === "convertImage") {
        convertImageToBase64(request.file)
            .then((base64) => sendResponse({ base64 }))
            .catch(() => sendResponse({ base64: "" }));
        return true;
    }
});
