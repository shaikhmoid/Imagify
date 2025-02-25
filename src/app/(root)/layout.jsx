import React from "react";
import SideBar from "../../components/shared/SideBar";
import { SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import MobileNav from "@/components/shared/MobileNav";

const Layout = ({ children }) => {
  return (
    <div className="root">
      <SideBar />
      <MobileNav />
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
