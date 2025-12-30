
type Props = {
    text: string;
};

const Line = ({text}: Props) => (
    <div className='text-sky-800 dark:text-sky-500 border-b border-sky-800 dark:border-sky-500 pt-4 pb-2 mb-4'>{text}</div>
);
export default Line;
