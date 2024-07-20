export function myDateTimeFormatter(date: Date): string {
    return date.toDateString() + " " + date.toLocaleTimeString("en-GB")
}