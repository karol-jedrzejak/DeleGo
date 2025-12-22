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
        sub_options: [],
      },
    ]
  }

  return (
    <NavMenuTemplate menu={menu}>
        <Newspaper size={20} className="pe-1 drop-shadow-xs drop-shadow-black" />
    </NavMenuTemplate>
  );
};

export default NewsMenu;