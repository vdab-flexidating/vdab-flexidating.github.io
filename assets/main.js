var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

/* Global vars
 ****************/
var errorMsg = "";

var gebruikersId;
var gebruiker;
var sStorage;



window.onload = function () {

    if (cookieOfLokaal() == false) {
        console.log("Geen cookies of localStorage");
    }

    // sGebruiker = haalUitStorage("gebruiker");
    // oGebruiker = JSON.parse(sGebruiker); // Voor objecten 

    /* DEBUG 
     ***********************/
    plaatsInStorage("iLike", "trains");
    let ikHouVan = haalUitStorage("iLike");
    console.log("i like " + ikHouVan);
    /* END DEBUG */

    isIngelogd();


    document.getElementById('login').addEventListener('click', function (e) {
        gebruikersId = login();
        // Number.isInteger(data.id) && !oGebruiker ? haalGebruikersInfoOp(gebruikersId) : false;
    });


}

function isIngelogd() {
    if (!gebruiker) {
        // Indien geen gebruiker 
        console.log("Niet ingelogd");
        toonerrorMsg("Niet ingelogd.<br>");
    } else {
        // Ingelogd

    }

}

function plaatsInStorage(key, data) {
    var sStorage = cookieOfLokaal();
    if (sStorage == "sCookie") {
        var nAantalDagen = 100;
        setCookie(key, JSON.stringify(data), nAantalDagen);
        console.log("toegevoegd als cookie " + data);
    } else if (sStorage == "sLocal") {
        localStorage.setItem(key, JSON.stringify(data));
        console.log("toegevoegd als localStorage " + data);
    }
    // De method go() neemt een integer als argument en laat ons toe een aantal pagina's backward of forward te gaan in de lijst.  
    // Bij 0 update de huidige pagina
    // window.history.go(0);
}

function login() {

    let nickname = document.getElementById('loginNickname').value;
    let wachtwoord = document.getElementById('LoginWachtwoord').value;

    url = rooturl + '/profiel/authenticate.php';
    //let url = 'http://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php"'

    let data = {
        nickname: nickname,
        wachtwoord: wachtwoord
    }

    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);

            if (data.message) {
                if (data.id) {
                    gebruikersId = parseInt(data.id);
                    console.log("Gebruiker met id " + data.id + " heeft zich ingelogd.")
                    plaatsInStorage("gebruikerId", data.id);

                    Number.isInteger(gebruikersId) && !gebruiker ? gebruiker = haalGebruikersInfoOp(gebruikersId, true) : false;

                    plaatsInStorage("gebruiker", gebruiker);
                    isIngelogd();

                    // return gebruikersId;

                } else if (data.message == "Unauthorized") {
                    toonerrorMsg("Verkeerde logingegevens");
                } else {
                    toonerrorMsg(data.message);
                }
            } else {
                toonerrorMsg("Er kwam een onbekende fout voor.");
            }

        })
        .catch(function (error) {
            console.log(error);
        });


}



function haalGebruikersInfoOp(profielId, inStoragePlaatsen) {

    let url = rooturl + '/profiel/read_one.php?id=' + profielId;

    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            if (inStoragePlaatsen) {
                plaatsInStorage("gebruiker", data);
            }
            return data;
        })
        .catch(function (error) {
            console.log(error);
        });

    return data;

}

/*** 
 * @key is waar naar gezocht wordt, 
 * @return value of een error
 * @return false indien @key niet aanwezig in storage
 ***/
function haalUitStorage(key) {

    var sStorage = cookieOfLokaal();

    if (localStorage[key] || (sStorage == "sCookie" && getCookie(key))) {
        // ingelogd
        if (sStorage == "sCookie") {
            return getCookie(key);
        } else {
            return localStorage[key];
        }
    } else if (sStorage) {
        console.log(sStorage + " is de gekozen storage.");
        console.log("Maar er zit niets in.");
        return false;
    } else {
        errorMsg += "Er konden geen cookies of localStorage gebruikt worden. ";
        errorMsg += "Activeer cookies - of gebruik een moderne browser - om een rekening aan te kunnen maken.";
        return toonerrorMsg(errorMsg);
    }

}

function toonerrorMsg(msg) {
    let eError = document.getElementById("errorMsg");
    eError.classList.remove("d-none");
    eError.innerHTML = msg;
}

function toonsuccesMsg(msg) {
    let eSucces = document.getElementById("succesMsg");
    eSucces.classList.remove("d-none");
    eSucces.innerHTML = msg;
}

function cookieOfLokaal() {
    if (localStorage) {
        return "sLocal"
    } else if (navigator.cookieEnabled) {
        return "sCookie";
        console.log('cookies OK');
    } else {
        return false;
    }
}

(function () {
    if (cookieOfLokaal() != 'sLocal') {
        var ref = window.document.getElementsByTagName('script')[0];
        var script = window.document.createElement('script');
        script.src = 'assets/nuttig_lib.js';
        ref.parentNode.insertBefore(script, ref);
        console.log("Cookiefile geladen");
    }
})();