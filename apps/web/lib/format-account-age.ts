export const formatAccountAge = (createdAt: string | Date, now: Date = new Date()): string => {
    const start = new Date(createdAt);
    if (isNaN(start.getTime())) return "";

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`;

    if (years > 0) {
        return months > 0
            ? `${plural(years, "year")}, ${plural(months, "month")}`
            : plural(years, "year");
    }
    if (months > 0) return plural(months, "month");
    if (days > 0) return plural(days, "day");
    return "today";
}