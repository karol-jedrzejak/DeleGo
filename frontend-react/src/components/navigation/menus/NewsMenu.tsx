import { Newspaper } from "lucide-react";
import NavMenuTemplate from "./Template.js";
import { ROUTES } from "@/routes/Routes.tsx";

const NewsMenu = () => {

  const menu = {
    title: "News",
    options: [
      {
        title: "News",
        link: ROUTES.NEWS.INDEX.LINK,
        icon: Newspaper,
      },
    ]
  }

  return (
    <NavMenuTemplate menu={menu}>
        <Newspaper size={16} className="w-4"/>
    </NavMenuTemplate>
  );
};

export default NewsMenu;