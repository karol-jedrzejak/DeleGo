import { Building2 } from "lucide-react";
import NavMenuTemplate from "./Template.js";
import { ROUTES } from "@/routes/Routes.tsx"

type MenuProps = {
  onItemClick?: () => void;
};

const NewsMenu = ({ onItemClick }: MenuProps) => {

  const menu = {
    title: "Firmy",
    icon: Building2,
    link: ROUTES.COMPANY.INDEX.LINK,
  }

  return (
    <NavMenuTemplate menu={menu} onItemClick={onItemClick}/>
  );
};

export default NewsMenu;