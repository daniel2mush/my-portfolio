"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import {Button} from "@/components/ui/button";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        toast.success("Welcome back. Redirecting to dashboard...");
        router.push("/admin");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4 sm:p-6">
      {/* Background Effects */}
  <div   className="absolute inset-0 h-full w-full opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]"
 />      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" aria-hidden="true" />

      {/* Main Container */}
      <div className="relative z-10 flex w-full max-w-md flex-col gap-6">

        {/* Back Link */}
        <Link
          href="/"
          className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Return to Portfolio
        </Link>

        {/* Login Card */}
        <div className="glass relative rounded-2xl border border-border/60 p-8 shadow-2xl sm:p-10 animate-fade-in-up">
          {/* Card Header */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
              <ShieldCheck size={28} strokeWidth={1.5} />
            </div>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Admin Access
            </h1>
            <p className="text-sm text-muted-foreground">
              Secure login for portfolio management.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background/50 py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background/50 py-3 pl-10 pr-10 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"


              className="mt-6 h-11 font-semibold tracking-wide shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Secure Login"}
            </Button>
          </form>

          {/* Footer / Security Note */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock size={12} />
            <span>Protected by enterprise-grade encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}