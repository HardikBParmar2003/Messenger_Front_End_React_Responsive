import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../style/Form.css";
import { useLoggedInUserContext } from "../hooks";
import { updateUser } from "@/api/handler";

export function UpdateUser() {
  const { register, handleSubmit } = useForm();
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
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      if (data.profile.length > 0) {
        formData.append("profile", data.profile[0]);
      }
      const response = await updateUser(formData);
      setLoggedInUser(response.data.data);
      navigate("/users");
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="bg--200 flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(updateUserData)}>
        <div className="">
          <img
            src={profile}
            className="w-[180px] h-[150px] rounded-full"
          />
        </div>
        <h1 className="text-4xl font-bold mb-3">Sign Up Form</h1>
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
            className="border"
            {...register("profile")}
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleProfile}
          />
        </div>
        <button type="submit">Update</button>{" "}
      </form>
    </div>
  );
}
