import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "./authSlice";
import { useState } from "react";
import { toast } from 'react-hot-toast';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const { name, email, password } = form;
    dispatch(signupUser({ name, email, password })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Signup successful!");
        navigate("/");
      }
    });
  };

  return (
    <main className="h-[calc(100vh-80px)] bg-white overflow-hidden flex items-center">
      <section className="max-w-3xl mx-auto px-2 py-2 flex flex-col md:flex-row items-center justify-center bg-[#fafafa] rounded-xl shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.3),_transparent)] z-0" />
        <div className="z-10 w-full md:w-[60%] p-4 flex flex-col justify-center">
          <div className="max-w-sm mx-auto space-y-3">
            <h2 className="text-2xl font-bold text-[#333]">Sign Up for Abhanga Masale</h2>
            <p className="text-sm text-gray-600 leading-5">
              Create your account to explore premium spices and exclusive offers!
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" id="name" value={form.name} onChange={handleChange} required placeholder="Name" className="w-full px-1 py-1 border border-gray-300 rounded-md text-sm" />
              <input type="email" id="email" value={form.email} onChange={handleChange} required placeholder="Email" className="w-full px-1 py-1 border border-gray-300 rounded-md text-sm" />
              <input type="password" id="password" value={form.password} onChange={handleChange} required placeholder="Password" className="w-full px-1 py-1 border border-gray-300 rounded-md text-sm" />
              <input type="password" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="Confirm Password" className="w-full px-1 py-1 border border-gray-300 rounded-md text-sm" />
              <button type="submit" disabled={loading} className="w-full bg-[#91542b] hover:bg-[#333] text-white font-semibold py-2 rounded-md text-sm">
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <p className="text-center text-xs text-gray-600">
                Already have an account? <Link to="/signin" className="text-[#91542b] hover:underline">Login</Link>
              </p>
            </form>
          </div>
        </div>
        <div className="hidden md:block md:w-[40%] p-4 z-10">
          <img src="/assets/img/signup2.jpg" alt="Signup" className="w-full h-full object-cover rounded-md" />
        </div>
      </section>
    </main>
  );
};

export default Signup;
