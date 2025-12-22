type Props = {
  children: React.ReactNode
  className?: string,
};

const Card = ({ children,className="" }: Props) => {

  return (
    <div className={className+` rounded-md shadow-md dark:ring dark:ring-neutral-950 m-2 bg-white dark:bg-neutral-800 dark:text-neutral-100`}>
      {children}
    </div>
    );
};

Card.Header = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-(--app_color) rounded-t-md text-black py-2 px-4">{children}</div>
)

Card.Body = ({ children }: { children: React.ReactNode }) => (
  <div  className="py-4 px-4">{children}</div>
)

export default Card;

