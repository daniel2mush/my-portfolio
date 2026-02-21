"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Use useState to ensure the QueryClient is only initialized once per session
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Sonner Toaster globally injected here. 
        Setting theme to "dark" forces it to match your cinematic UI.
      */}
      <Toaster position="bottom-right" theme="dark" richColors />
    </QueryClientProvider>
  );
}
