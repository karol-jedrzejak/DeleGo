import { Car } from "lucide-react";
import NavMenuTemplate from "./Template.js";
import { ROUTES } from "@/routes/Routes.tsx"

type MenuProps = {
  onItemClick?: () => void;
};

const DelegationsMenu = ({ onItemClick }: MenuProps) => {

  const menu = {
    title: "Delegacje",
    icon: Car,
    link: ROUTES.DELEGATION.INDEX.LINK,
  }

  return (
    <NavMenuTemplate menu={menu} onItemClick={onItemClick}/>
  );
};

export default DelegationsMenu;