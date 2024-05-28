import { useEffect, useState, useContext } from "react";
import axios from "axios";
import BlogPost from "./BlogPost";
import { UserContext } from "../Provider";
import { Link } from "react-router-dom";
import Header from "./Header";

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);

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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/blogs`
      );
      setBlogPosts(response.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchData();
  }, []);

  if (user.message == "Token missing")
    return (
      <div className="h-screen w-screen flex flex-row items-center justify-center text-2xl font-Chakra"> If you want to read what other techies are saying then 
        <Link className="p-2 m-2 rounded-lg bg-green-600" to="/login">
          Login
        </Link>{" "}
        first{" "}
      </div>
    );

  return (
    <>
      <div className="text-white h-screen bg-gradient-to-tr from-slate-900 to-zinc-800">
        <Header />
        <div className="px-20 h-max">
          <h1 className="text-2xl font-bold p-5">Recent Blog Posts</h1>
          <div className="flex flex-col">
            {blogPosts.map((post) => (
              <div key={post._id} className="w-4/5">
                <BlogPost
                  id={post._id}
                  imgSrc={post.imagePath}
                  title={post.title}
                  summary={post.summary}
                  content={post.content}
                  createdAt={post.createdAt}
                  author={post.author}
                />
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default BlogList;
