"use client";

import { toast } from "sonner";
import { Mail, Trash2, Calendar, User } from "lucide-react";
import styles from "./AdminDashboard.module.scss";
import { useGetMessages, useDeleteMessage } from "@/lib/query/MessageQuery";

export default function MessagesList() {
  const { data: messages, isLoading, isError } = useGetMessages();
  const { mutate: deleteMsg } = useDeleteMessage();

  if (isLoading)
    return <div className={styles.loader}>Loading inquiries...</div>;
  if (isError)
    return <div className={styles.error}>Failed to load messages.</div>;

  return (
    <div className={styles.messageGrid}>
      {messages?.map((msg: any) => (
        <div key={msg.id} className={styles.messageCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.subject}>{msg.subject}</h3>
            <span className={styles.date}>
              <Calendar size={14} />
              {new Date(msg.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className={styles.meta}>
            <p className={styles.sender}>
              <User size={14} /> {msg.name}
            </p>
            <p className={styles.email}>
              <Mail size={14} /> {msg.email}
            </p>
          </div>

          <div className={styles.messageBody}>
            <p>{msg.message}</p>
          </div>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this message?")) {
                deleteMsg(msg.id);
                toast.info("Message deleted successfully.");
              }
            }}
            className={styles.deleteBtn}
          >
            <Trash2 size={16} />
            Delete Inquiry
          </button>
        </div>
      ))}

      {messages?.length === 0 && (
        <p className={styles.empty}>No messages yet. Your inbox is clear!</p>
      )}
    </div>
  );
}
