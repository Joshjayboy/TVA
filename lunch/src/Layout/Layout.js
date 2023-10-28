import React from "react";
import Footer from "./Footer/Footer";
import MobileFooter from "./Footer/MobileFooter";
import NavBar from "./Navbar/NavBar";

function Layout({ children }) {
  return (
    <>
      <div className="bg-white text-black">
        <NavBar />
        {children}
        <Footer />
        {/* Mobile footer */}

        <MobileFooter />
      </div>
    </>
  );
}

export default Layout;
