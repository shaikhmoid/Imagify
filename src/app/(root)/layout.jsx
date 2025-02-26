import React from "react";
import SideBar from "../../components/shared/SideBar";
import MobileNav from "@/components/shared/MobileNav";
import { currentUser } from "@clerk/nextjs/server";
import { createUser } from "@/lib/actions/user.sction";

const Layout = async ({ children }) => {
  const user = await currentUser();
  if (user) await createUser();

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
