type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    type?: "date"|"datetime-local"|"email"|"hidden"|"month"|"number"|"password"|"search"|"tel"|"text"|"time"|"week",
    name: string,
    value: string|number,
    placeholder?: string,   
    classNameInput?: string,
    classNameLabel?: string,
    label: string,
    errors?: string[] | null,
    autoComplete?:  string,
    linear?: boolean,
    classNameContainer?: string,
    unit?: string | null,
    disabled?: boolean,
};

const Input = ({
    type = "text",
    name = "",
    value = "",
    placeholder = "",   
    classNameContainer = "",
    classNameInput = "",
    classNameLabel = "",
    label = "",
    errors = null,
    autoComplete = "off",
    linear = false,
    unit = null,
    disabled = false,
    ...props 
}: Props) => (
    <>
        <div className={classNameContainer}>
            <div className={`flex justify-between ` + (linear ? ("items-center"):("flex-col items-start"))}>
                <label className={`my-2 me-4 font-medium text-gray-900 dark:text-gray-100 ${classNameLabel}`} htmlFor={name}>{label}</label>
                <div className={`flex `+ (linear ? ("flex-1"):("w-full"))}>
                    <input
                        {...props }
                        name={name}
                        type={type}
                        value={value}
                        disabled={disabled}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        className={`my-2 px-3 py-2 border `
                            +(disabled ? `text-neutral-800 bg-neutral-200 border-neutral-400 ` : `text-gray-900 dark:text-gray-900 border-gray-400 dark:border-gray-500 bg-white `)+
                            `focus:outline-none shadow-md focus:ring-3 focus:ring-sky-600 ${classNameInput}` + (unit ? (" rounded-s-md text-right") :(" rounded-md"))}
                    />
                    <>
                    {unit ? (<span className={`my-2 px-3 py-2 `+
                    `text-gray-900 dark:text-gray-900 border-gray-400 dark:border-gray-500 bg-neutral-300`+
                    ` rounded-e-md border-y border-e`}>{unit}</span>) : (<></>)}
                    </>
                </div>
            </div>
            {errors && <div className="text-red-600 my-2 text-center text-sm">
                {errors.map( (error,key) => (
                                <span key={key}>{error} </span>
                            ))}
                </div>}
        </div>
    </>
);

export default Input;