import { MdComputer } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { username, email, password };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, formData);
      if (res.status == 200) {
        console.log("Registration success");
      } else {
        console.log("Registration failed...");
      }
    } catch (error) {
      console.log("Error registering", error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row justify-between bg-gray-200">
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 relative h-screen"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90"></div>
        <img
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full object-cover"
          src="./home-bg.jpg"
          alt="Background"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-8xl font-bold flex flex-row items-center">
          <MdComputer className="mr-4 mt-2" />
          <Link to="/">TechReads</Link>
        </h1>
      </motion.div>
      <div className="flex flex-row justify-center w-1/2 items-center">
        <div className="flex items-center h-screen w-3/4 ">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="w-full rounded shadow-lg p-8 m-4 bg-white flex flex-col items-center"
          >
            <span className="block w-full text-2xl text-black uppercase font-bold mb-4">
              Register
            </span>
            <form
              className="mb-4 w-full flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <div className="mb-4 w-full">
                <input
                  className="input w-full border-b-2 p-2 outline-none focus:shadow-outline bg-gray-100"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={handleInput}
                  value={username}
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  className="input w-full border-b-2 p-2 outline-none focus:shadow-outline bg-gray-100"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={handleInput}
                  value={email}
                />
              </div>
              <div className="mb-6 w-full">
                <input
                  className="input w-full border-b-2 p-2 outline-none focus:shadow-outline bg-gray-100"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleInput}
                  value={password}
                />
              </div>
              <button
                type="submit"
                className=" bg-black p-3 rounded-lg text-white text-xl w-max px-10"
              >
                Register
              </button>
            </form>
            <Link className="text-blue-700 text-center text-sm" to="/login">
              Already have an account? Login here
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
