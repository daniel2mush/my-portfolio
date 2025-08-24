"use client";
import { useState } from "react";

export default function Hamburger({
  onClick,
  open,
}: {
  onClick: () => void;
  open: boolean;
}) {
  return (
    <button
      className="relative w-6 h-6 flex flex-col justify-between items-center"
      onClick={onClick}>
      <span
        className={`block h-0.5 w-full bg-white rounded transform transition duration-300 ease-in-out ${
          open ? "rotate-45 translate-y-3" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-full bg-white rounded transition duration-300 ease-in-out ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`block h-0.5 w-full bg-white rounded transform transition duration-300 ease-in-out ${
          open ? "-rotate-45 -translate-y-3" : ""
        }`}
      />
    </button>
  );
}
