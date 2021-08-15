let cp = document.querySelector('#cp');
let quant = document.querySelector('#quant');
let sp = document.querySelector('#sp');
let btnCheck = document.querySelector('.btn-check');
let outDiv = document.querySelector('#out-div');
let stockSelected = document.querySelector('select');
// let selectEl = document.querySelector('#stockSelected')
let option;

function selectOption(){
    option = stockSelected.options[stockSelected.selectedIndex].text
    console.log(option)
    return option
}


urlDetails = {
    baseUrl : "https://cloud.iexapis.com/stable/stock",
    api_key : "pk_640c14d27af147b5916b5cf02f7a657f"
}

function constructURL(){
    let api = `${urlDetails.baseUrl}/${selectOption()}/intraday-prices?token=${urlDetails.api_key}`;
    console.log(api);
    return api;
}

function errorHandler(error){
    console.log("error occured", error)
    outDiv.innerHTML = `<h2>OOPS! Server Error 🔄</h2>`
}


function getLatestSP(){
    fetch(constructURL())
    .then((response)=> response.json())
    .then((data) => {
        var details = data[data.length - 1].close;
        console.log(details);
        sp.value = details;
    })
    .catch(errorHandler);
}

quant.addEventListener('keyup', getLatestSP)


function checkPandL(){
    let CP = Number(cp.value);
    let SP = Number(sp.value);
    let Quant = Number(quant.value);
    if (CP>SP){
        let loss = ((CP - SP)*Quant).toFixed(2);
        let lossPercent = (((CP - SP)/CP)*100).toFixed(2);
        outDiv.innerHTML = `<p>You lost ${lossPercent}. Your total loss is ₹${loss}</p>`
        console.log("loss")
    }
    else{
        let profit = ((SP - CP)*Quant).toFixed(2);
        let profitPercent = (((SP - CP)/CP)*100).toFixed(2);
        outDiv.innerHTML = `<p>You profit ${profitPercent}%. Your total profit is ₹${profit}</p>`
        console.log("profit")
    }
}

btnCheck.addEventListener('click',checkPandL);




    



