import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/blogs/${id}`);
        const blogData = await response.json();
        setBlog(blogData);

        const authorId = blogData.author;
        const userResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/${authorId}`
        );
        const userData = await userResponse.json();
        setUsername(userData.userDetails.username);
      } catch (error) {
        console.error("Error fetching blog or user:", error);
      }
    };

    fetchBlog();
  }, []);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto p-8 w-2/3 text-black">
        <h1 className="text-5xl font-bold mb-4 font-NotoSans">{blog.title}</h1>
        <div className="flex flex-row gap-4">
          <p className="text-gray-600 mb-2">Blog Post By: {username}</p>
          <p className="text-gray-600 mb-2">
            Created at: {new Date(blog.createdAt).toLocaleString()}
          </p>
        </div>

        <img
          className="mb-4 w-full"
          src={`${import.meta.env.VITE_BASE_URL}/${blog.imagePath}`}
          alt="blog-image"
        />
        <span className="prose" dangerouslySetInnerHTML={{ __html: blog.content }}></span>
      </div>
    </div>
  );
};

export default BlogPage;
