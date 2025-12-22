import { User } from "lucide-react";
import NavMenuTemplate from "./Template.js";
import { ROUTES } from "@/routes/Routes.tsx"

const UserMenu = () => {

  const menu = {
    title: "Użytkownik",
    options: [
      {
        title: "Auta",
        link: ROUTES.USER.CARS.INDEX.LINK,
        sub_options: [],
      },
      {
        title: "Wyloguj",
        link: ROUTES.AUTH.LOGOUT.LINK,
        sub_options: [],
      }
    ]
  }

  return (
    <NavMenuTemplate menu={menu}>
        <User size={20} className="pe-1 drop-shadow-xs drop-shadow-black" />
    </NavMenuTemplate>
  );
};

export default UserMenu;