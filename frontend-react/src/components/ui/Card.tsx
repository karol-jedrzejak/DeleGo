type Props = {
  children: React.ReactNode
  className?: string,
};

const Card = ({ children,className="" }: Props) => {

  return (
    <div className={className+` shadow-md dark:ring dark:ring-neutral-900 m-2 bg-white dark:bg-neutral-800 dark:text-white`}>
      {children}
    </div>
    );
};

Card.Header = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-slate-300 dark:bg-sky-950 text-black dark:text-white py-2 px-4">{children}</div>
)

Card.Body = ({ children }: { children: React.ReactNode }) => (
  <div  className="py-4 px-4">{children}</div>
)

export default Card;

