import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdComputer } from "react-icons/md";
import { UserContext } from "../Provider";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include",
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        setRedirect(true);
        console.log("Login successful", data);
      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      console.log("Error logging in:", error);
      alert("Error logging in. Please try again.");
    }
  };

  // console.log(data);

  if (redirect) return <Navigate to={"/blogs"} />;

  return (
    <div className="w-screen h-screen flex flex-row justify-between bg-gray-200">
      <div className="flex flex-row justify-center w-1/2 items-center">
        <div className="flex items-center h-screen w-3/4 ">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="w-full rounded shadow-lg p-8 m-4 bg-white flex flex-col items-center"
            >
              <span className="block w-full text-2xl text-black uppercase font-bold mb-4">
                Login
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
                    placeholder="Enter your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-6 w-full">
                  <input
                    className="input w-full border-b-2 p-2 outline-none focus:shadow-outline bg-gray-100"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-black p-3 rounded-lg text-white text-xl w-max px-10"
                >
                  Login
                </button>
              </form>
              <Link
                className="text-blue-700 text-center text-sm"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
              <Link
                className=" bg-blue-400 rounded-lg p-3 text-white text-center text-sm mt-5"
                to="/register"
              >
                Don't have an account? Register here
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={{ x: "-100vw" }}
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
    </div>
  );
}
