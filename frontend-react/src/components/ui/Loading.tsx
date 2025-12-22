import logo from "@/assets/logos/app_logo.svg"

type Props = {
    fullScreen?: boolean;
};

function Loading({fullScreen = false}: Props) {

    return (
        <>
            <div className={fullScreen ? ('min-h-screen flex flex-col justify-center items-center'):('flex-1 flex flex-col justify-center items-center')}>
                <div className="rounded-xl shadow-md dark:ring dark:ring-neutral-950 m-2 bg-white dark:bg-neutral-800 dark:text-neutral-100 p-4">
                    <img src={logo} className="w-[30vw]"/>
                    <div className="flex justify-center items-center pt-2">
                        <div className="loader w-[50px] h-[50px] border-[5px] border-(--app_color) dark:border-(--app_color)"></div>
                        
                        <div className="ps-4 text-xl font-semibold text-(--app_color) dark:text-(--app_color)">ŁADOWANIE</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loading
