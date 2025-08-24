"use client";

import { useMediaQuery } from "react-responsive";
import MobileNavBar from "./MobileNav";
import NavBar from "./DesktopNav";
import { useEffect, useState } from "react";

export default function NavWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;
  return (
    <div>
      {isMobile ? <MobileNavBar /> : <NavBar />}
      {children}
    </div>
  );
}
