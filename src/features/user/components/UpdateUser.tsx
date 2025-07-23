import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../style/Form.css";
import { useLoggedInUserContext } from "../hooks";
import { updateUser } from "@/api/handler";

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
        file.type.includes("jpeg") ||
        file.type.includes("jpeg")
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
        <div className="">
          <img src={profile} className="w-[180px] h-[150px] rounded-full" />
        </div>
        <h6 className="text-3xl font-bold mb-3">Update User </h6>
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
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Loading...
          </button>
        ) : (
          <button type="submit">Update</button>
        )}
      </form>
    </div>
  );
}
