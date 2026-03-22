import { useContext, useState } from "react";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";
import { NoteContext } from "../context/NoteContent";
import axios from "axios";

const Register = () => {

  const {backendUrl} = useContext(NoteContext);

  const [login, setLogin] = useState(true);
  const [hide, setHide] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const {value, name} = event.target;

    setUser((user) => ({
      ...user,
      [name]: value
    }))

  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log(user)
    const response = await axios.post(backendUrl + (login ? "/login" : "/register") , {name: user.name, email: user.email, password: user.password}, {withCredentials: true})
    console.log(response)
  }

  return (
    <div>
      {login ? (
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            value={user.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <div>
            {/* Button to show */}
            <input
              type={hide ? "password" : "text"}
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              name="password"
              required
            />
            {hide ? (
              <LiaEyeSolid onClick={() => setHide(!hide)} />
            ) : (
              <LiaEyeSlashSolid onClick={() => setHide(!hide)} />
            )}
          </div>
          <button>Login</button>
          <p>
            Not registered yet?{" "}
            <span onClick={() => setLogin(false)}>Create an Account</span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>SignUp</h1>
          <input
            value={user.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            name="name"
            required
          />
          <input
            value={user.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <div>
            <input
              type={hide ? "password" : "text"}
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              name="password"
              required
            />
            {hide ? (
              <LiaEyeSolid onClick={() => setHide(!hide)} />
            ) : (
              <LiaEyeSlashSolid onClick={() => setHide(!hide)} />
            )}
          </div>
          <button>Create Account</button>
          <p>
            Already have an account?{" "}
            <span onClick={() => setLogin(true)}>Login</span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Register;
