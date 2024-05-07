import { useEffect, useState } from "react";
import axios from "axios";
import BlogPost from "./BlogPost";

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}blogs`);
        setBlogPosts(response.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-20 h-max">
      <h1 className="text-2xl font-bold p-5">Recent Blog Posts</h1>
      <div className="flex flex-col">
        {blogPosts.map((post) => (
          <div key={post._id} className="w-3/5">
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
  );
};

export default BlogList;
