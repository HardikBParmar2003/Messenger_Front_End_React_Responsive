import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../style/Form.css";
import { useLoggedInUserContext } from "../hooks";
import { updateUser } from "@/api/handler";
import { toast } from "react-toastify";
import { LoaderComponent } from "@/components/Loader/Loader";

export function UpdateUser() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { loggedInUser, setLoggedInUser } = useLoggedInUserContext();
  const [profile, setProfile] = useState(loggedInUser?.profile_photo);

  const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (
        file.type.includes("jpeg") ||
        file.type.includes("png") ||
        file.type.includes("jpg")
      ) {
        const imageUrl = URL.createObjectURL(file);
        setProfile(imageUrl);
      } else {
        alert("Upload Jpeg,png or jpg format file...");
      }
    }
  };

  async function updateUserData(data: any) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      if (data.profile.length > 0) {
        formData.append("profile", data.profile[0]);
      }
      const response = await updateUser(formData);
      setLoggedInUser(response.data.data);
      navigate("/home");
      toast.success("Profile updated successfully");
    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg--200 flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(updateUserData)} className="text-left">
        <h6 className="text-3xl font-bold mb-3">Update User </h6>

        <div className="">
          <img
            src={profile}
            className="w-[140px] h-[140px] rounded-full ring-2 ring-red-100"
          />
        </div>
        <div className="m-2 ">
          <label>First Name: </label>
          <input
            type="text"
            className="border"
            {...register("first_name")}
            defaultValue={loggedInUser?.first_name}
          />
        </div>
        <div className="m-2 ">
          <label>Last Name: </label>
          <input
            type="text"
            className="border"
            {...register("last_name")}
            defaultValue={loggedInUser?.last_name}
          />
        </div>
        <div className="m-2 ">
          <label>Email: </label>
          <input
            type="email"
            className="border"
            {...register("email")}
            defaultValue={loggedInUser?.email}
            readOnly
          />
        </div>
        <div className="m-2 ">
          <label>Profile:</label>
          <input
            type="file"
            className="border w-62"
            {...register("profile")}
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleProfile}
          />
        </div>
        {loading ? (
          <button
            disabled
            type="button"
            className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            <LoaderComponent />
            Loading...
          </button>
        ) : (
          <button type="submit">Update</button>
        )}
      </form>
    </div>
  );
}
