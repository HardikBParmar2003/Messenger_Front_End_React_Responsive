import { LogOut } from "@/features/auth/function";
import { LoggedInUserComponent } from "@/features/user/components";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <div className="flex items-center justify-between border-b min-h-20">
      <div className="ml-4">
        <LoggedInUserComponent />
      </div>
      <div className="flex space-x-7 text-black text-lg ml-5">
        <h6 className="cursor-pointer hover:underline">
          <Link to="/home">Home</Link>
        </h6>

        <h6 className="cursor-pointer hover:underline">
          {" "}
          <Link to="/group/home">Groups</Link>
        </h6>
      </div>

      <div   className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded mr-10 min-w-[10%]">
        <button onClick={LogOut}>LogOut</button>
      </div>
    </div>
  );
}

