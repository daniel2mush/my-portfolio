"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Buttons/Buttons";
import { cn } from "@/lib/utils";

const styles = {
  loginContainer: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-5",
  glowBlob: "pointer-events-none absolute left-1/2 top-1/2 z-0 size-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]",
  loginWrapper: "relative z-10 flex w-full max-w-[420px] flex-col gap-6",
  backLink: "inline-flex w-fit items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-foreground",
  card: "animate-[slide-up-fade_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl",
  cardHeader: "mb-8 flex flex-col items-center text-center",
  iconCircle: "mb-4 flex size-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary",
  form: "flex flex-col gap-5",
  inputGroup: "flex flex-col gap-2",
  inputWrapper: "relative flex items-center",
  inputIcon: "pointer-events-none absolute left-3.5 text-text-secondary",
  input: "w-full rounded-md border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-base text-foreground outline-none transition-all placeholder:text-white/30 focus:border-primary focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/15",
  passwordToggle: "absolute right-3 flex items-center justify-center bg-transparent p-1 text-text-secondary transition-colors hover:text-foreground",
  submitBtn: "mt-2",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading on form submit

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
        toast.success("Login successful. Redirecting...");
        router.push("/admin"); // Faster client-side routing
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Decorative background blur */}
      <div className={styles.glowBlob} aria-hidden="true" />

      <div className={styles.loginWrapper}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Return to Portfolio
        </Link>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconCircle}>
              <Lock size={24} />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Admin Portal
            </h1>
            <p className="m-0 text-sm leading-6 text-text-secondary">
              Enter your credentials to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(styles.input, "pr-10")}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              className={styles.submitBtn}
            >
              Secure Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
