"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type Toast = { id: string; message: string; level: "info" | "error" };
type Ctx = { push: (m: string, level?: Toast["level"]) => void };

const ToastCtx = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const push = useCallback((message: string, level: Toast["level"] = "info") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setItems((s) => [...s, { id, message, level }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 4000);
  }, []);

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-4 right-4 flex flex-col gap-2"
      >
        {items.map((t) => (
          <div
            key={t.id}
            role={t.level === "error" ? "alert" : "status"}
            className={`pointer-events-auto rounded-md px-4 py-2 text-sm shadow-lg ${
              t.level === "error"
                ? "bg-rose-600 text-white"
                : "bg-black text-white dark:bg-white dark:text-black"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
