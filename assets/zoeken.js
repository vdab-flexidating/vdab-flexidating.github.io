var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

/* Global vars
 ****************/
var data;

window.onload = function () {

}

document.getElementById('knop12').addEventListener('click', function (e) {
    let page = document.getElementById('input12_1').value;
    let pageSize = document.getElementById('input12_2').value;

    let url = rooturl + '/profiel/read.php?page=' + page + '&pageSize=' + pageSize;;
    //DEBUG 
    // pageSize = 10;

    haalDataOp(url)
});

document.getElementById('knop3').addEventListener('click', function (e) {
    let grootte = document.getElementById('input3_1').value;
    let grootteOperator = document.getElementById('input3_2').value;
    let orderby = document.getElementById('input3_3').value;

    let url = rooturl + '/profiel/search.php?grootte=' + grootte + '&grootteOperator=' + grootteOperator + '&orderBy=' + orderby;

    haalDataOp(url)
});

document.getElementById('knop4').addEventListener('click', function (e) {
    let voornaam = document.getElementById('input4_1').value;

    let url = rooturl + '/profiel/search.php?voornaam=' + voornaam;

    haalDataOp(url)
});

document.getElementById('knop13').addEventListener('click', function (e) {
    let nickname = document.getElementById('input13_1').value;
    let fuzzy = document.getElementById('input13_2').checked;

    let url = rooturl + '/profiel/search.php?voornaam=' + nickname;

    if (fuzzy) {
        url += '&voornaamFuzzy=1';
    }

    haalDataOp(url)
});

document.getElementById('knop5').addEventListener('click', function (e) {
    let geslacht = document.getElementById('input5_1').value;

    let url = rooturl + '/profiel/search.php?sexe=' + geslacht;

    haalDataOp(url)
});

document.getElementById('knop11').addEventListener('click', function (e) {
    let rangeMinGeboortedatum = document.getElementById('input11_1').value;
    let rangeMaxGeboortedatum = document.getElementById('input11_2').value;

    let rangeMinGrootte = document.getElementById('input11_3').value;
    let rangeMaxGrootte = document.getElementById('input11_4').value;

    let url = rooturl + '/profiel/search.php'
    url += '?geboortedatumOperator=range&rangeMinGeboortedatum=' + rangeMinGeboortedatum + '&rangeMaxGeboortedatum=' + rangeMaxGeboortedatum;
    url += '&grootteOperator=range&rangeMinGrootte=' + rangeMinGrootte + '&rangeMaxGrootte=' + rangeMaxGrootte;

    haalDataOp(url)
});

document.getElementById('knop6').addEventListener('click', function (e) {
    let geboortedatum = document.getElementById('input6_1').value;
    let geboortedatumOperator = document.getElementById('input6_2').value;

    let url = rooturl + '/profiel/search.php?geboortedatum=' + geboortedatum + '&geboortedatumOperator=' + geboortedatumOperator;

    haalDataOp(url)
});

function haalDataOp(url) {
    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            plaatsPersonen(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function plaatsPersonen(oaData) {
    var placeId = document.getElementById("persoon");

    while (placeId.hasChildNodes()) {
        placeId.removeChild(placeId.lastChild);
    }


    // let page = document.getElementById('input12_1').value;
    let pageSize = document.getElementById('input12_2').value;

    console.log(Paginator(oaData, 1, pageSize))
    console.log(Paginator(oaData, 2, pageSize))
    console.log(Paginator(oaData, 3, pageSize))

    for (var i = 0; i < oaData.length; i++) {
        plaatsPersoon(oaData[i], i)
    }
}

function plaatsPersoon(persoon, i) {

    var placeId = document.getElementById("persoon");
    var eDiv = document.createElement('div');
    eDiv.setAttribute('class', 'card');
    eDiv.setAttribute('id', 'prof' + i);
    placeId.appendChild(eDiv);
    placeId = document.getElementById('prof' + i);
    eA = document.createElement('a');
    eA.setAttribute('href', '/profiel.html?gebruiker=' + persoon.id);
    eA.setAttribute('id', 'a' + i);
    placeId.appendChild(eA);
    placeId = document.getElementById('a' + i);
    var eImg = document.createElement('img');
    eImg.setAttribute('src', 'https://scrumserver.tenobe.org/scrum/img/' + persoon.foto);
    eImg.setAttribute('class', 'img-thumbnail')
    placeId.appendChild(eImg);
    eDiv = document.createElement('div');
    eDiv.setAttribute('class', 'card-body');
    eDiv.setAttribute('id', 'bodyprof' + i)
    placeId.appendChild(eDiv);
    placeId = document.getElementById('bodyprof' + i);
    var eP = document.createElement('p');
    eP.innerHTML = persoon.nickname;
    placeId.appendChild(eP);
    // console.log(persoon.nickname + " is geplaatst");
}

function Paginator(items, page, per_page) {

    var page = page || 1,
        per_page = per_page || 12,
        offset = (page - 1) * per_page,

        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}