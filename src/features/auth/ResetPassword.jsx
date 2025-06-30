import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordThunk,
  clearAuthMessages,
} from "./authSlice";
import { toast } from 'react-hot-toast';

function ResetPassword() {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const dispatch = useDispatch();
  const { loading, error, resetMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthMessages());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    if (!token) {
      return toast.error("Invalid or missing token.");
    }

    dispatch(resetPasswordThunk({ token, newPassword: form.password }));
  };

  return (
    <main className="h-[calc(100vh-80px)] bg-white overflow-hidden flex items-center justify-center px-4">
      <section className="max-w-xl w-full bg-[#fafafa] rounded-xl shadow-md p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.3),_transparent)] z-0" />

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-[#333] mb-2">Reset Your Password</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter your new password below to complete the reset process.
          </p>

          {resetMessage ? (
            <>
              <p className="text-green-600 text-sm">
                ✅ {resetMessage}{" "}
              </p>
              <div className="mt-4 text-center">
                <Link to="/signin" className="text-sm text-[#91542b] hover:underline">
                  Back to Sign In
                </Link>
            </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Confirm new password"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#91542b] hover:bg-[#333] text-white font-semibold py-2 rounded-md text-sm"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default ResetPassword;
