import type { ReactNode, MouseEvent } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &{
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void,
    children: ReactNode;
    type?: "button" | "submit" | "reset",
    disabled?: boolean,
    className?: string,
    color?: "yellow" | "blue" | "red" | "green" | "lime" | "emerald" | "purple" | "pink" | "slate" | "cyan" | "sky" | "teal" | "white",
    size?: number,
};

const Button = ({
    onClick = () => {},
    children,
    type = "button",
    disabled = false,
    className = "",
    color = "blue",
    size = 2,
    ...props 
}: Props) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${className}
                rounded-md
                font-normal
                text-sm
                border `
                // Size
                +(size==0 ? `px-1 py-0 ` : '')
                +(size==1 ? `px-0.5 py-0.5 ` : '')
                +(size==2 ? `px-2 py-2 ` : '')
                +(size==3 ? `px-3 py-3 ` : '')
                +(size==4 ? `px-4 py-4 ` : '')

                // Yellow
                +( color=="yellow" && disabled==false ? `
                border-yellow-300 bg-yellow-200
                text-gray-900 hover:bg-yellow-300
                dark:border-yellow-400 dark:bg-yellow-300
                dark:text-gray-900 dark:hover:bg-yellow-400
                cursor-pointer` : '')
                +( color=="yellow" && disabled==true ? `
                text-gray-500 border-yellow-300
                bg-neutral-100 dark:bg-neutral-900
                dark:text-neutral-500 dark:border-yellow-400`: '')

                // Red
                +( color=="red" && disabled==false ? `
                border-red-400 bg-red-300
                text-gray-900 hover:bg-red-400
                dark:border-red-600 dark:bg-red-500
                dark:text-gray-900 dark:hover:bg-red-600
                cursor-pointer` : '')
                +( color=="red" && disabled==true ? `
                text-gray-500 border-red-500
                bg-neutral-100 dark:bg-neutral-900
                dark:text-neutral-500 dark:border-red-500`: '')

                // blue
                +( color=="blue" && disabled==false ? `
                border-blue-400 bg-blue-300
                text-gray-900 hover:bg-blue-400
                dark:border-blue-600 dark:bg-blue-500
                dark:text-gray-900 dark:hover:bg-blue-600
                cursor-pointer` : '')
                +( color=="blue" && disabled==true ? `
                text-gray-500 border-blue-500
                bg-neutral-100 dark:bg-neutral-900
                dark:text-neutral-500 dark:border-blue-500`: '')

                // sky
                +( color=="sky" && disabled==false ? `
                border-sky-400 bg-sky-300
                text-gray-900 hover:bg-sky-400
                dark:border-sky-600 dark:bg-sky-500
                dark:text-gray-900 dark:hover:bg-sky-600
                cursor-pointer` : '')
                +( color=="sky" && disabled==true ? `
                text-gray-500 border-sky-500
                bg-neutral-100 dark:bg-neutral-900
                dark:text-neutral-500 dark:border-sky-500`: '')

                // teal
                +( color=="teal" && disabled==false ? `
                border-teal-400 bg-teal-300
                text-gray-900 hover:bg-teal-400
                dark:border-teal-600 dark:bg-teal-500
                dark:text-gray-900 dark:hover:bg-teal-600
                cursor-pointer` : '')
                +( color=="teal" && disabled==true ? `
                text-gray-500 border-teal-500
                bg-neutral-100 dark:bg-neutral-900
                dark:text-neutral-500 dark:border-teal-500`: '')

                // green
                +( color=="green" && disabled==false ? `
                border-green-400 bg-green-300
                text-gray-900 hover:bg-green-400
                dark:border-green-600 dark:bg-green-500
                dark:text-gray-900 dark:hover:bg-green-600
                cursor-pointer` : '')
                +( color=="green" && disabled==true ? `
                text-gray-500 border-green-500
                bg-neutral-100 dark:bg-neutral-900
                dark:text-neutral-500 dark:border-green-500`: '')

                // lime
                +( color=="lime" && disabled==false ? `
                border-lime-400 bg-lime-300
                text-gray-900 hover:bg-lime-400
                dark:border-lime-600 dark:bg-lime-500
                dark:text-gray-900 dark:hover:bg-lime-600
                cursor-pointer` : '')
                +( color=="lime" && disabled==true ? `
                text-gray-500 border-lime-500
                bg-neutral-100 dark:bg-neutral-900
                dark:text-neutral-500 dark:border-lime-500`: '')

                // emerald
                +( color=="emerald" && disabled==false ? `
                border-emerald-400 bg-emerald-300
                text-gray-900 hover:bg-emerald-400
                dark:border-emerald-600 dark:bg-emerald-500
                dark:text-gray-900 dark:hover:bg-emerald-600
                cursor-pointer` : '')
                +( color=="emerald" && disabled==true ? `
                text-gray-500 border-emerald-500
                bg-neutral-100 dark:bg-neutral-900
                dark:text-neutral-500 dark:border-emerald-500`: '')

                // purple
                +( color=="purple" && disabled==false ? `
                border-purple-400 bg-purple-300
                text-gray-900 hover:bg-purple-400
                dark:border-purple-600 dark:bg-purple-500
                dark:text-gray-900 dark:hover:bg-purple-600
                cursor-pointer` : '')
                +( color=="purple" && disabled==true ? `
                text-gray-500 border-purple-500
                bg-neutral-100 dark:bg-neutral-900
                dark:text-neutral-500 dark:border-purple-500`: '')

                // pink
                +( color=="pink" && disabled==false ? `
                border-pink-400 bg-pink-300
                text-gray-900 hover:bg-pink-400
                dark:border-pink-600 dark:bg-pink-500
                dark:text-gray-900 dark:hover:bg-pink-600
                cursor-pointer` : '')
                +( color=="pink" && disabled==true ? `
                text-gray-500 border-pink-500
                bg-neutral-100 dark:bg-neutral-900
                dark:text-neutral-500 dark:border-pink-500`: '')

                // slate
                +( color=="slate" && disabled==false ? `
                border-slate-400 bg-slate-300
                text-gray-900 hover:bg-slate-400
                dark:border-slate-600 dark:bg-slate-500
                dark:text-gray-900 dark:hover:bg-slate-600
                cursor-pointer` : '')
                +( color=="slate" && disabled==true ? `
                text-gray-500 border-slate-500
                bg-neutral-100 dark:bg-neutral-900
                dark:text-neutral-500 dark:border-slate-500`: '')

                // cyan
                +( color=="cyan" && disabled==false ? `
                border-cyan-400 bg-cyan-300
                text-gray-900 hover:bg-cyan-400
                dark:border-cyan-600 dark:bg-cyan-500
                dark:text-gray-900 dark:hover:bg-cyan-600
                cursor-pointer` : '')
                +( color=="cyan" && disabled==true ? `
                text-gray-500 border-cyan-500
                bg-neutral-100 dark:bg-neutral-900
                dark:text-neutral-500 dark:border-cyan-500`: '')

                // white
                +( color=="white" && disabled==false ? `
                border-neutral-300 bg-neutral-100
                text-gray-900 hover:bg-neutral-400
                dark:border-neutral-300 dark:bg-neutral-200
                dark:text-gray-900 dark:hover:bg-neutral-400
                cursor-pointer` : '')
                +( color=="white" && disabled==true ? `
                text-gray-500 border-neutral-500
                bg-neutral-100 dark:bg-neutral-900
                dark:text-neutral-500 dark:border-neutral-500`: '')
            }
             {...props} 
    >
        {children}
    </button>
);
                             /* hover:shadow-md */  /*  dark:shadow-yellow-800 */

/*                                              cursor-pointer
                px-3 py-2
                rounded-xl
                font-medium
                border border-yellow-300 dark:border-yellow-400
                text-gray-700 bg-yellow-200
                dark:text-gray-900 dark:bg-yellow-300
                hover:bg-yellow-300
                dark:hover:bg-yellow-400 */
export default Button;