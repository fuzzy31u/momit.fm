export function formatDate(date: string): string {
    // const fmtDate = new Date(e.pubDate).toISOString().split('T')[0]
    const d = new Date(date)
    const month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    return [year, month, day].join("/");
}