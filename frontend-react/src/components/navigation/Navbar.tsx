import { useContext } from "react";

import { Sun, Moon } from "lucide-react";

import { ThemeContext } from "@/providers/ThemeProvider.js";
import { AuthContext } from "@/providers/AuthProvider.js";

import logo from "@/assets/logos/app_logo.svg"

import NewsMenu from "./menus/NewsMenu.js";
import CompaniesMenu from "./menus/CompaniesMenu.js";
import UserMenu from "./menus/UserMenu.js";
import AdminMenu from "./menus/AdminMenu.js";

const Navbar = () => {
  const { darkTheme, changeTheme } = useContext(ThemeContext);
    const authData = useContext(AuthContext);

  return (
    <div className="w-full bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-black p-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={logo} className="w-28 "/>
        <NewsMenu/>
        {(authData.user?.permissions?.misc?.companies ?? 0) > 1 && (<CompaniesMenu/>)}
        {(authData.user?.permissions?.admin?.admin ?? 0) > 1 && (<AdminMenu/>)}
        <UserMenu/>
      </div>
      <button
        onClick={changeTheme}
        className="
          p-2 cursor-pointer rounded-full
          text-neutral-700
          hover:text-neutral-900 hover:bg-(--app_color) hover:shadow-md
          dark:text-neutral-300 
          dark:hover:text-neutral-900 dark:hover:bg-(--app_color) dark:hover:shadow-md dark:shadow-(--app_color)
        "
      >
        {darkTheme ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
};

export default Navbar;