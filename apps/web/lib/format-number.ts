const compactFormatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
})

export const formatCompactNumber = (value: number): string => {
    return compactFormatter.format(value)
}