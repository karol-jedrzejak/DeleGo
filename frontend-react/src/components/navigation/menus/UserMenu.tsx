import { useContext } from "react";
import { User,ShieldUser } from "lucide-react";
import NavMenuTemplate from "./Template.js";
import { ROUTES } from "@/routes/Routes.tsx"
import { AuthContext } from "@/providers/AuthProvider.js";

const UserMenu = () => {
  const authData = useContext(AuthContext);
 
  const user_menu = {
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

  const admin_menu = {
    title: "Użytkownik",
    options: [
      {
        title: "Auta",
        link: ROUTES.USER.CARS.INDEX.LINK,
        sub_options: [],
      },
      {
        title: "Uprawnienia",
        link: ROUTES.ADMIN.USER_PERMISSIONS.LINK,
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
    <NavMenuTemplate menu={authData.hasPermission('admin','admin') ? admin_menu : user_menu}>
        {authData.hasPermission('admin','admin') ?(
          <ShieldUser size={20} className="pe-1 drop-shadow-xs drop-shadow-black" />
        ):(
          <User size={20} className="pe-1 drop-shadow-xs drop-shadow-black" />
        )}
    </NavMenuTemplate>
  );
};

export default UserMenu;