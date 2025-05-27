import React, { useState } from "react";
import Header from "@/layouts/header";
import MobileHeader from "@/layouts/header/mobile";
import Footer from "@/layouts/footer";
import Sidebar from "./sidebar";
import TopProducts from "@/sections/top-products";
import TopCategories from "@/sections/top-categories";

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      {/* Header with searchTerm state */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MobileHeader />

      <div className="flex mt-[80px]">
        <div
          className="w-70 fixed top-[80px] left-0 bg-white shadow pt-10"
          style={{ height: "calc(100vh - 80px)", overflowY: "auto" }}
        >
          <Sidebar />
        </div>

        <div className="flex-1 ml-60 pl-4">
          <main>
            {/* Pass searchTerm prop to components that need it */}
            <TopProducts searchTerm={searchTerm} />
            <TopCategories />
            {/* Add other sections here as needed */}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
