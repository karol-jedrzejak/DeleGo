import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom"
import type { LucideIcon } from "lucide-react";
import { ChevronUp,ChevronDown } from "lucide-react";

// Typu Definicja Zmiennych Props
type Props = {
  menu: {
    title: string,
    link?: string,
    icon: LucideIcon,
    options?: 
      {
        title: string,
        link: string,
        icon: LucideIcon,
      }[]
  },
  special?: React.ReactNode,
  onItemClick?: () => void;
};

const NavMenu = ({ menu, special, onItemClick }: Props) => {

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Kliknięcie poza zamyka menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {(menu.options && !menu.link) ? (
        <>
          <div
            onClick={() => setOpen((p) => !p)}
            className={'px-1 py-1 rounded cursor-pointer flex items-center group '
              + 'text-neutral-600 hover:text-sky-950 '
              + 'hover:bg-slate-200 '
              + 'dark:text-neutral-400 dark:hover:text-white '
              + 'dark:hover:bg-sky-900 '
              + (open ? 
              'text-sky-950 dark:text-white' : 
              '')}>
            <div><menu.icon size={16} className="w-4"/></div>
            <div className="ps-2 font-normal text-sm flex flex-row gap-1 justify-center items-center">{menu.title} <span>{open ? (<><ChevronUp size="16"/></>):(<><ChevronDown size="16"/></>)}</span></div>
          </div>

          {open && (
            <div className={"my-1 p-1 text-sm border-l-2 font-normal flex gap-2 flex-col "
            + "border-l-sky-950 dark:border-l-white bg-slate-100 dark:bg-sky-950/75"
            }>
              {menu.options.map( (option,key) => (
                <div key={key}>
                  <Link key={key} to={option.link} onClick={() => {setOpen(false); onItemClick?.();}} className={'px-1 py-1 rounded cursor-pointer flex items-center group '
                      + 'text-neutral-600 hover:text-sky-950 '
                      + 'hover:bg-slate-200 '
                      + 'dark:text-neutral-400 dark:hover:text-white '
                      + 'dark:hover:bg-sky-900 '}>
                    <option.icon size={16} className="w-4"/>
                    <span className="ps-2">{option.title}</span>
                  </Link>
                </div>
              ))}
              <>
                {special}
              </>
            </div>
          )}
        </>
      ):(
        <>
          <Link 
            to={menu.link || ""}
            onClick={() => {setOpen(false); onItemClick?.();}}
            className={'px-1 py-1 rounded cursor-pointer flex items-center group '
              + 'text-neutral-600 hover:text-sky-950 '
              + 'hover:bg-slate-200 '
              + 'dark:text-neutral-400 dark:hover:text-white '
              + 'dark:hover:bg-sky-900 '}>
            <div><menu.icon size={16} className="w-4"/></div>
            <div className="ps-2 font-normal text-sm flex flex-row gap-1 justify-center items-center">{menu.title}</div>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavMenu;

