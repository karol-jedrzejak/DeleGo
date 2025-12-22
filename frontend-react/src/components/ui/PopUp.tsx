
type Props = {
    children: React.ReactNode;
};
const PopUp = ({children}: Props) => {

  return (
    <div className='absolute inset-0 w-full bg-black/75 flex flex-row justify-center items-center z-50'>
        <div className='fixed w-full inset-0 flex flex-col justify-center items-center'>
            {children}
        </div>
    </div>
    );
};

export default PopUp;
