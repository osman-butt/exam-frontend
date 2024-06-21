import Header from "@/components/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header />
      {/* <main className="w-full h-[calc(100vh_-_56px)] bg-[#f7f7f6] pt-6"> */}
      <main className="w-full h-[calc(100vh_-_56px)] bg-white">
        {/* fdfdfd */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
