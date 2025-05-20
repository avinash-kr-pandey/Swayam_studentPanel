import React from "react";
import Header from "@/layouts/header";
import MobileHeader from "@/layouts/header/mobile";
import Footer from "@/layouts/footer";
import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      {/* Top Header */}
      <Header />
      <MobileHeader />

      {/* Main Layout with Sidebar and Content */}
      <div className="flex mt-[80px]">
        {/* Sidebar */}
        <div className="w-60 sticky h-fit bg-white shadow self-start flex flex-row justify-center pt-10">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-4">
          <main>{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
