'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppBar from "@/components/shared/appbar";
import Footer from "@/components/shared/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user-storage");
    if (storedUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/signin"); // replace with your login route
    }
  }, []);

  if (isAuthenticated === null) {
    // still checking
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    // redirected already
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <AppBar />
      <div className="flex-1 bg-white py-4 px-4 lg:px-16">
        {children}
      </div>
      <Footer />
    </main>
  );
}
