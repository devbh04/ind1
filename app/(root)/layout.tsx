import AppBar from "@/components/shared/appbar";
import Footer from "@/components/shared/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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