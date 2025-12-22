import logo from "@/assets/logos/app_logo.svg"
import { Frown,ShieldBan } from "lucide-react"

type Props = {
    children: React.ReactNode;
};

function Error({children}: Props) {

    return (
        <>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <div className="flex flex-col justify-center items-center rounded-xl shadow-md dark:ring dark:ring-neutral-950 m-2 bg-white dark:bg-neutral-800 dark:text-neutral-100 p-4">
                    {children}
                </div>
            </div>
        </>
    )
}

Error.Text = ({ children, type = "standard" }: { children: React.ReactNode, type?: "standard" | "authorization"}) => {
    const iconMap = {
    standard: <Frown className="pt-6 w-24 h-24 sm:w-48 sm:h-48 text-red-500" />,
    authorization: <ShieldBan className="pt-6 w-24 h-24 sm:w-48 sm:h-48 text-yellow-800 dark:text-yellow-300" />,
  };

  const textColorMap = {
    standard: "text-red-500",
    authorization: "text-yellow-800 dark:text-yellow-300",
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <img src={logo} className="w-[80vw] sm:w-[60vw] lg:w-[30vw] drop-shadow-xs drop-shadow-black" />
      {iconMap[type]}
      <div className={`py-8 text-xs md:text-md lg:text-lg font-semibold ${textColorMap[type]} text-center`}>
        <>
            {children}
        </>
      </div>
    </div>
  );
}

Error.Special = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

export default Error
