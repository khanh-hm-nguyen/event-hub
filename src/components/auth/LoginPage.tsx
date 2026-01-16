"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ErrorOutline,
} from "@mui/icons-material";

import { useUserStore } from "@/store/useUserStore";
import Logo from "@/components/ui/Logo";

const LoginPage = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      setUser(data.user);
      router.push(data.user.role === "admin" ? "/admin" : "/");
    } catch (error: any) {
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-black/40 backdrop-blur-2xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl relative">
        {/* Decorative Glows */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#5dfeca]/10 rounded-full blur-[80px]" />

        {/* Header Section */}
        <div className="p-10 pb-6 text-center relative z-10">
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Admin <span className="text-[#5dfeca]">Portal</span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-medium tracking-tight">
            Authorize to manage community events
          </p>
        </div>

        {/* Form Section */}
        <div className="p-10 pt-0 relative z-10">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-xs animate-in fade-in slide-in-from-top-2">
              <ErrorOutline fontSize="small" className="shrink-0" />
              <span className="font-bold uppercase tracking-wider">
                {errorMessage}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#5dfeca] transition-colors">
                  <Email fontSize="small" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@eventhub.com"
                  className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-[#5dfeca] transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-2">
                <label
                  htmlFor="password"
                  className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]"
                >
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#5dfeca] transition-colors">
                  <Lock fontSize="small" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="block w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-[#5dfeca] transition-all text-sm font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-[#5dfeca] transition-colors"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-4 px-4 bg-[#5dfeca] hover:shadow-[0_0_30px_rgba(93,254,202,0.4)] text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl disabled:opacity-50 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          href="/"
          className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors"
        >
          ← Return to Community Hub
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
