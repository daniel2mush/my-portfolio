"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card/50 p-1 backdrop-blur-sm">
      {(["en", "fr"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all duration-200",
            lang === l
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l === "en" ? "🇬🇧 EN" : "🇫🇷 FR"}
        </button>
      ))}
    </div>
  );
}