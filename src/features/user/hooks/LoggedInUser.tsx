import { useNavigate } from "react-router-dom";
import { useLoggedInUserContext } from "./index"
export function LoggedInUserComponent(){
    const navigate = useNavigate()
    const {loggedInUser} = useLoggedInUserContext()
    return (
        <div className="flex p-2 mb-5 ml-[40px] bg-gray-200 rounded-2xl border border-gray-800">
        <img
          src={loggedInUser?.profile_photo}
          className="user-profile-image w-[80px] h-[80px] rounded-full cursor-pointer"
          key={loggedInUser?.user_id}
          onClick={()=>navigate("/updateUser")}
        />
        <span className="text-xl m-[15px] mt-5">{loggedInUser?.first_name} {loggedInUser?.last_name}</span>
      </div>
    )
}
