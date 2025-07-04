import React, { useEffect } from "react";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-20 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-lg shadow-lg p-2 min-w-[220px] max-w-full relative"
        onClick={e => e.stopPropagation()}
      >
        {/* <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-4xl border border-amber-800"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal; 