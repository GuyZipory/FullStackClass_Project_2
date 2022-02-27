function drawListModal(id) {
    if (!id)
        return;
    $(".modal-body").html("");
    const table = document.createElement("table");
    table.className = "table";
    const tbody = document.createElement("tbody");
    state.favCoins.map(e => tbody.append(drawlistobject(e, id)));
    table.append(tbody);
    $(".modal-body").html(table);
}
function drawlistobject(coin, newid) {
    if (!coin)
        return;
    if (!newid)
        return;
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    tdName.innerText = coins.find((item) => item.id === coin).name;
    tr.append(tdName);
    const tdDel = document.createElement("td");
    const button = document.createElement("button");
    button.innerText = "X";
    button.className = "btn btn-danger";
    button.setAttribute("data-dismiss", "modal");
    button.onclick = function () {
        removeFromFav(coin);
        addToFav(newid);
        drawCards(coins);
    };
    tdDel.append(button);
    tr.append(tdDel);
    return tr;
}
