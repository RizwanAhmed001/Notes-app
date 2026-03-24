import { useContext, useEffect, useState } from "react";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { NoteContext } from "../context/NoteContent";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const { backendUrl, navigate, userName, setUserName } =
    useContext(NoteContext);

  const [login, setLogin] = useState(true);
  const [hide, setHide] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (userName) {
      navigate("/");
    }
  }, [userName]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        backendUrl + (login ? "/login" : "/register"),
        user,
        { withCredentials: true },
      );

      console.log(response);
      if (response.data.success) {
        localStorage.setItem("name", response.data?.userData.name);
        setUserName(response.data.userData.name);
        navigate("/");
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-2 bg-white text-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border shadow border-gray-200 p-3"
      >
        <h1 className="text-lg font-semibold mb-4">
          {login ? "Login" : "Sign Up"}
        </h1>

        {!login && (
          <input
            value={user.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            name="name"
            className="w-full outline-none  border border-gray-300  p-2 mb-4 text-sm"
            required
          />
        )}

        <input
          value={user.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          name="email"
          className="w-full outline-none border border-gray-300 p-2 mb-4 text-sm"
          required
        />

        {/* Password */}
        <div className="flex items-center  border border-gray-300  mb-4 pr-2">
          <input
            type={hide ? "password" : "text"}
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            name="password"
            className="w-full p-2 text-sm outline-none"
            required
          />

          <button
            type="button"
            onClick={() => setHide(!hide)}
            className="text-lg"
          >
            {hide ? (
              <LiaEyeSlashSolid />
            ) : (
              <LiaEyeSolid className="text-blue-600" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-800 text-white mb-3 py-2 text-sm"
        >
          {login ? "Login" : "Create Account"}
        </button>

        <p className="text-xs font-semibold mt-2 text-center ">
          {login ? "Not registered yet?" : "Already have an account?"}{" "}
          <span
            onClick={() => setLogin(!login)}
            className="cursor-pointer font-semibold text-blue-600"
          >
            {login ? "Create an Account" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
