import { MdComputer } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

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
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        console.log(res);
        alert("Registration success");
        setRedirect(true);
      } else {
        alert("Registration failed, same username or email exists");
      }
    } catch (error) {
      console.log("Error registering", error);
    }
  };

  if (redirect) return <Navigate to="/login" />;
  
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row justify-between bg-gray-200">
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 relative h-64 md:h-screen"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90"></div>
        <img
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full object-cover"
          src="./home-bg.jpg"
          alt="Background"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-8xl font-bold flex flex-row items-center">
          <MdComputer className="mr-4 mt-2 text-5xl md:text-7xl" />
          <Link to="/">TechReads</Link>
        </h1>
      </motion.div>
      <div className="flex flex-col justify-center w-full md:w-1/2 items-center p-4">
        <div className="flex items-center h-full w-full md:w-3/4">
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
                className="bg-black p-3 rounded-lg text-white text-xl w-max px-10"
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
