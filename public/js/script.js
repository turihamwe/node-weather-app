// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const form = document.querySelector("form")
const search = document.querySelector("input")
const p1 = document.querySelector("#p1")
const p2 = document.querySelector("#p2")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value

    p1.innerHTML = "Loading..."
    p2.innerHTML = ""

    if(!location){
        p1.innerHTML = "You must submit an address below."
    }

    fetch("/weather?location=" + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                p1.innerHTML = data.error
            }else{
                p1.innerHTML = data.location
                p2.innerHTML = data.forecast
            }
        })
    })
})