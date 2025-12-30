import { UserCog, ShieldUser } from "lucide-react";
import NavMenuTemplate from "./Template.js";
import { ROUTES } from "@/routes/Routes.tsx"

type MenuProps = {
  onItemClick?: () => void;
};

const UserMenu = ({ onItemClick }: MenuProps) => {
  const menu = {
    title: "Admin",
    icon: ShieldUser,
    options: [
      {
        title: "Uprawnienia",
        link: ROUTES.ADMIN.USER_PERMISSIONS.LINK,
        icon: UserCog,
      },
    ]
  }

  return (
    <NavMenuTemplate menu={menu} onItemClick={onItemClick}/>
  );
};

export default UserMenu;