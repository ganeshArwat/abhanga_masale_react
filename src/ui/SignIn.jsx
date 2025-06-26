import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <main className="h-[calc(100vh-80px)] bg-white overflow-hidden flex items-center">
      <section className="max-w-3xl mx-auto px-2 py-2 flex flex-col md:flex-row items-center justify-center bg-[#fafafa] rounded-xl shadow-md relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.3),_transparent)] z-0" />

        {/* Form Section */}
        <div className="z-10 w-full md:w-[60%] p-4 flex flex-col justify-center">
          <div className="max-w-sm mx-auto space-y-3">
            <h2 className="text-2xl font-bold text-[#333]">Sign In to Abhanga Masale</h2>
            <p className="text-sm text-gray-600 leading-5">
              Access your account and continue exploring authentic spices and flavors!
            </p>
            <form className="space-y-3">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-1 py-1 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-1 py-1 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#91542b] hover:bg-[#333] text-white font-semibold py-2 rounded-md text-sm"
              >
                Sign In
              </button>
              <p className="text-center text-xs text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#91542b] hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:block md:w-[40%] p-4 z-10">
          <img
            src="/assets/img/signup2.jpg"
            alt="Signin"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </section>
    </main>
  );
};

export default SignIn;
