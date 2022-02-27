
const ApiGrpDataUrl =  `https://min-api.cryptocompare.com/data/pricemulti?fsyms=`
let state = {favCoins:[]}

function init():void {
    const localState = localStorage.getItem("state");
    if (localState){
        state = JSON.parse(localState)
    }
    navbar("coins");
    $("#aCoin").on("click",()=>{
        navbar("coins");
    })
    $("#aRealtime").on("click",()=>{
        navbar("Realtime");
    })
    $("#aAbout").on("click",()=>{
        navbar("about");
    })


}

init()
