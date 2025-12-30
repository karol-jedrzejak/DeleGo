import { useContext } from "react";
import {LogOut,CarFront, User } from "lucide-react";
import NavMenuTemplate from "./Template.js";
import { ROUTES } from "@/routes/Routes.tsx"
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "@/providers/ThemeProvider.js"; 
import { Link } from "react-router-dom"

type MenuProps = {
  onItemClick?: () => void;
};

const UserMenu = ({ onItemClick }: MenuProps) => {
  const { darkTheme, changeTheme } = useContext(ThemeContext);

  const menu = {
    title: "Użytkownik",
    icon: User,
    options: [
      {
        title: "Auta",
        link: ROUTES.USER.CARS.INDEX.LINK,
        icon: CarFront,
      }
    ]
  }

  return (
    <NavMenuTemplate
      onItemClick={onItemClick}
      menu={menu}
      special={
      <>
        {/*  THEME CHANGE */}
        <button
          onClick={() => {
            changeTheme();
            onItemClick?.();
          }}
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
          onClick={onItemClick}
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
      }/>
  );
};

export default UserMenu;