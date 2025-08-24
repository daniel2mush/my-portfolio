import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export default function Themes({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute={"class"} {...props}>
      <main>{children}</main>
    </NextThemesProvider>
  );
}
