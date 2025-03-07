import HiddenHeader from "../layouts/HiddenHeader";
import DragContext from "../components/DragContext";
import { useShowMenu } from "../hooks/useShowMenu";
import AddMenu from "../layouts/AddMenu";


function Home() {
  const context = useShowMenu();
  const showMenu = typeof context === 'object' && 'showMenu' in context ? context.showMenu : false;
  return (
    <>
   <div className="w-screen h-screen relative">
      <HiddenHeader />
      <DragContext/>
      {showMenu && (
          <AddMenu />
        
      )}
   </div>
    </>
  );
}

export default Home;
