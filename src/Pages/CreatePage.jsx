import ReactQuill from "react-quill";
import { useEffect, useState, useContext } from "react";
import "react-quill/dist/quill.bubble.css";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../Provider";
import { MdStar } from "react-icons/md";
import Popup from "../components/PopUp";
import { htmlToText } from "html-to-text";
import OpenAI from "openai";

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
    setShowPopup(true);
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

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setloading] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const enhanceContent = async () => {
    try {
      const plainText = htmlToText(content);
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that enhances blog posts with statistics and examples. If stats and examples are not possible, elaborate the content.",
          },
          {
            role: "user",
            content: plainText,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      setContent(chatCompletion.choices[0].message.content);
    } catch (error) {
      console.error("Error enhancing content:", error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen w-screen bg-zinc-700 text-white">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-2 mt-10 w-11/12"
      >
        <input
          placeholder="Title"
          type="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-b input p-2 text-5xl bg-inherit text-white font-bold outline-none"
          value={title}
        />
        <input
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
          type="Summary"
          className="w-full border-b input p-2 text-3xl bg-inherit font-bold outline-none"
          value={summary}
        />
        <div className="flex flex-row w-full justify-around items-center py-4">
          <label className="w-1/4 text-2xl">Upload your cover image</label>
          <input
            onChange={(e) => setFiles(e.target.files)}
            type="file"
            placeholder="choose picture"
            //  value={files}
            className="w-3/4 border-b input p-2 text-xl bg-inherit outline-none"
          />
        </div>
        <ReactQuill
          theme="bubble"
          value={content}
          onChange={(newValue) => setContent(newValue)}
          className="w-full text-white border-t-0 border-l-0 border-r-0 border-b border text-3xl mb-10"
          modules={modules}
          formats={formats}
          placeholder="let your ideas out"
        />
        {isEdit ? (
          <button
            type="button"
            onClick={(e) => handleEdit(e)}
            className="bg-green-400 p-2 text-center rounded-lg text-white w-full mt-4 mb-4"
          >
            Edit Post
          </button>
        ) : (
          <div className="flex flex-row gap-5 w-full justify-end">
            {" "}
            <button
              type="submit"
              className="bg-green-700 w-1/5 p-4 mt-4 mb hover:bg-green-800 rounded-lg text-white"
            >
              Create Post
            </button>
            <button
              type="button"
              onClick={() => enhanceContent}
              className="bg-green-700 flex flex-row justify-center hover:bg-green-800 items-center p-4 mt-4 mb rounded-lg  text-white w-1/5"
            >
              Enhance with AI! <MdStar className="text-2xl font-bold ml-2" />
            </button>
          </div>
        )}
      </form>
      {showPopup && <Popup closePopup={closePopup} />}
    </div>
  );
}
