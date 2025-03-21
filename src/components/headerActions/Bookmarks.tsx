import { useState, useEffect } from "react";
import { MdBookmark } from "react-icons/md";
import { getAllBookmarks } from "../../utils/bookmarksCRUD";
import { motion, AnimatePresence } from "framer-motion";

function Bookmarks() {
  const [folderindex, setFolderIndex] = useState(0);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  console.log(bookmarks[0]);

  useEffect(() => {
    getAllBookmarks().then(setBookmarks).catch(console.error);
  }, []);

  const onClickBookmarks = () => {
    setShowBookmarks(!showBookmarks);
  };

  return (
    <>
   
      <div className="relative">
        <MdBookmark onClick={onClickBookmarks} />
        <AnimatePresence>
          {showBookmarks&&(<motion.div  className=" h-96 w-2xl bg-gray-800 absolute left-0 top-15 overflow-scroll no-scrollbar "
            initial={{ y: "-100%" }} 
            animate={{ y: 0 }}
            exit={{ y: "-100%" }} 
            transition={{ duration: 0.9 }} >
            <div className="flex gap-4 h-full w-full">
            <div className="flex flex-col w-[25%] justify-evenly items-start  overflow-scroll no-scrollbar">
              {bookmarks[0]?.children?.map(
                (folder: chrome.bookmarks.BookmarkTreeNode) => (
                  <div 
                    key={folder.id}
                    className={`{folderindex === folder.index ? "bg-gray-100 text-black" : "text-white"} p-2`}
                    onClick={() => setFolderIndex(folder.index ?? 0)}
                  >
                    <h3 className="font-bold">{folder.title}</h3>
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col w-[75%] overflow-scroll no-scrollbar p-2">
              {bookmarks[0]?.children?.[folderindex]?.children?.map(
                (bookmark: chrome.bookmarks.BookmarkTreeNode) => (
                    <a key={bookmark.id} href={bookmark.url} target="_blank" className="p-2">{bookmark.title}</a>
                )
              )}
            </div>
          </div>
            </motion.div>)}
            </AnimatePresence>
               </div>
      
    </>
  );
}

export default Bookmarks;
