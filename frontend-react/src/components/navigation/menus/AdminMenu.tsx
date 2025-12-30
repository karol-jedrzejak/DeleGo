import { UserCog, ShieldUser } from "lucide-react";
import NavMenuTemplate from "./Template.js";
import { ROUTES } from "@/routes/Routes.tsx"

const UserMenu = () => {
  const menu = {
    title: "Admin",
    options: [
      {
        title: "Uprawnienia",
        link: ROUTES.ADMIN.USER_PERMISSIONS.LINK,
        icon: UserCog,
      },
    ]
  }

  return (
    <NavMenuTemplate menu={menu}>
          <ShieldUser size={16} className="w-4"/>
    </NavMenuTemplate>
  );
};

export default UserMenu;