import { LoggedInUserComponent } from "@/features/user/hooks";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <div className="flex items-center justify-between border-b min-h-20">
      <div className="flex space-x-7 text-black text-lg ml-5">
        <h6 className="cursor-pointer hover:underline">
          <Link to="/users">Home</Link>
        </h6>

        <h6 className="cursor-pointer hover:underline">
          {" "}
          <Link to="/group/home">Groups</Link>
        </h6>
        {/* <h6 className="cursor-pointer hover:underline"> <Link to="/users">Status</Link></h6> */}
      </div>

      <div>
        <LoggedInUserComponent />
      </div>
    </div>
  );
}
