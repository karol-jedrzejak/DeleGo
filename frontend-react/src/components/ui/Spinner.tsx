

type Props = {
    button?: boolean;
    buttonClassName?: string;
};

function Spinner({button=false,buttonClassName=""}:Props) {
    return (
        <>
            {button ? (
                <div className={`w-6 h-6 pe-1 flex items-center justify-center `+buttonClassName}>
                    <div className={`loader w-4 h-4 border-[3px] border-black dark:border-neutral-400`}></div>
                </div>
                ):(
                <div className='loader w-5 h-5 border-[3px] border-sky-950 dark:border-sky-500'></div>
            )}
        </>
    )
}
export default Spinner
