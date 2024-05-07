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
  return (
    <div className="mt-6 w-1/2">
      <div className="mx-auto border rounded-lg shadow-lg flex flex-row gap-1 items-center">
        <div className="border-r w-1/2 flex flex-col items-center p-4">
          {" "}
          <img
            src="https://via.placeholder.com/80x80"
            className="h-32 w-32 rounded-full mt-4"
          />
          <h1 className="text-4xl p-2 font-bold font-Chakra">{username}</h1>
        </div>
        <div className="w-1/2 p-4">
          <div className="mb-1 text-xl  bg-gray-200 px-2 rounded-full text-gray-700">
            <span className="flex flex-row items-center justify-center">
              {" "}
              <MdEmail /> {email}
            </span>
          </div>
          <div className="mb-1 bg-gray-200 px-2 rounded-full text-gray-700">
            <MdPerson /> {bio}
          </div>
          <div className="mb-1 bg-gray-200 px-2 rounded-full text-gray-700">
            <MdTimer /> Member since:{" "}
            {new Date(dateJoined).toLocaleDateString()}
          </div>
          <div className="mb-4 bg-gray-200 px-2 rounded-full text-gray-700">
            <MdNumbers /> Blogs Published: {numberOfblogs}
          </div>
        </div>
      </div>

      <Link
        className="border-t w-full flex flex-row p-2 items-center justify-center bg-gray-200"
        to={`/editprofile/${userId}`}
      >
        <span className="flex flex-row items-center justify-center gap-1 text-xl">
          <MdEdit />
          Edit Profile
        </span>
      </Link>
    </div>
  );
}
