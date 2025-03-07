async function downloadFavicon(websiteUrl: string) {
    let link = "";
    try {
        // Create a URL object to extract hostname
        const url = new URL(websiteUrl);
        const faviconUrl = `https://www.google.com/s2/favicons?sz=256&domain=${url.hostname}`;

        // Fetch the favicon as a Blob
        const response = await fetch(faviconUrl);
        if (!response.ok) throw new Error("No favicon found");

        const blob = await response.blob();
        if (blob.size < 500) { 
            throw new Error("Default favicon detected"); 
          }
        
        link = URL.createObjectURL(blob); 

    } catch (error) {
        console.error("Error downloading favicon:", error);
    }
    return link;
}

// Example usage
export default downloadFavicon;