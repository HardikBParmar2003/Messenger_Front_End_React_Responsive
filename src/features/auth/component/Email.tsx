import { sendOtp } from "@/api/handler";
import { useState } from "react";
import { useNavigate } from "react-router";
export function Email() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await sendOtp(formData);
    alert(`OTP sent to ${email}`)
    navigate("/verifyOtp");
  };

  return (
    <div className="bg--200 flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <p className="text-2xl font-bold mb-5 text-center">Verify Email</p>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>

        <button type="submit">Send Otp</button>
      </form>
    </div>
  );
}
