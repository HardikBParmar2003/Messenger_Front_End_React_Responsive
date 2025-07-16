import { verifyOtp } from "@/api/handler";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function VerifyEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    function getUserEmail() {
      const allCOokies = document.cookie.split(";");
      for (let cookie of allCOokies) {
        const [key, value] = cookie.split("=");
        if (key === "user_email") return decodeURIComponent(value);
      }
    }
    const user_email = getUserEmail();
    if (!user_email) {
      navigate("/login");
    }
  }, []);

  const [otp, setOtp] = useState<string>("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("otp", otp);
    const response = await verifyOtp(formData);
    alert("OTP successfuly verified");
    navigate("/signup");
  };
  return (
    <div className="bg--200 flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <p className="text-2xl font-bold mb-5 text-center">Verify OTP:</p>
        <div>
          <label htmlFor="otp">OTP::</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOtp(e.target.value)
            }
            required
          />
        </div>

        <button type="submit">Send Otp</button>
      </form>
    </div>
  );
}
