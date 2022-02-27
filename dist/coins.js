const ApiCoinsUrl = `https://api.coingecko.com/api/v3/coins`;
let coins = [];
function drawSearch() {
    const searchRow = document.createElement("div");
    searchRow.className = "row";
    const searchDiv = document.createElement("div");
    searchDiv.className = "col-12 d-flex justify-content-center mb-2";
    searchRow.append(searchDiv);
    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.id = "searchBar";
    searchBar.className = "col-3 mx-2";
    searchDiv.append(searchBar);
    const searchButton = document.createElement("button");
    searchButton.className = "btn btn-success";
    searchButton.innerText = "Search";
    searchButton.addEventListener("click", function () {
        if ($("#searchBar").val() === "") {
            drawCards(coins);
        }
        else {
            drawCards(coins.filter(coin => coin.symbol === $("#searchBar").val()));
        }
    });
    searchDiv.append(searchButton);
    $("#content").append(searchRow);
}
function drawCards(data) {
    $("#cardcontent").remove();
    $("#content").append('<div class="row d-flex justify-content-center" id="cardcontent"></div>');
    if (!data || data.length === 0) {
        $("#cardcontent").append('<h3 style="text-align:center;">No Data Found</h3>');
    }
    else {
        data.map(e => (card(e)));
    }
}
function ajaxgetCardsData() {
    $("#content").append("<div class='loader'>Loading...</div>");
    $.ajax({
        type: "GET",
        url: `${ApiCoinsUrl}`,
        success: function (result) {
            $(".loader").remove();
            coins = result;
            drawCards(coins);
        },
        error: function () {
            throw new Error("Could not fatch coins");
        }
    });
}
function drawMoreData(data, cardId) {
    if (!data)
        return;
    if (!cardId)
        return;
    const dataDiv = document.createElement('div');
    const img = document.createElement("img");
    img.src = `${data["image"]["small"]}`;
    const priceUSD = document.createElement("p");
    priceUSD.innerText = `USD: ${data["market_data"]["current_price"]["usd"]}$`;
    const priceEUR = document.createElement("p");
    priceEUR.innerText = `EUR: ${data["market_data"]["current_price"]["eur"]}€`;
    const priceILS = document.createElement("p");
    priceILS.innerText = `ILS: ${data["market_data"]["current_price"]["ils"]}₪`;
    dataDiv.append(img, priceUSD, priceEUR, priceILS);
    $(`#${cardId}`).html(dataDiv);
}
function ajaxgetMoreData(id, cardId) {
    if (!id)
        return;
    if (!cardId)
        return;
    $(`#dataCard${id}`).html("<div class='loader'>Loading...</div>");
    $.ajax({
        type: "GET",
        url: `${ApiCoinsUrl}/${id}`,
        success: function (result) {
            $(".loader").remove();
            drawMoreData(result, cardId);
            localStorage.setItem(id, JSON.stringify(result));
            setTimeout(() => {
                localStorage.removeItem(id);
            }, 120000);
        },
        error: function () {
            throw new Error("Could not fatch coin data");
        }
    });
}
function card(data) {
    if (!data)
        return;
    const rapColDiv = document.createElement("div");
    rapColDiv.className = "col-lg-2 col-sm-1 m-1";
    rapColDiv.id = `div_${data["id"]}`;
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.style.width = "15rem";
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const toggleLabel = document.createElement("label");
    toggleLabel.className = "switch toRight";
    const toggleinput = document.createElement("input");
    toggleinput.type = "checkbox";
    toggleinput.checked = _isToggleChecked(data["id"]);
    toggleinput.id = `toggle_${data["id"]}`;
    const toggleSpan = document.createElement("span");
    toggleSpan.className = "slider round";
    toggleLabel.onchange = function () {
        if (toggleinput.checked) {
            addToFav(data["id"]);
        }
        else {
            removeFromFav(data["id"]);
        }
    };
    toggleLabel.append(toggleinput, toggleSpan);
    cardBody.append(toggleLabel);
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerText = data["symbol"];
    cardBody.append(cardTitle);
    const cardP = document.createElement("p");
    cardP.className = "card-text";
    cardP.innerText = data["name"];
    cardBody.append(cardP);
    const cardA = document.createElement("a");
    cardA.href = `#dataCard${data["id"]}`;
    cardA.setAttribute("data-toggle", "collapse");
    cardA.setAttribute("role", "button");
    cardA.setAttribute("aria-expanded", "false");
    cardA.setAttribute("aria-controls", `dataCard${data["id"]}`);
    cardA.className = "btn btn-primary";
    cardA.innerText = "Toggle Data";
    cardA.addEventListener("click", function () {
        ajaxgetMoreData(data["id"], `dataCard${data["id"]}`);
    });
    cardBody.append(cardA);
    const cardData = document.createElement("div");
    cardData.className = "collapse mt-3";
    cardData.id = `dataCard${data["id"]}`;
    cardData.innerText = "";
    cardBody.append(cardData);
    cardDiv.append(cardBody);
    rapColDiv.append(cardDiv);
    $("#cardcontent").append(rapColDiv);
    function _isToggleChecked(id) {
        if (!id)
            return;
        if (state.favCoins.includes(id))
            return true;
        return false;
    }
}
function addToFav(id) {
    if (!id)
        return;
    if (state.favCoins.length === 5) {
        drawCards(coins);
        drawListModal(id);
        $("#myModal").modal();
    }
    else {
        state.favCoins.push(id);
        localStorage.setItem("state", JSON.stringify(state));
    }
}
function removeFromFav(id) {
    if (!id)
        return;
    if (!state.favCoins.includes(id))
        return;
    state.favCoins = state.favCoins.filter(item => item !== id);
    localStorage.setItem("state", JSON.stringify(state));
}
