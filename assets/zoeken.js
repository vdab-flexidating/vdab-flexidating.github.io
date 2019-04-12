var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

/* Global vars
 ****************/
var data;
var vorigePage = 1;
var huidigePage = 1;
var volgendePage = 1;
var totalPage = 1;
var zoekData;

window.onload = function () {
    let page = 1;
    let pageSize = 12;
    let url = rooturl + '/profiel/read.php?page=' + page + '&pageSize=' + pageSize;;
    //DEBUG 
    // pageSize = 10;

    haalDataOp(url)

    gebruiker = haalUitStorage("gebruiker");
    console.log(gebruiker);
    if (!gebruiker) {
        document.getElementById('errorMsgNietIngelogd').classList.remove('d-none');
        document.getElementById('errorMsgNietIngelogd').innerHTML = "Gelieve in te loggen om deze inhoud weer te geven."
    }
}

// document.getElementById('knop12').addEventListener('click', function (e) {
//     // let page = document.getElementById('input12_1').value;
//     let page = 1;
//     let pageSize = document.getElementById('input12_2').value;
//     let url = rooturl + '/profiel/read.php?page=' + page + '&pageSize=' + pageSize;;
//     //DEBUG 
//     // pageSize = 10;
//     // wisPersonen();
//     haalDataOp(url);
// });

document.getElementById('knop3').addEventListener('click', function (e) {
    let grootte = document.getElementById('input3_1').value;
    let grootteOperator = document.getElementById('input3_2').value;
    let orderby = document.getElementById('input3_3').value;

    let url = rooturl + '/profiel/search.php?grootte=' + grootte + '&grootteOperator=' + grootteOperator + '&orderBy=' + orderby;
    wisPersonen();
    haalDataOp(url);
});

document.getElementById('knop4').addEventListener('click', function (e) {
    let voornaam = document.getElementById('input4_1').value;

    let url = rooturl + '/profiel/search.php?voornaam=' + voornaam;
    wisPersonen();
    haalDataOp(url);
});

document.getElementById('knop13').addEventListener('click', function (e) {
    let nickname = document.getElementById('input13_1').value;
    let fuzzy = document.getElementById('input13_2').checked;

    let url = rooturl + '/profiel/search.php?voornaam=' + nickname;

    if (fuzzy) {
        url += '&voornaamFuzzy=1';
    }
    wisPersonen();
    haalDataOp(url);
});

document.getElementById('knop5').addEventListener('click', function (e) {
    let geslacht = document.getElementById('input5_1').value;

    let url = rooturl + '/profiel/search.php?sexe=' + geslacht;
    wisPersonen();
    haalDataOp(url);
});

document.getElementById('knop11').addEventListener('click', function (e) {
    let rangeMinGeboortedatum = document.getElementById('input11_1').value;
    let rangeMaxGeboortedatum = document.getElementById('input11_2').value;

    let rangeMinGrootte = document.getElementById('input11_3').value;
    let rangeMaxGrootte = document.getElementById('input11_4').value;

    let url = rooturl + '/profiel/search.php'
    url += '?geboortedatumOperator=range&rangeMinGeboortedatum=' + rangeMinGeboortedatum + '&rangeMaxGeboortedatum=' + rangeMaxGeboortedatum;
    url += '&grootteOperator=range&rangeMinGrootte=' + rangeMinGrootte + '&rangeMaxGrootte=' + rangeMaxGrootte;
    wisPersonen();
    haalDataOp(url);
});

document.getElementById('knop6').addEventListener('click', function (e) {
    let geboortedatum = document.getElementById('input6_1').value;
    let geboortedatumOperator = document.getElementById('input6_2').value;

    let url = rooturl + '/profiel/search.php?geboortedatum=' + geboortedatum + '&geboortedatumOperator=' + geboortedatumOperator;
    wisPersonen();
    haalDataOp(url);
});

function haalDataOp(url) {
    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            //plaatsPersonen(data);
            splitsData(data)
            //plaatsInStorage("personen", data)
        })
        .catch(function (error) {
            console.log(error);
        });
}

function splitsData(oaData, iGaNaar) {
    console.log("splitsdata vorige " + vorigePage + " volgende " + volgendePage + " totaal " + totalPage);
    let pageSize = document.getElementById('input12_2').value;
    zoekData = oaData
    oPageData = Paginator(zoekData, iGaNaar, pageSize);
    //console.log(Paginator(zoekData, iGaNaar, pageSize));
    plaatsPersonen(oPageData.data);
    // for (let i = 1, l = oPageData.total_pages; i <= l; i++)
    //     console.log(`Selected page ${i}:`, pagination(i, l));
    vorigePage = oPageData.pre_page;
    huidigePage = oPageData.page;
    volgendePage = oPageData.next_page;
    totalPage = oPageData.total_pages;
    console.log("splitsdata einde vorige " + vorigePage + " volgende " + volgendePage + " totaal " + totalPage);
    oPageBut = pagination(huidigePage, totalPage);
    console.log(oPageBut.rangeWithDots);
    createPaginator(oPageBut.rangeWithDots, huidigePage);
}

