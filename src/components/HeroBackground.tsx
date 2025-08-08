import React from "react";

type HeroBackgroundProps = {
  className?: string;
};

const HeroBackground: React.FC<HeroBackgroundProps> = ({ className }) => {
  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div className={`hero-spotlight ${className ?? ""}`} aria-hidden="true" />;
};

export default HeroBackground;