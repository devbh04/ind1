"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "bg-white text-gray-900 border border-gray-200 rounded-xl shadow-lg px-4 py-3",
          title: "font-semibold text-lg",
          description: "text-sm text-gray-600",
          actionButton:
            "text-amber-600 hover:text-amber-700 font-semibold",
          cancelButton: "text-gray-500 hover:text-gray-700",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
