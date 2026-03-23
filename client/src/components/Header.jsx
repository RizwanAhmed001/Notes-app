import  { useContext } from "react";
import { NoteContext } from "../context/NoteContent";
import { toast } from "react-toastify";
import axios from "axios";

const Header = () => {
  const { userName, backendUrl, setUserName, navigate } = useContext(NoteContext);
  const initials = userName
  .split(" ")
  .map((word) => word[0])
  .join("")
  .toUpperCase();

  const handleLogout = async () => {
    try {

      const response = await axios.post(backendUrl + "/logout", {}, {withCredentials: true});

      if(response.data.success){
        localStorage.removeItem("name");
        setUserName("");
        navigate("/login")
      }else{
        toast.error("Something Went Wrong!")
      }
      

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <header className="w-full bg-white text-black border-b border-gray-200">
      <div className="flex items-center justify-between px-3 py-3">
        {/* Title */}
        <h1 className="text-xl font-bold">Notes</h1>

        {/* User Section */}
        {userName && (
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <button className="w-8 h-8 rounded-full bg-gray-400 text-white text-sm font-semibold flex items-center justify-center">
              {initials}
            </button>

            {/* User Info */}
            <div className="hidden sm:flex flex-col text-right">
              <h3 className="text-xs font-medium">{userName}</h3>
              <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-black">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
