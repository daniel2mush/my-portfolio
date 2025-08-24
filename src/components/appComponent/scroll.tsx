export const scrollToSection = (href: string, offset = 0) => {
  const element = document.querySelector(href);
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};
