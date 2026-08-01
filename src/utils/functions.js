export function checkDateFormat() {
    const dateToFormat = new Intl.DateTimeFormat("en-UK", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date())

    return dateToFormat.split("/").reverse().join("-")
}

export function removeLastString(string) {
    const array = string.split("")
    array.pop();
    const result = array.join("")
    return result
}

export function getTime() {
    const date = new Intl.DateTimeFormat("en-Us", {
        timeStyle: "medium"
    }).format(new Date())
    return date
}