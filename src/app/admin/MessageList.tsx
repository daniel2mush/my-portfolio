"use client";

import { toast } from "sonner";
import { Mail, Trash2, Calendar, User } from "lucide-react";
import { useGetMessages, useDeleteMessage } from "@/lib/query/MessageQuery";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

const styles = {
  loader: "flex min-h-[220px] items-center justify-center text-lg text-text-secondary",
  error: "flex min-h-[220px] items-center justify-center text-lg text-red-400",
  messageGrid: "mt-8 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6",
  messageCard: "flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary",
  cardHeader: "flex items-start justify-between gap-4",
  subject: "m-0 text-xl font-bold text-primary",
  date: "inline-flex shrink-0 items-center gap-1.5 text-xs text-text-muted",
  meta: "flex flex-col gap-1 text-sm text-text-muted",
  sender: "m-0 flex items-center gap-2",
  email: "m-0 flex items-center gap-2",
  messageBody: "min-h-20 rounded-lg bg-white/[0.03] p-4 text-sm leading-6 text-foreground",
  deleteBtn: "mt-auto flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-2.5 text-red-400 transition-all hover:bg-red-500 hover:text-white",
  empty: "col-span-full text-center text-text-secondary",
};

export default function MessagesList() {
  const { data: messages, isLoading, isError } = useGetMessages();
  const { mutate: deleteMsg } = useDeleteMessage();

  if (isLoading)
    return <div className={styles.loader}>Loading inquiries...</div>;
  if (isError)
    return <div className={styles.error}>Failed to load messages.</div>;

  return (
    <div className={styles.messageGrid}>
      {(messages as ContactMessage[] | undefined)?.map((msg) => (
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
            <p className="m-0">{msg.message}</p>
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
