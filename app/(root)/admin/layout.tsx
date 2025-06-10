'use client';
import { useUserStore } from "@/store/signUpStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const {currentUser} = useUserStore();
  useEffect(() => {
    if (currentUser.userType === "admin") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/profile"); // replace with your login route
    }
  }, []);

  if (isAuthenticated === null) {
    // still checking
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    // redirected already
    return null;
  }
  return <>{children}</>;
}
