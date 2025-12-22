import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom"

// Typu Definicja Zmiennych Props
type Props = {
  children: React.ReactNode,
  menu: {
    title: string,
    options: 
      {
        title: string,
        link: string,
        sub_options: 
          {
            title: string,
            link: string
          }[]
      }[]
  }
};

const NavMenu = ({ children, menu }: Props) => {

  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<boolean[]>(
    () => Array(menu.options.length).fill(false)
  );

  const menuRef = useRef<HTMLDivElement>(null);

  // Kliknięcie poza zamyka menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSubmenuOpen(Array(menu.options.length).fill(false));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <div
        onClick={() => setOpen((p) => !p)}
        className={"px-1 py-1 rounded cursor-pointer flex items-center group "
          + "hover:text-neutral-800 hover:dark:text-neutral-100 hover:fill-(--app_color) hover:dark:fill-(--app_color) "
          + (open ? 
          'text-neutral-800 dark:text-neutral-100 fill-(--app_color) dark:fill-(--app_color)' : 
          'text-neutral-500 dark:text-neutral-400 fill-(--app_color_second) dark:fill-(--app_color_second)')}

      >
        <div className={"group-hover:text-(--app_color) dark:group-hover:text-(--app_color) " + (open ? 
          'text-(--app_color) text:fill-(--app_color)' : 
          'text-(--app_color_second) text:fill-(--app_color_second)')}>{children}</div>
        <div className="font-normal text-sm">{menu.title} <span>▼</span></div>
      </div>

      {open && (
        <div className="absolute left-0 mt-1 w-fit text-sm shadow-lg rounded-lg border z-20 font-normal
         bg-white dark:bg-neutral-800 
         border-neutral-100 dark:border-neutral-900 p-1">
          {menu.options.map( (option,key) => (
            <div key={key}>
              <>
              {option.sub_options.length > 0 ? (
                <div
                  className="relative"
                  onMouseEnter={() => setSubmenuOpen(prev => {
                    const copy = [...prev];
                    copy[key] = true;
                    return copy;
                  })}
                  onMouseLeave={() => setSubmenuOpen(prev => {
                    const copy = [...prev];
                    copy[key] = false;
                    return copy;
                  })}
                >
                  <Link to={option.link} onClick={() => setOpen(false)}
                    className="p-2 text-left
                    text-neutral-500 dark:text-neutral-400
                    hover:text-neutral-800 dark:hover:text-(--app_color)
                    hover:bg-neutral-200  dark:hover:bg-neutral-700
                    flex justify-between rounded-lg w-full cursor-pointer"
                  >
                    <div className="flex w-full justify-between">
                      <div className="whitespace-nowrap pe-2">{option.title} </div>
                      <span>▶</span>
                    </div>
                  </Link>

                  {submenuOpen[key] && (
                    <div className="absolute left-full top-0 ml-0 shadow-lg rounded-lg border z-30
                    bg-white dark:bg-neutral-800 
                    border-neutral-100 dark:border-neutral-900 p-1">
                      <>
                      {option.sub_options.map( (sub_option,key) => (
                        <Link to={sub_option.link} key={key} onClick={() => setOpen(false)} className="block w-full p-2 text-left rounded-lg cursor-pointer whitespace-nowrap
                          text-neutral-500 dark:text-neutral-400
                          hover:text-neutral-800 dark:hover:text-(--app_color)
                          hover:bg-neutral-200  dark:hover:bg-neutral-700
                          ">
                          {sub_option.title}
                        </Link>
                      ))}
                      </>
                    </div>
                  )}
                </div>
              ) : (
                <Link to={option.link} onClick={() => setOpen(false)} className="block p-2 text-left rounded-lg w-full cursor-pointer
                    text-neutral-500 dark:text-neutral-400
                    hover:text-neutral-800 dark:hover:text-(--app_color)
                    hover:bg-neutral-200  dark:hover:bg-neutral-700
                    ">
                  {option.title}
                </Link>)}
              </>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default NavMenu;

