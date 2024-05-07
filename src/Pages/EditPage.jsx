import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EditPage() {
  const { id } = useParams();
  const [redirect, setredirect] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    bio: "",
    email: "",
    profilePhoto: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/profile/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((userInfo) => {
        setUserData(userInfo);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_BASE_URL}/profile/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((updatedUserData) => {
        setUserData(updatedUserData);
      });
      setredirect(true);
  };

  if (redirect) return <Navigate to={`/profile/${id}`} />

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Bio:
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          ></textarea>
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Profile Photo:
          <input
            type="file"
            accept="image/*"
            name="profilePhoto"
            onChange={(e) => {
              const file = e.target.files[0];
              setUserData((prevUserData) => ({
                ...prevUserData,
                profilePhoto: file,
              }));
            }}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </label>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPage;
