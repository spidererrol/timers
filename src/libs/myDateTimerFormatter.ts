export function myDateTimeFormatter(date: Date): string {
    return date.toLocaleDateString("en-GB", { weekday: "short", year: "numeric", month:"short", day: "numeric" }) + " " + date.toLocaleTimeString("en-GB")
}