function wisPersonen() {
    var placeId = document.getElementById("persoon");

    while (placeId.hasChildNodes()) {
        placeId.removeChild(placeId.lastChild);
    }

    toonerrorMsg("Pagina is aan het laden...");
}


function plaatsPersonen(oaData) {
    var placeId = document.getElementById("persoon");

    while (placeId.hasChildNodes()) {
        placeId.removeChild(placeId.lastChild);
    }



    // let pageSize = document.getElementById('input12_2').value;

    // console.log(Paginator(oaData, 1, pageSize));
    // console.log(Paginator(oaData, 2, pageSize));
    // console.log(Paginator(oaData, 3, pageSize));
    // oPageData = Paginator(oaData, 1, pageSize);
    // console.log(oPageData.data);
    // for (var i = 0; i < oPageData.data.length; i++) {
    //     plaatsPersoon(oPageData.data[i], i);
    // }

    for (var i = 0; i < oaData.length; i++) {
        plaatsPersoon(oaData[i], i)
    }
}

function plaatsPersoon(persoon, i) {
    verbergMsg()

    var placeId = document.getElementById("persoon");
    var eDiv = document.createElement('div');
    eDiv.setAttribute('class', 'card-zoek');
    eDiv.setAttribute('id', 'prof' + i);
    placeId.appendChild(eDiv);
    placeId = document.getElementById('prof' + i);
    eA = document.createElement('a');
    eA.setAttribute('href', 'profiel.html?gebruiker=' + persoon.id);
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
    eP.setAttribute('class', 'wordwrap')
    eP.innerHTML = persoon.nickname;
    placeId.appendChild(eP);
    // console.log(persoon.nickname + " is geplaatst");
}

function Paginator(items, page, per_page) {
    console.log(" pagina " + page + " aantal per pagina " + per_page)
    var page = page || 1,
        per_page = per_page || 12,
        offset = (page - 1) * per_page,

        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
    console.log(offset + " pagina " + page + " aantal per pagina " + per_page + paginatedItems)
    parseInt(page);

    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? parseInt(page) + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}

// https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
function pagination(c, m) {
    console.log("huidige " + c + " laatste " + m)
    var current = parseInt(c),
        last = parseInt(m),
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    console.log(range + rangeWithDots)

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return {
        rangeWithDots
    };
    // for (let i = 1, l = 123; i <= l; i++)
    // console.log(`Selected page ${i}:`, pagination(i, l));


}

function createPaginator(oBut, actPage) {
    console.log("createPaginator" + oBut)
    eDoel = document.getElementById("pagenavigation");
    while (eDoel.hasChildNodes()) {
        eDoel.removeChild(eDoel.lastChild);
    }
    var laatste = oBut.length - 1
    var eLi = document.createElement('li');
    eLi.setAttribute('class', 'page-item');
    // eLi.setAttribute('id', 'link0')
    // eLi.setAttribute('onclick', "naarPage(vorigePage)");
    // eLi.innerHTML = 'vorige';
    var eA = document.createElement('a');
    eA.setAttribute('class', 'page-link')
    eA.setAttribute('onclick', "naarPage(vorigePage)");
    eA.innerHTML = 'vorige';
    eLi.appendChild(eA);
    eDoel.appendChild(eLi);
    for (i = 0; i < oBut.length; i++) {
        eLi = document.createElement('li');
        if (oBut[i] === parseInt(actPage)) {
            eLi.setAttribute('class', 'page-item active');
        } else {
            eLi.setAttribute('class', 'page-item');
        }
        eA = document.createElement('a');
        eA.setAttribute('class', 'page-link active');
        // eLi.setAttribute('id', 'link' + (i + 1));
        eA.innerHTML = oBut[i];
        if (oBut[i] != "...") {
            eA.setAttribute('onclick', "naarPage(this.innerHTML)");
        }
        eLi.appendChild(eA);
        eDoel.appendChild(eLi);
    }
    var eLi = document.createElement('li');
    console.log("laatste " + laatste + " - " + parseInt(oBut[parseInt(laatste)]));
    if (parseInt(oBut[parseInt(laatste)]) === parseInt(actPage)) {
        console.log("disabled");
        eLi.setAttribute('class', 'page-item disabled');
    } else {
        eLi.setAttribute('class', 'page-item');
    }
    eLi.setAttribute('class', 'page-item');
    eA = document.createElement('a');
    eA.setAttribute('class', 'page-link');
    // eLi.setAttribute('id', 'link10');
    eA.setAttribute('onclick', "naarPage(volgendePage)");
    eA.innerHTML = 'volgende';
    eLi.appendChild(eA);
    eDoel.appendChild(eLi);
}

function naarPage(iGaNaar) {
    console.log("ga naar " + iGaNaar);
    splitsData(zoekData, iGaNaar);
}