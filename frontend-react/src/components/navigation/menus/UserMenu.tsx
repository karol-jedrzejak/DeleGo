import { useContext } from "react";
import {LogOut,Car, User } from "lucide-react";
import NavMenuTemplate from "./Template.js";
import { ROUTES } from "@/routes/Routes.tsx"
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "@/providers/ThemeProvider.js"; 
import { Link } from "react-router-dom"

const UserMenu = () => {
  const { darkTheme, changeTheme } = useContext(ThemeContext);

  const menu = {
    title: "Użytkownik",
    options: [
      {
        title: "Auta",
        link: ROUTES.USER.CARS.INDEX.LINK,
        icon: Car,
      }
    ]
  }

  return (
    <NavMenuTemplate
      menu={menu}
      special={
      <>
        {/*  THEME CHANGE */}
        <button
          onClick={changeTheme}
          className={'px-1 py-1 rounded cursor-pointer flex items-center group '
            + 'text-neutral-600 hover:text-sky-950 '
            + 'hover:bg-slate-200 '
            + 'dark:text-neutral-400 dark:hover:text-white '
            + 'dark:hover:bg-sky-900 '}
        >
          {darkTheme ? <Sun size={18}  className="w-4"/> : <Moon size={18} className="w-4" />}
          <span className="ps-2 font-normal text-sm">Przełącz Tryb</span>
        </button>
        {/*  LOGOUT */}
        <Link 
          to={ROUTES.AUTH.LOGOUT.LINK}
          className={'px-1 py-1 rounded cursor-pointer flex items-center group '
            + 'text-neutral-600 hover:text-sky-950 '
            + 'hover:bg-slate-200 '
            + 'dark:text-neutral-400 dark:hover:text-white '
            + 'dark:hover:bg-sky-900'}
        >
          <LogOut size={18}  className="w-4"/>
          <span className="ps-2 font-normal text-sm">Wyloguj</span>
        </Link >
      </>
      }>
      <User size={16} className="w-4"/>
    </NavMenuTemplate>
  );
};

export default UserMenu;