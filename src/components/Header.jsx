import { useContext, useEffect, useState } from "react";
import { MdComputer } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../Provider";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [logout, setLogOut] = useState(false);

  const fetchUserProfile = async () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUser(userInfo);
      });
    });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  function logOut() {
    fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUser(null);
    setLogOut(true);
  }

  if (logout) return <Navigate to="/" />;
  const username = user?.username;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-5 px-5 md:px-20">
      <Link to="/">
        <p className="flex flex-row items-center text-4xl md:text-6xl font-bold font-Chakra text-white">
          <MdComputer className="mr-2 text-5xl md:text-7xl" />
          TechReads
        </p>
      </Link>
      {username ? (
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 md:mt-0">
          <button className="text-white font-normal">
            <Link to="/create">Create New Post</Link>
          </button>
          <button className="hover:underline text-white">
            <Link to={`/profile/${user.id}`}>{username}</Link>
          </button>
          <button className="hover:underline text-white bg-zinc-900 p-2 md:p-3 rounded-lg">
            <Link to="/blogs">Blogs</Link>
          </button>
          <button
            className="bg-zinc-900 p-2 md:p-3 rounded-lg text-white font-normal"
            onClick={() => logOut()}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 md:mt-0">
          <button className="text-white font-normal">
            <Link to="/login">Login</Link>
          </button>
          <Link to="/register">
            <button className="bg-white p-2 md:p-3 rounded-lg text-black font-normal">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
