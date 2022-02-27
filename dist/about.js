function drawAbout() {
    const aboutRow = document.createElement('div');
    aboutRow.className = "row d-flex justify-content-center";
    const aboutTextDiv = document.createElement('div');
    aboutTextDiv.className = "col-5";
    const h1Title = document.createElement("h1");
    h1Title.innerText = "Crypto Site";
    const h6Text = document.createElement('h6');
    h6Text.innerText = "Welcome to Crypto site!\n\n In this site you can see all of the BEST coins in the market!\n Want to check the value of a coin? Just click 'Toggle Data' and you there!!!\n Also you can togle the switch above them and add them to your favorites!\n By click on 'Realtime Report' you can see the REAL TIME price of your favorite coin! AMAZING!!!\n So enjoy the site and have a great day!";
    const pText = document.createElement('p');
    pText.innerText = "Created by Guy Zipory, JB Full Stack Course #72 ";
    aboutTextDiv.append(h1Title, h6Text, pText);
    const aboutIMGDiv = document.createElement('div');
    aboutIMGDiv.className = "col-1";
    const img = document.createElement("img");
    img.src = "./imgs/guyphoto.jpg";
    img.className = "imgAbout";
    aboutIMGDiv.append(img);
    aboutRow.append(aboutTextDiv, aboutIMGDiv);
    $("#content").html(aboutRow);
}
