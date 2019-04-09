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
        //var i = 0;
        //do {
        //var profielId = 5;
        //var profielId = Math.floor(Math.random() * 100);
        var profielId = i + 1;
        let url = rooturl + '/profiel/read_one.php?id=' + profielId;



        fetch(url)
            .then(function (resp) {
                // console.log(resp.json());
                return resp.json();
            })
            .then(function (data) {
                if (data.id != null) {
                    i++;
                    console.log(data);
                    // voegPersoonToe(data);
                    plaatsPersoon(data);
                }
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
    //while (i < aantal)
}

function voegPersoonToe(peroon) {
    oGebruikers.push(peroon);
}

function plaatsPersoon(persoon) {

    // var placeId = document.getElementById("prof" + iPers);
    var placeId = document.getElementById("persoon");
    var eDiv = document.createElement('div');
    eDiv.setAttribute('class', 'card');
    eDiv.setAttribute('id', 'prof' + iPers);
    placeId.appendChild(eDiv);
    placeId = document.getElementById('prof' + iPers);
    eA = document.createElement('a');
    eA.setAttribute('href', '?gebruiker=' + persoon.id);
    eA.setAttribute('id', 'a' + iPers);
    placeId.appendChild(eA);
    placeId = document.getElementById('a' + iPers);
    var eImg = document.createElement('img');
    eImg.setAttribute('src', 'https://scrumserver.tenobe.org/scrum/img/' + persoon.foto);
    eImg.setAttribute('class', 'img-thumbnail')
    placeId.appendChild(eImg);
    eDiv = document.createElement('div');
    eDiv.setAttribute('class', 'card-body');
    eDiv.setAttribute('id', 'bodyprof' + iPers)
    placeId.appendChild(eDiv);
    placeId = document.getElementById('bodyprof' + iPers);
    var eP = document.createElement('p');
    eP.innerHTML = persoon.nickname;
    placeId.appendChild(eP);

    // var eP = document.createElement('p');
    // eP.innerHTML = persoon.id;
    // placeId.appendChild(eP);
    // var eP = document.createElement('p');
    // eP.innerHTML = persoon.voornaam;
    // placeId.appendChild(eP);
    // var eP = document.createElement('p');
    // eP.innerHTML = persoon.familienaam;
    // placeId.appendChild(eP);
    // var eP = document.createElement('p');
    // eP.innerHTML = persoon.geboortedatum;
    // placeId.appendChild(eP);
    // var eP = document.createElement('p');
    // eP.innerHTML = persoon.email;
    // placeId.appendChild(eP);
    // var eP = document.createElement('p');
    // eP.innerHTML = persoon.nickname;
    // placeId.appendChild(eP);
    // var eP = document.createElement('p');
    // eP.innerHTML = persoon.beroep;
    // placeId.appendChild(eP);
    // var eP = document.createElement('p');
    // eP.innerHTML = persoon.sexe;
    // placeId.appendChild(eP);
    // var eP = document.createElement('p');
    // eP.innerHTML = persoon.haarkleur;
    // placeId.appendChild(eP);
    // var eP = document.createElement('p');
    // eP.innerHTML = persoon.groote;
    // placeId.appendChild(eP);

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