type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
    name: string,  
    classNameInput?: string,
    classNameLabel?: string,
    label: string,
    errors?: string[] | null,
    autoComplete?:  string,
    linear?: boolean,
    classNameContainer?: string,
    children: React.ReactNode,
};

const Select = ({
    name = "",
    classNameContainer = "",
    classNameInput = "",
    classNameLabel = "",
    label = "",
    errors = null,
    autoComplete = "off",
    linear = false,
    children,
    ...props
}: Props) => (
    <>
        <div className={classNameContainer}>
            <div className={`flex justify-between ` + (linear ? ("items-center"):("flex-col items-start"))}>
                <label className={`my-2 pe-4 font-medium text-gray-900 dark:text-gray-100 ${classNameLabel}`} htmlFor={name}>{label}</label>
                <select
                    name={name}
                    autoComplete={autoComplete}
                    className={`custom-select my-2 px-3 py-2 border text-gray-900 dark:text-gray-900 border-gray-400 dark:border-gray-200 bg-white rounded-md focus:outline-none shadow-md focus:ring-3 focus:ring-(--app_color) ${classNameInput}`}
                    {...props}
                >
                    {children}
                </select>
            </div>
            {errors && <div className="text-red-600 my-2 text-center text-sm">
                {errors.map( (error,key) => (
                                <span key={key}>{error} </span>
                            ))}
                </div>}
        </div>
    </>
);

export default Select;