import { useContext, useEffect, useState } from "react";
import { MdComputer } from "react-icons/md";
import { Link } from "react-router-dom";
import { UserContext } from "../Provider";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

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
  }

  const username = user?.username;

  return (
    <>
      <div className="flex flex-row items-center justify-between py-5 px-20 ">
        <p className="flex flex-row items-center text-6xl font-bold font-Chakra text-white">
          <MdComputer className="mr-2 text-7xl " />
          TechReads
        </p>
        {username ? (
          <div className="flex flex-row gap-4 ">
            <button className="text-white font-normal">
              <Link to="/create">Create New Post</Link>
            </button>
            <button
              className="bg-black p-3 rounded-lg m-0 text-white font-normal"
              onClick={() => logOut()}
            >
              Logout
            </button>
            <button className="hover:underline">
              {" "}
              <Link to={`/profile/${user.id}`}>{username}</Link>
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-4 ">
            <button className="text-white font-normal">
              <Link to="/login">Login</Link>
            </button>
            <Link to="/register">
              <button className="btn m-0 bg-white p-3 rounded-lg text-black font-normal">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
