interface Props {
  loading: boolean;
  items?: any[] | null;
  colNumber: number;
  text?: string,
}

function TableDataLoading({ loading,items,colNumber,text="Brak Danych" }: Props) {

    return (
        <>
            {/*  Spinner */}
            {loading && (
                <tr className="bg-white dark:bg-neutral-900/50">
                    <td colSpan={colNumber} className=" bg-white dark:bg-neutral-900/50">
                        <div className="w-full flex items-center justify-center p-4 absolute inset-0">
                            <div className="loader w-10 h-10 border-[5px] border-sky-950 dark:border-sky-500"></div>
                        </div>
                    </td>
                </tr>
            )}

            {/*  Placeholder dla Spinner */}
            {(!items || items.length === 0) && loading && (
                <tr className="bg-white dark:bg-neutral-900/50 h-[150px] rounded-sm">
                    <td colSpan={colNumber}></td>
                </tr>
            )}

            {/*  Brak Danych */}
            {!loading && (!items || items?.length == 0) && (
                <tr>
                    <td colSpan={colNumber} className="text-center py-4 text-xl font-medium bg-white dark:bg-neutral-900/50 h-[150px] rounded-sm">{text}</td>
                </tr>
            )}  
        </>
    )
}

export default TableDataLoading
