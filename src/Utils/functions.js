export function formateDate(date){
        return date 
        ? (
            date.split("T").length !== 1
            ? date.split("T")[0]
            : date)
        : (new Date()).toLocaleDateString("fr-FR", {year: "numeric", month: "2-digit", day: "2-digit"}).split("/").reverse().join("-")
}

export function getLastSplittedElement(string){
    return string.split("/").reverse()[0]
}

export function sliceText(text, maxLenght){
    const length = text.length
    if(length > maxLenght){
        return text.slice(0, maxLenght) + "..."
    }
    return text
}

export function sliceFileName(fileName, maxLenght){
    const splittedNameWithExtension = fileName.split(".")
    const extension = splittedNameWithExtension.reverse()[0]
    splittedNameWithExtension.reverse().pop()
    const stringWithoutExtension = splittedNameWithExtension.join(".")
    const splittedNameWithHash = stringWithoutExtension.split("-")
    splittedNameWithHash.pop()
    const stringName = splittedNameWithHash.join("-")
    return sliceText(stringName, maxLenght) + `.${extension}`

}


// console.log(sliceFileName("umldhqvfjvuiezguskfgukzegfeuzgfugzskufgzjusgfusfusufgiusfgieurhfuehsiodhgiltdhlhgiltligilghbk-68c57bca76897857494680.pdf", 10))