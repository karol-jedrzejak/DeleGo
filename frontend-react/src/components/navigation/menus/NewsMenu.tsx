import { Newspaper } from "lucide-react";
import NavMenuTemplate from "./Template.js";
import { ROUTES } from "@/routes/Routes.tsx";

type MenuProps = {
  onItemClick?: () => void;
};

const NewsMenu = ({ onItemClick }: MenuProps) => {

  const menu = {
    title: "News",
    link: ROUTES.NEWS.INDEX.LINK,
    icon: Newspaper,
  }

  return (
    <NavMenuTemplate menu={menu} onItemClick={onItemClick}/>
  );
};

export default NewsMenu;