"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { scrollToSection } from "../scroll";

const navSection = [
  {
    name: "Home",
    link: "#home",
  },
  {
    name: "About",
    link: "#about",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Projects",
    link: "#projects",
  },
  {
    name: "Contact",
    link: "#contact",
  },
  {
    name: "Resume",
    link: "#resume",
  },
];

export default function MobileNavBar() {
  const [open, setOpen] = useState(false);

  const [position] = useState(50);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      const currentPosition = window.scrollY;

      if (currentPosition > position) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    scrollListener();

    return () => window.removeEventListener("scroll", scrollListener);
  }, [position]);

  return (
    <div
      className={` fixed top-0 right-0 left-0   p-4 z-50 ${
        isScrolling && "backdrop-blur-3xl ring ring-primary/10"
      }`}>
      <div className=" flex justify-between items-center">
        <h1 className=" font-bold text-primary">ZCoder</h1>
        <Button variant={"ghost"} onClick={() => setOpen((p) => !p)}>
          {open ? <X size={25} /> : <Menu size={25} />}
        </Button>
      </div>

      {open && (
        <nav className=" w-full  bg-background  mt-10 rounded  ring ring-primary/10 p-4">
          <ul className=" flex flex-col items-start  gap-5">
            {navSection.map((n) => {
              const isResume = n.name === "Resume";
              return (
                <button
                  key={n.name}
                  onClick={() => {
                    scrollToSection(n.link);
                    setOpen(false);
                  }}
                  className={`text-muted-foreground hover:text-white ${
                    isResume &&
                    "bg-background ring ring-primary text-center rounded p-1 active:bg-primary w-full active:text-white"
                  }`}>
                  {n.name}
                </button>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
