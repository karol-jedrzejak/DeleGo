export const formatCurrency = (
    amount: number,
    currencyCode: string
) => {
    return new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "symbol",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
    }).format(amount);
};