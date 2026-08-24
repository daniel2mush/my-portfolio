"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function MyForm() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
      toast.success(t.form.toasts.success);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      toast.error(t.form.toasts.error);
      setTimeout(() => setStatus("idle"), 5000);
      console.error("Form Submission Error:", error);
    }
  };

  // Upgraded input classes to match the premium glass theme used across the site
  const inputClass =
    "w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60";

  const isDisabled = status === "loading" || status === "success";

  return (
    <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            {t.form.labels.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder={t.form.placeholders.name}
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            disabled={isDisabled}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            {t.form.labels.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder={t.form.placeholders.email}
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            disabled={isDisabled}
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          {t.form.labels.subject}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          placeholder={t.form.placeholders.subject}
          value={formData.subject}
          onChange={handleChange}
          className={inputClass}
          disabled={isDisabled}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          {t.form.labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          placeholder={t.form.placeholders.message}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass} min-h-[120px] resize-y leading-relaxed`}
          disabled={isDisabled}
        />
      </div>

      {/* Actions & Feedback */}
      <div className="mt-2 flex flex-col gap-3">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-xl hover:not-disabled:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isDisabled}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              {t.form.buttons.sending}
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle2 size={18} />
              {t.form.buttons.sent}
            </>
          ) : (
            <>
              {t.form.buttons.send}
              <Send size={16} />
            </>
          )}
        </button>

        {status === "success" && (
          <p className="m-0 flex items-center justify-center gap-2 text-sm font-medium text-emerald-500">
            <CheckCircle2 size={16} />
            {t.form.feedback.success}
          </p>
        )}

        {status === "error" && (
          <p className="m-0 flex items-center justify-center gap-2 text-sm font-medium text-red-400">
            <AlertCircle size={16} />
            {t.form.feedback.error}
          </p>
        )}
      </div>
    </form>
  );
}