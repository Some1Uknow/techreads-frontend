import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import { MdDelete, MdEdit } from "react-icons/md";
import { UserContext } from "../Provider";
import ProfileCard from "../components/ProfileCard";

export default function ProfilePage() {
  const { user, setUser } = useContext(UserContext);

  const fetchUserProfile = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUser(userInfo);
      });
    });
  };

  const username = user?.username;
  const params = useParams();
  const id = params.id;
  const [userData, setUserData] = useState({});
  const [userBlogs, setuserBlogs] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/${id}`
      );
      const blogResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}/userblogs/${id}`
      );
      const userInfo = await response.json();
      const blogInfo = await blogResponse.json();
      setUserData(userInfo.userDetails);
      console.log(userData);
      setuserBlogs(blogInfo);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/delete/${postId}`, {
        method: "DELETE",
      });
      setuserBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== postId)
      );
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr text-white from-slate-900 to-zinc-800">
      {username ? (
        <div className="flex flex-col md:flex-row p-4">
          <ProfileCard
            username={userData.username}
            bio={userData.bio}
            email={userData.email}
            dateJoined={userData.createdAt}
            numberOfblogs={userBlogs.length}
            userId={userData._id}
            imagePath={userData.userImage}
          />
          <div className="flex flex-col w-full">
            <p className="w-max ml-7 text-3xl font-NotoSans p-2">Your Posts</p>
            <div className="flex justify-center flex-col mt-4">
              {userBlogs.length > 0 ? (
                userBlogs.map((post) => (
                  <div
                    key={post._id}
                    className="flex flex-col items-center mx-2 md:ml-10 bg-zinc-900 shadow-md rounded-xl p-2 mb-4"
                  >
                    <BlogPost
                      id={post._id}
                      imgSrc={post.imagePath}
                      title={post.title}
                      summary={post.summary}
                      content={post.content}
                      createdAt={post.createdAt}
                      author={post.author}
                    />
                    {user ? (
                      <div className="flex flex-row w-full justify-end gap-2 mt-2">
                        <Link to={`/edit/${post._id}`}>
                          <button className="bg-blue-600 p-2 rounded-lg flex flex-row items-center text-white">
                            Edit Post <MdEdit className="ml-1" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="bg-red-400 p-2 rounded-lg flex flex-row items-center text-white"
                        >
                          Delete Post <MdDelete className="ml-1" />
                        </button>
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center mt-4">
                  <p className="text-xl">No blogs to show</p>
                  <Link to="/create">
                    <button className="bg-green-400 text-white p-2 mt-2 rounded-lg">
                      Create New Blog
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto mt-10 p-5 border rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-5 font-NotoSans">Login First</h1>
        </div>
      )}
    </div>
  );
}
