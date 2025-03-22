import CloseButton from "../components/CloseButton";

interface ProfileProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

function Profile({ show, setShow }: ProfileProps) {
  return (
    <>
      <div
        className={`w-screen h-screen bg-gray-700 bg-opacity-75 z-50 fixed top-0 left-0 flex justify-center items-center transition-transform duration-500 ${
          show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
          <CloseButton
            className="right-2 top-2 absolute"
            onClick={() => setShow(false)}
          />
          <div className="flex flex-col items-center">
            <img
              src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQEiSJMrmd2-RU0jsDkhRrueVQluB7ONNpL9C2sdE5AYCQXhZy5k6HqtzRrmQNMfViDSy7D7vuxLn-Md7uGpi4mx7qvtc7Ptt8kyNr7xhusqReyzDJNIIFpVST_892NBDCqMMe11UsOsw"
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
            <h2 className="text-xl font-semibold mt-3">John Doe</h2>
            <p className="text-gray-500 text-sm">johndoe@example.com</p>
            <p className="text-gray-700 mt-2 text-center">
              Passionate web developer with a love for React and modern web technologies.
            </p>
          </div>
        </div>
        <CloseButton className='right-2 top-2 absolute' onClick={() => setShow(false)}/>
      </div>
    </>
  );
}

export default Profile;
