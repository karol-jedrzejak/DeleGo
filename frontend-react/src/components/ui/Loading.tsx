import logo from "@/assets/logos/app_logo.svg"

type Props = {
    fullScreen?: boolean;
};

function Loading({fullScreen = false}: Props) {

    return (
        <>
            <div className={fullScreen ? ('min-h-screen flex flex-col justify-center items-center'):('flex-1 flex flex-col justify-center items-center')}>
                <div className="shadow-md dark:ring dark:ring-neutral-900/75 m-2 bg-white dark:bg-neutral-800 dark:text-neutral-100 p-4">
                    <img src={logo} className="w-[30vw]"/>
                    <div className="flex justify-center items-center pt-2">
                        <div className="loader w-[50px] h-[50px] border-[5px] border-sky-800 dark:border-sky-500"></div>
                        
                        <div className="ps-4 text-xl font-semibold text-sky-800 dark:text-sky-500">ŁADOWANIE</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loading
