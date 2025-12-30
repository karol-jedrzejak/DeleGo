import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider.js";

import NewsMenu from "./menus/NewsMenu";
import CompaniesMenu from "./menus/CompaniesMenu";
import UserMenu from "./menus/UserMenu";
import AdminMenu from "./menus/AdminMenu";
import DelegationsMenu from "./menus/DelegationsMenu";

type MenuProps = {
  onItemClick?: () => void;
};

const Menu = ({ onItemClick }: MenuProps) => {
    const authData = useContext(AuthContext);

  return (
    <>
        <NewsMenu onItemClick={onItemClick}/>
        {authData.hasPermission('sales','companies') && (
          <CompaniesMenu onItemClick={onItemClick}/>
        )}
        <DelegationsMenu onItemClick={onItemClick}/>
        {authData.hasPermission('admin','admin') && (
        <AdminMenu onItemClick={onItemClick}/>
        )}
        <UserMenu onItemClick={onItemClick}/>
    </>
  );
};

export default Menu;