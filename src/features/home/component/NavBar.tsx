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

      <div className="p-3 mr-5 min-w-[10%] rounded-md text-xl bg-red-500 hover:bg-red-700">
        <button onClick={LogOut}>LogOut</button>
      </div>
    </div>
  );
}
