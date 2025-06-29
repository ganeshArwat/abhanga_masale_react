import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordThunk } from "./authSlice"; // adjust the path as needed

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { loading, error, forgotMessage } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordThunk(email));
  };

  return (
    <main className="h-[calc(100vh-80px)] bg-white overflow-hidden flex items-center justify-center px-4">
      <section className="max-w-xl w-full bg-[#fafafa] rounded-xl shadow-md p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.3),_transparent)] z-0" />

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-[#333] mb-2">Forgot Your Password?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter your email address below and we'll send you a link to reset your password.
          </p>

          {forgotMessage ? (
            <p className="text-green-600 text-sm">
              ✅ {forgotMessage}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#91542b] hover:bg-[#333] text-white font-semibold py-2 rounded-md text-sm"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}

          <div className="mt-4 text-center">
            <Link to="/signin" className="text-sm text-[#91542b] hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword;
