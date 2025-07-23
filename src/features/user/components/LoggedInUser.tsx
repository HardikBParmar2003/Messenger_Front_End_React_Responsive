import { useNavigate } from "react-router-dom";
import { useLoggedInUserContext } from "../hooks/index";

export function LoggedInUserComponent() {
  const navigate = useNavigate();
  const { loggedInUser } = useLoggedInUserContext();
  return (
    <div className="flex ">
      <img
        src={loggedInUser?.profile_photo}
        className="user-profile-image w-15 h-15 rounded-full cursor-pointer"
        key={loggedInUser?.user_id}
        onClick={() => navigate("/home/updateUser")}
      />
      <span className="text-xl m-[15px] ">
        {loggedInUser?.first_name} {loggedInUser?.last_name}
      </span>
    </div>
  );
}
