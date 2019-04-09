var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

/* Global vars
 ****************/
var oGebruikers = [];
var iPers = 0;

window.onload = function () {
    //  random 10 profielen op te halen


    // var oaProf10 = []
    haalPersonenOp(5);

    plaatsGebruiker(oGebruikers);

    // while (i < 5);
    // console.log(oaProf10);
    // set10prof(oaProf10);
    // console.log("na functie");


    // var profielId = Math.floor(Math.random() * 100);
    // }
}

function haalPersonenOp(aantal) {
    for (var i = 0; i < aantal; i++) {
        // var i = 0;
        // do {
        //var profielId = 5;
        //var profielId = Math.floor(Math.random() * 100);
        var profielId = i + 1
        let url = rooturl + '/profiel/read_one.php?id=' + profielId;



        fetch(url)
            .then(function (resp) {
                // console.log(resp.json());
                return resp.json();
            })
            .then(function (data) {

                console.log(data);
                // voegPersoonToe(data);
                plaatsPersoon(data);
            })
            .catch(function (error) {
                console.log(error);
            });



        // fetch(url)
        //     .then(function (resp) {
        //         return resp.json();
        //     })
        //     .then(function (data) {
        //         console.log(data);
        //          if (typeof data != string){
        //             oaProf10.push(data);
        //         i++;
        //         }
        //         oaProf10.push(data);
        //         console.log(oaProf10.length);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }
}

function voegPersoonToe(peroon) {
    oGebruikers.push(peroon);
}

function plaatsPersoon(peroon) {

    var placeId = document.getElementById("prof" + iPers);
    var eImg = document.createElement('img');
    eImg.setAttribute('src', 'https://scrumserver.tenobe.org/scrum/img/' + peroon.foto);
    eImg.setAttribute('class', 'img-thumbnail')
    placeId.appendChild(eImg);
    iPers++;
    if (iPers === 4) {
        iPers = 0;
    }

}

function plaatsGebruiker(oGebruikers) {

    console.log("start functie");
    console.log(oGebruikers.length);
    //console.log(oaProf10[0].id);
    for (i = 0; i < oGebruikers.length; i++) {
        var placeId = document.getElementById("prof" + i);
        var eImg = document.createElement('img');
        eImg.setAttribute('src', 'https://scrumserver.tenobe.org/scrum/img/' + oGebruikers[i].foto);
        placeId.appendChild(eImg);
    }

}