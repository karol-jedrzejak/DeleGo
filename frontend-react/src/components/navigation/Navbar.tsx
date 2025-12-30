import { useState } from "react";
import logo from "@/assets/logos/app_logo.svg"
import Menu from "./Menu";

import { TextAlignJustify,X } from "lucide-react";

const Navbar = () => {

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    
    <div className="flex flex-row lg:flex-col items-left justify-start w-full lg:w-[200px] bg-white dark:bg-sky-950/50 border-r border-slate-100 dark:border-r-sky-950/25 p-2">
      
      {/* MOBILE BAR */}
      <div className="lg:hidden w-full flex flex-row justify-between">
        <img src={logo} className="w-28 "/>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          aria-label="Open menu">
          <TextAlignJustify size={20}/>
        </button>
      </div>

      {/* MOBILE FULSCREEN MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-sky-950 flex flex-col">
          <div className="flex items-center justify-between p-2">
            <img src={logo} className="w-28 "/>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="p-2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              <X className="text-black dark:text-white" size={20}/>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2" >
            <Menu onItemClick={() => setMobileOpen(false)}/>
          </div>
        </div>
      )}


      {/* DESKTOP */}
      <div className="hidden lg:flex flex-col items-left gap-2">
        <img src={logo} className="w-28 "/>
        <Menu/>
      </div>
    </div>
  );
};

export default Navbar;