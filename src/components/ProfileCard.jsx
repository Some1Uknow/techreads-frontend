import { MdEdit, MdEmail, MdNumbers, MdPerson, MdTimer } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProfileCard({
  username,
  bio,
  email,
  dateJoined,
  imagePath,
  numberOfblogs,
  userId,
}) {
  const imgSrc = `${import.meta.env.VITE_BASE_URL}/${imagePath}`;

  return (
    <div className="mt-6 w-1/2">
      <div className="mx-auto border rounded-lg shadow-lg flex flex-col gap-1 items-center">
        <div className=" flex flex-row justify-around w-full items-center p-4">
          <img
            src={imgSrc}
            className="h-36 w-36 rounded-full mt-4 object-cover"
          />
          <h1 className="text-5xl p-2 font-bold font-Chakra">{username}</h1>
        </div>
        <div className="w-3/4 p-4 flex flex-col gap-2">
          <div className="mb-1 text-2xl  bg-gray-200 p-4 rounded-full text-gray-700">
            <span className="flex flex-row items-center justify-center">
              <MdEmail /> {email}
            </span>
          </div>
          <div className="mb-1 bg-gray-200 p-4 text-2xl rounded-full text-gray-700">
            <span className="flex flex-row items-center justify-center">
              {" "}
              <MdPerson /> {bio}
            </span>
          </div>
          <div className="mb-1 bg-gray-200 p-4 text-2xl rounded-full text-gray-700">
            <span className="flex flex-row items-center justify-center">
              <MdTimer /> Member since:
              {new Date(dateJoined).toLocaleDateString()}
            </span>
          </div>
          <div className="mb-4 bg-gray-200 p-4 text-2xl rounded-full text-gray-700">
            <span className="flex flex-row items-center justify-center">
              <MdNumbers /> Blogs Published: {numberOfblogs}
            </span>
          </div>
        </div>
      </div>
      <Link
        className="border-t w-full flex flex-row p-2 items-center justify-center bg-gray-200"
        to={`/editprofile/${userId}`}
      >
        <span className="flex flex-row items-center justify-center gap-1 text-black text-xl">
          <MdEdit />
          Edit Profile
        </span>
      </Link>
    </div>
  );
}
