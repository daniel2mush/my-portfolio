"use client";

import { LanguageProvider } from "@/lib/i18n/LanguageContext";
// If you add ThemeProvider or QueryClientProvider later, add them here too!

export function LangProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}