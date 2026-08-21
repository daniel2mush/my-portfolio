"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner"; // Using the toast provider we set up earlier

export default function MyForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success status UI after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      toast.error("Could not send message. Please try again later.");
      setTimeout(() => setStatus("idle"), 5000);
      console.error("Form Submission Error:", error);
    }
  };

  const inputClass =
    "w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3.5 text-base text-foreground outline-none transition-all placeholder:text-white/30 hover:not-disabled:border-white/20 hover:not-disabled:bg-white/[0.05] focus:border-primary focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-text-secondary">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            disabled={status === "loading"}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-text-secondary">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-medium text-text-secondary">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          placeholder="How can I help you?"
          value={formData.subject}
          onChange={handleChange}
          className={inputClass}
          disabled={status === "loading"}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-text-secondary">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Hi Daniel, I'd like to talk about a project..."
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass} min-h-40 resize-y leading-6`}
          disabled={status === "loading"}
        />
      </div>

      <div className="mt-2 flex flex-col gap-4">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-bold text-primary-foreground transition-all hover:not-disabled:-translate-y-0.5 hover:not-disabled:bg-foreground hover:not-disabled:shadow-[0_8px_20px_rgba(242,242,242,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Sending...
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle2 size={20} />
              Message Sent
            </>
          ) : (
            <>
              Send Message
              <Send size={18} />
            </>
          )}
        </button>

        {status === "success" && (
          <p className="m-0 flex items-center justify-center gap-2 text-sm font-medium text-emerald-500">
            Thanks for reaching out! I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="m-0 flex items-center justify-center gap-2 text-sm font-medium text-red-400">
            <AlertCircle size={16} />
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
