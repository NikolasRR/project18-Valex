import dayjs from "dayjs";

export function formatTimestamps(list) {
    list.forEach(element => element.timestamp = dayjs(element.timestamp).format('DD/MM/YYYY'));
    
    return list;
}