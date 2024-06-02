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
    <div className="mt-6 w-full md:w-1/2">
      <div className="mx-auto border rounded-lg shadow-lg flex flex-col gap-1 items-center p-2 md:p-4">
        <div className="flex flex-col md:flex-row justify-around w-full items-center p-2 md:p-4">
          <img
            src={imgSrc}
            alt="Profile"
            className="h-24 w-24 md:h-36 md:w-36 rounded-full mt-2 md:mt-4 object-cover"
          />
          <h1 className="text-3xl md:text-5xl p-2 font-bold font-Chakra">{username}</h1>
        </div>
        <div className="w-3/4 p-2 md:p-4 flex flex-col gap-1 md:gap-2">
          <ProfileInfoItem icon={<MdEmail />} label="Email" value={email} />
          <ProfileInfoItem icon={<MdPerson />} label="Bio" value={bio} />
          <ProfileInfoItem
            icon={<MdTimer />}
            label="Member since"
            value={new Date(dateJoined).toLocaleDateString()}
          />
          <ProfileInfoItem
            icon={<MdNumbers />}
            label="Blogs Published"
            value={numberOfblogs}
          />
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

function ProfileInfoItem({ icon, label, value }) {
  return (
    <div className="bg-gray-200 p-2 md:p-4 text-lg md:text-2xl rounded-full text-gray-700">
      <span className="flex flex-row items-center justify-center">
        {icon} {label}: {value}
      </span>
    </div>
  );
}
