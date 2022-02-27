let chart;
let grpData = [];
function ajaxgetGrpData() {
    const grpcoinsymb = _favToSymbString(state.favCoins);
    $.ajax({
        type: "GET",
        url: `${ApiGrpDataUrl}${grpcoinsymb}&tsyms=USD`,
        success: function (result) {
            _setData(result);
        },
        error: function () {
            throw new Error("Could not fatch coins");
        }
    });
    function _favToSymbString(data) {
        const fav = data.map(e => coins.find((item) => item.id === e).symbol.toUpperCase());
        const favString = fav.toString();
        return favString;
    }
    function _setData(data) {
        for (let index = 0; index < grpData.length; index++) {
            grpData[index].setDataPoint(data[grpData[index].symbol]["USD"]);
        }
        chart.render();
    }
}
function makeGrpData() {
    grpData = [];
    state.favCoins.map(e => grpData.push(_favGrpData(e)));
    ajaxgetGrpData();
    function _favGrpData(id) {
        return new GrpLine(id);
    }
}
class GrpLine {
    constructor(id) {
        this.id = id;
        this.name = this.getName(id);
        this.symbol = this.getSymbol(id);
        this.type = "spline";
        this.yValueFormatString = "#0.## $";
        this.showInLegend = true;
        this.dataPoints = [];
    }
    getName(id) {
        return coins.find((item) => item.id === id).name;
    }
    getSymbol(id) {
        return coins.find((item) => item.id === id).symbol.toUpperCase();
    }
    setDataPoint(data) {
        this.dataPoints.push({ x: new Date(), y: data });
    }
}
function drawgrp() {
    chart = new CanvasJS.Chart("content", {
        animationEnabled: true,
        title: {
            text: "Crypto Coins Value"
        },
        axisX: {
            valueFormatString: "HH:mm:ss"
        },
        axisY: {
            title: "Value (in $)",
            suffix: " $"
        },
        legend: {
            cursor: "pointer",
            fontSize: 16,
            itemclick: toggleDataSeries
        },
        toolTip: {
            shared: true
        },
        data: grpData
    });
    chart.render();
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
}
