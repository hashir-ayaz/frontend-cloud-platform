import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiCloud } from "react-icons/fi";
import { signup } from "../service/loginservice";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      alert("Sign up successful!");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`An error occurred: ${error.message}`);
        console.error("Error details:", error.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-[#233150] to-background">
      {/* Left Side - Illustration */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="text-center animate-fadeInUp">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Welcome to Container Deployment
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Seamlessly deploy and manage your containers with ease.
          </p>
          <FiCloud className="text-8xl text-white opacity-70" />
        </div>
      </div>
      {/* Right Side - Sign Up Card */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-lg bg-white/10 border border-white/30 backdrop-blur-lg shadow-xl rounded-xl p-6 animate-fadeInDown">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">Sign Up</h1>
            <p className="mt-2 text-gray-300">Create your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="flex items-center text-white">
                <FiUser className="mr-2" /> Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center text-white">
                <FiMail className="mr-2" /> Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>
            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="flex items-center text-white">
                <FiLock className="mr-2" /> Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>
            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full rounded-full bg-primary text-white py-2 hover:bg-primary-dark transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-300">
              Already have an account?{" "}
              <button
                type="button"
                className="text-primary hover:text-primary-dark transition"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
