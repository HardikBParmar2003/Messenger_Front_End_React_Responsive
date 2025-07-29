import { sendOtp } from "@/api/handler";
import { LoaderComponent } from "@/components/Loader/Loader";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export function Email() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append("email", email);
      await sendOtp(formData);
      toast.success(`OTP sent to ${email} `);
      setTimeout(() => {
        navigate("/auth/verifyOtp");
      }, 3000);
    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
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
          <>
            <button type="submit">Send Otp</button>
            <Link
              to="/auth/login"
              className="m-5 bg-blue-100 min-w-50 p-2 rounded-md text-center"
            >
              Log In
            </Link>
          </>
        )}
      </form>
    </div>
  );
}
