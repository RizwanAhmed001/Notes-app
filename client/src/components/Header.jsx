import { useContext } from "react";
import { NoteContext } from "../context/NoteContent";
import { toast } from "react-toastify";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { userName, backendUrl, setUserName, navigate, search, setSearch, setSearchOn } =
    useContext(NoteContext);

  const location = useLocation();

  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/logout",
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        localStorage.removeItem("name");
        setUserName("");
        navigate("/login");
      } else {
        toast.error("Something Went Wrong!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClick = () => {
    setSearchOn(true) 
  }

  return (
    <header className="w-full bg-white text-black border-b border-gray-200">
      <div className="flex items-center px-2 py-3">

        {/* Left - Title */}
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Notes</h1>
        </div>

        {/* Center - Search */}
        <div className="flex-1 flex justify-center">
          {location.pathname === "/" && (
            <div className="flex bg-gray-100 items-center px-3 rounded py-1 w-40 sm:w-64">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Notes"
                className="w-full outline-none text-gray-600 text-sm"
              />
              <IoIosSearch onClick={handleClick} className="text-lg" />
            </div>
          )}
        </div>

        {/* Right - User */}
        <div className="flex-1 flex justify-end">
          {userName && (
            <div className="flex items-center gap-2">

              <button className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center">
                {initials}
              </button>

              <div className="hidden sm:flex flex-col text-right">
                <h3 className="text-xs font-medium">{userName}</h3>
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-500 hover:text-black"
                >
                  Logout
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;