import NavMenuTemplate from "./Template.js";
import { Building2 } from "lucide-react";

const _EXAMPLE = () => {

  const menu = {
    title: "Test",
    options: [
      {
        title: "Certyfikaty",
        link: "/ceia/lista",
        sub_options: [
          {
            title: "1",
            link: "/ceia/1"
          },
          {
            title: "2",
            link: "/ceia/2"
          }
        ]
      },
      {
        title: "Certyfikaty 2",
        link: "/ceia/lista",
        sub_options: [
          {
            title: "Lista",
            link: "/ceia/certificates"
          },
          {
            title: "Dodaj",
            link: "/ceia/c2"
          },
          {
            title: "Mapa",
            link: "/ceia/c3"
          }
        ]
      },
      {
        title: "Oferty",
        link: "/companies",
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

export default _EXAMPLE;