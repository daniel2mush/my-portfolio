"use client";

export default function Hamburger({
  onClick,
  open,
}: {
  onClick: () => void;
  open: boolean;
}) {
  return (
    <button onClick={onClick}>
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
