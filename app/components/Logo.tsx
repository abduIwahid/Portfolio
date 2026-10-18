"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Brand logo component — automatically switches between:
 *  - aw-logo-black.png  (dark background, white lettering) → shown in dark mode
 *  - aw-logo-light.png  (white background, dark lettering) → shown in light mode
 *
 * Falls back to the black version on SSR to avoid hydration mismatch.
 */
export default function Logo({ size = 48 }: { size?: number }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const check = () =>
      setIsDark(
        root.getAttribute("data-theme") === "dark" ||
          root.classList.contains("dark")
      );
    check();
    // Watch for theme changes
    const observer = new MutationObserver(check);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme", "class"] });
    return () => observer.disconnect();
  }, []);

  const src = isDark ? "/icons/aw-logo-black.png" : "/icons/aw-logo-light.png";

  return (
    <div
      className="logo-wrap"
      style={{ width: size, height: size, borderRadius: "22%" }}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt="Abdul Wahid logo"
        width={size}
        height={size}
        className="logo-img"
        priority
      />
    </div>
  );
}
