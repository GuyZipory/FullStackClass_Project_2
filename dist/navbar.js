let grpInter = null;
function navbar(s) {
    if (!s)
        return;
    clrContent();
    switch (s) {
        case "coins":
            $("#aRealtime").removeClass("active");
            $("#aAbout").removeClass("active");
            $("#aCoin").addClass("active");
            drawSearch();
            ajaxgetCardsData();
            if (grpInter) {
                clearInterval(grpInter);
                grpInter = null;
            }
            break;
        case "Realtime":
            $("#aRealtime").addClass("active");
            $("#aAbout").removeClass("active");
            $("#aCoin").removeClass("active");
            if (state.favCoins.length !== 0) {
                makeGrpData();
                drawgrp();
                if (!grpInter) {
                    grpInter = setInterval(() => {
                        ajaxgetGrpData();
                    }, 2000);
                }
            }
            else {
                $("#content").html('<div class="col-12 d-flex justify-content-center m-4"><h1>Please select favorite coins first</h1></div>');
            }
            break;
        case "about":
            $("#aRealtime").removeClass("active");
            $("#aAbout").addClass("active");
            $("#aCoin").removeClass("active");
            drawAbout();
            if (grpInter) {
                clearInterval(grpInter);
                grpInter = null;
            }
            break;
    }
}
function clrContent() {
    $("#content").html("");
}
