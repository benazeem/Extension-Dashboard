import { useShowMenu } from "../../hooks/useShowMenu";
import add from "../../assets/icons/add.svg";
import { MenuContextType } from "../../context/showMenuContext";

function AddSiteButton() {

  const { toggleMenu } = useShowMenu() as MenuContextType;

  return (
    <>
      <div><button onClick={toggleMenu} >
      <img
          className="border-2 border-amber-400 w-10 h-10"
          src={add}
          alt="Add icon"
        />
      </button>
      </div>
      
    </>
  );
}

export default AddSiteButton;
