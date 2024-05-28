import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BlogPost = ({
  imgSrc,
  title,
  summary,
  content,
  id,
  author,
  createdAt,
}) => {
  const [username, setUsername] = useState("");
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/${author}`
      );
      const user = await response.json();
      setUsername(user.userDetails.username);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const imgPath = `${import.meta.env.VITE_BASE_URL}/${imgSrc}`;

  return (
    <div className="bg-zinc-900 flex flex-row justify-start border-gray-200 rounded-lg mb-5">
      <div className="w-1/4 h-full">
        <img
          className="rounded-t-lg object-cover w-full h-full"
          src={imgPath}
          alt="blog-image"
        />
      </div>
      <div className="p-5 flex flex-col justify-start flex-grow w-1/2">
        <h5 className="text-gray-100 font-semibold text-2xl mb-2">{title}</h5>
        <div className="flex flex-row gap-4 mb-3">
          <p className="text-gray-200 text-sm font-semibold"> {username}</p>
          <p className="text-gray-200 text-sm">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
        <div className="font-normal text-gray-300 mb-3 text-xs flex-grow overflow-hidden overflow-ellipsis">
          <div className="overflow-ellipsis" />
          {summary}
        </div>

        <Link to={`/blogpost/${id}`}>
          <button className="text-xs text-gray-300 text-center inline-flex items-center underline">
            Read more
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
