import { useEffect, useMemo, useRef, useState } from "react";

const Reveal = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.15,
  once = true,
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const hiddenTransformClass = useMemo(() => {
    switch (direction) {
      case "left":
        return "-translate-x-6";
      case "right":
        return "translate-x-6";
      case "down":
        return "-translate-y-6";
      case "up":
      default:
        return "translate-y-6";
    }
  }, [direction]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} motion-safe:transform-gpu will-change-transform motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out motion-reduce:transition-none ${
        visible
          ? "opacity-100 translate-x-0 translate-y-0 blur-0 scale-100"
          : `opacity-0 ${hiddenTransformClass} blur-sm scale-95`
      }`}
    >
      {children}
    </div>
  );
};

export default Reveal;
