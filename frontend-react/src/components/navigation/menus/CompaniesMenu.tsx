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
        sub_options: [],
      }
    ]
  }

  return (
    <NavMenuTemplate menu={menu}>
        <Building2 size={20} className="pe-1 drop-shadow-xs drop-shadow-black" />
    </NavMenuTemplate>
  );
};

export default NewsMenu;