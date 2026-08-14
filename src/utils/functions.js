import { getDepartments } from "../api/departments.js";

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

export async function sortDepartments() {
    const data = await getDepartments()
    data.sort((a, b) => a.name.localeCompare(b.name))
    const sorted = data.map(dat => (
        {
            id: dat.id,
            name: dat.name
        }
    ))
    return sorted
}

export function addS(str) {
    const lastChar = str.charAt(str.length - 1).toLowerCase()

    if (lastChar === "s") {
        return str
    }
    str = str.split("")
    str.push("s")
    return str.join("")
}