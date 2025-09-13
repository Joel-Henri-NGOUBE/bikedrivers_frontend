export function formateDate(date){
        return date 
        ? (
            date.split("T").length !== 1 
            ? date.split("T")[0]
            : date)
        : (new Date()).toLocaleDateString("fr-FR", {year: "numeric", month: "2-digit", day: "2-digit"}).split("/").reverse().join("-")
}

export function getLastSplittedElement(array){
    return array.split("/").reverse()[0]
}