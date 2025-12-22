import { ShieldUser } from "lucide-react";
import NavMenuTemplate from "./Template.js";
import { ROUTES } from "@/routes/Routes.tsx";

const NewsMenu = () => {

  const menu = {
    title: "Admin",
    options: [
      {
        title: "Uprawnienia",
        link: ROUTES.ADMIN.USER_PERMISSIONS.LINK,
        sub_options: [],
      }
    ]
  }

  return (
    <NavMenuTemplate menu={menu}>
        <ShieldUser size={20} className="pe-1 drop-shadow-xs drop-shadow-black" />
    </NavMenuTemplate>
  );
};

export default NewsMenu;