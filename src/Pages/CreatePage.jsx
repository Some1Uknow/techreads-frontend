import ReactQuill from "react-quill";
import { useEffect, useState, useContext } from "react";
import "react-quill/dist/quill.snow.css";
import { Link, Navigate, useParams } from "react-router-dom";

import { UserContext } from "../Provider";

export default function CreatePage() {
  const { user, setUser } = useContext(UserContext);
  const params = useParams();
  const postId = params.id;
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");
  const [editRedirect, seteditRedirect] = useState(false);
  const [submitRedirect, setSubmitRedirect] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [blogData, setBlogData] = useState({});

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

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

  const fetchBlogData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/blogs/${postId}`
      );
      const blogInfo = await response.json();
      setBlogData(blogInfo);
      setTitle(blogInfo.title);
      setSummary(blogInfo.summary);
      setContent(blogInfo.content);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    if (postId) {
      setIsEdit(true);
      fetchBlogData();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/post`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (res.status === 200) setSubmitRedirect(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/edit/${postId}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (res.status === 200) seteditRedirect(true);
  };

 
  if (submitRedirect) return <Navigate to="/" />;
  if (editRedirect) return <Navigate to={`/profile/${user.id}`} />;

  return (
    <div className="bg-gray-100 flex justify-center h-max w-screen">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-2 mt-10 w-11/12 "
      >
        <input
          placeholder="Title"
          type="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-50 w-full border input p-2 rounded-xl"
          value={title}
        />
        <input
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
          type="Summary"
          className="bg-gray-50 w-full border input  p-2 rounded-xl"
          value={summary}
        />
        <input
          onChange={(e) => setFiles(e.target.files)}
          type="file"
          placeholder="choose picture"
          //  value={files}
          className="w-full border bg-gray-50 input  p-2 rounded-xl"
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(newValue) => setContent(newValue)}
          className="w-full text-black border mb-10"
          modules={modules}
          formats={formats}
        />
        {isEdit ? (
          <button
          type="button"
            onClick={(e) => handleEdit(e)}
            className=" bg-green-400 p-2 text-center rounded-lg text-white w-full mt-4 mb-4"
          >
            Edit Post
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-400 p-4 mt-4 mb rounded-lg text-white w-full"
          >
            Create Post
          </button>
        )}
      </form>
    </div>
  );
}
