import { useEffect, useRef, useState } from "react";

const Reveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out motion-reduce:transition-none ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5"
      }`}
    >
      {children}
    </div>
  );
};

export default Reveal;
