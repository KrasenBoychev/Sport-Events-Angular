import moment from "moment";

export function minDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDay() + 2;
    
    return moment({ year: year, month: month, day: day }).format('YYYY-MM-DD');
}