import { Building2 } from "lucide-react";
import NavMenuTemplate from "./Template.js";
import { ROUTES } from "@/routes/Routes.tsx"

const NewsMenu = () => {

  const menu = {
    title: "Firmy",
    options: [
      {
        title: "Lista",
        link: ROUTES.COMPANY.INDEX.LINK,
        icon: Building2,
      }
    ]
  }

  return (
    <NavMenuTemplate menu={menu}>
        <Building2 size={16} className="w-4"/>
    </NavMenuTemplate>
  );
};

export default NewsMenu;