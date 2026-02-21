"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import styles from "./Form.module.scss";

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

    // Simulate an API call (Replace this with your actual form submission logic, e.g., Resend, EmailJS, Formspree)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
      console.log(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Row for Name and Email */}
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
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
            className={styles.input}
            disabled={status === "loading"}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
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
            className={styles.input}
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="subject" className={styles.label}>
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
          className={styles.input}
          disabled={status === "loading"}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="message" className={styles.label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Hi Daniel, I'd like to talk about a project..."
          value={formData.message}
          onChange={handleChange}
          className={styles.textarea}
          disabled={status === "loading"}
        />
      </div>

      {/* Submit Button & Status Messages */}
      <div className={styles.submitContainer}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className={styles.spinner} size={20} />
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

        {/* Status Feedback */}
        {status === "success" && (
          <p className={styles.successMessage}>
            Thanks for reaching out! I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className={styles.errorMessage}>
            <AlertCircle size={16} />
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
