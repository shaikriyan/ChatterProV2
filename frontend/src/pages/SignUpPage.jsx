import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Form Container */}
      <div className="flex flex-col justify-center p-10 w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl font-semibold mt-2">Create Account</h1>
            <p className="text-gray-300">Get started with your free account</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full py-3 pl-10 pr-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-primary outline-none"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                className="w-full py-3 pl-10 pr-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-primary outline-none"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full py-3 pl-10 pr-10 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-primary outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full py-3 rounded-lg bg-primary text-white font-semibold flex justify-center items-center gap-2 hover:bg-primary-dark transition disabled:opacity-50" disabled={isSigningUp}>
            {isSigningUp ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-300">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
