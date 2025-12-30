import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider.js";

import logo from "@/assets/logos/app_logo.svg"

import NewsMenu from "./menus/NewsMenu";
import CompaniesMenu from "./menus/CompaniesMenu";
import UserMenu from "./menus/UserMenu";
import AdminMenu from "./menus/AdminMenu";

const Navbar = () => {
    const authData = useContext(AuthContext);

  return (
    <div className="w-[200px] bg-white dark:bg-sky-950/50 border-r border-slate-100 dark:border-r-sky-950/25 p-2 flex flex-col items-left justify-start">
      <div className="flex flex-col items-left gap-2">
        <img src={logo} className="w-28 "/>
        <NewsMenu/>
        {authData.hasPermission('sales','companies') && (
          <CompaniesMenu/>
        )}
        {authData.hasPermission('admin','admin') && (
        <AdminMenu/>
        )}
        <UserMenu/>
      </div>
    </div>
  );
};

export default Navbar;