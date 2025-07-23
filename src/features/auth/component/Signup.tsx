import { useForm } from "react-hook-form";
import "../../../App.css";
import "../../user/style/Form.css";
import { SignUpSchema } from "../schema/SignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpUser } from "@/api/handler";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getCookie } from "../function";

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  useEffect(() => {
    const token = getCookie("user_email");
    if (!token) {
      alert("First verify Email");
      navigate("/auth/newUser");
    }
  }, [navigate]);
  const onSubmit = async (data: SignUpFormData) => {
    await signUpUser(data);
    alert("Successfull login");
    navigate("/auth/login");
  };

  return (
    <div className="bg--200 flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-4xl font-bold mb-3">Sign Up Form</h1>
        <div className="m-2 ">
          <label>First Name: </label>
          <input type="text" className="border" {...register("first_name")} />
          {errors.first_name && (
            <p style={{ color: "red" }}>{errors.first_name.message}</p>
          )}
        </div>
        <div className="m-2 ">
          <label>Last Name: </label>
          <input type="text" className="border" {...register("last_name")} />
          {errors.last_name && (
            <p style={{ color: "red" }}>{errors.last_name.message}</p>
          )}
        </div>
        <div className="m-2 ">
          <label>Password: </label>
          <input type="password" className="border" {...register("password")} />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
