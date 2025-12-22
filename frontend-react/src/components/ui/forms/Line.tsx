
type Props = {
    text: string;
};

const Line = ({text}: Props) => (
    <div className='text-(--app_color_dark) dark:text-(--app_color_light) border-b border-(--app_color_dark) dark:border-(--app_color_light) pt-4 pb-2 mb-4'>{text}</div>
);
export default Line;
