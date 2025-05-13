import { useState, useRef, useEffect } from "react";

const ToggleSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const detailsRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const el = detailsRef.current;
    const listener = () => setIsOpen(el.open);
    el.addEventListener("toggle", listener);
    return () => el.removeEventListener("toggle", listener);
  }, []);

  return (
    <details
      ref={detailsRef}
      className="bg-white p-4 rounded shadow"
      open={defaultOpen}
    >
      <summary
        onClick={handleToggle}
        className="font-semibold flex justify-between items-center cursor-pointer"
      >
        <span>{title}</span>
        <span className="text-gray-500">{isOpen ? "−" : "+"}</span>
      </summary>
      <div className="mt-2 space-y-2">{children}</div>
    </details>
  );
};

export default ToggleSection;
