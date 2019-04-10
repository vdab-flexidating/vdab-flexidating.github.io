/* Global vars
 ****************/
var errorMsg = "";
var gebruikersId;
var gebruiker;
var sStorage;
var rooturl = "https://scrumserver.tenobe.org/scrum/api";

$(function () {

    if (sStorage == false) {
        console.log("Geen cookies of localStorage");
    }

    gebruiker = haalUitStorage("gebruiker");

    /* DEBUG 
     ***********************/
    // plaatsInStorage("iLike", "trains");
    // let ikHouVan = haalUitStorage("iLike"); //zowel strings als 
    // console.log("i like " + ikHouVan);
    /* END DEBUG */

    isIngelogd();


    document.getElementById('login').addEventListener('click', function (e) {
        gebruikersId = login();
        // Number.isInteger(data.id) && !oGebruiker ? haalGebruikersInfoOp(gebruikersId) : false;
    });

    document.getElementById('logout').addEventListener('click', function (e) {
        logout();
    });


});

function getRootUrl() {
    return rooturl;
}

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

/****** 
 * Alles over inloggen 
 ****/
/****
 * @returns:
 * - object van ingelogde gebruiker
 * - of false
 *****/
function isIngelogd() {
    // Toon juiste menu
    let eUitgelogd = document.querySelectorAll(".niet-ingelogd");
    let eIngelogd = document.querySelectorAll(".ingelogd");

    if (!gebruiker) {
        // Indien geen gebruiker 
        console.log("Niet ingelogd");
        toonerrorMsg("Niet ingelogd.<br>");

        for (const element of eUitgelogd) {
            element.classList.remove("d-none");
        }
        for (const element of eIngelogd) {
            element.classList.add("d-none");
        }
        return false;
    } else {
        // Ingelogd
        // plaats nickname
        let eNickname = document.querySelector(".loginNickname");
        eNickname.innerHTML = gebruiker.nickname;

        // toon menu
        for (const element of eUitgelogd) {
            element.classList.add("d-none");
        }
        for (const element of eIngelogd) {
            element.classList.remove("d-none");
        }
        return gebruiker;
    }
}

/*****
 * @TODO nickname controle niet hoofdlettergevoelig maken
 */
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

                    Number.isInteger(gebruikersId) && !gebruiker ? haalGebruikersInfoOp(gebruikersId, true) : false;
                    plaatsInStorage("gebruiker", gebruiker);

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

/**
 * Logout dient op volgende momenten aagesproken te worden:
 * - delete (evenals : verwijderVanStorage("alles"); )
 * - logout button
 */
function logout() {
    // haal alles uit storage
    verwijderVanStorage("gebruiker");

    // remove gebruikersinfo
    gebruiker = "";

    // controleer status
    isIngelogd();
}

/**
 * Haalt alle info op van een id
 * @param {*} profielId haalt alle info op dmv id
 * @param {*} inStoragePlaatsen indien true plaatst dit de de response in storage
 */
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
                gebruiker = data;
            }
            isIngelogd();

            // Verwelkom gebruiker:
            toonsuccesMsg("Dag " + gebruiker.nickname + ", je bent succesvol ingelogd. :) ");

        })
        .catch(function (error) {
            console.log(error);
        });

    return data;

}


/*********************** 
 * Alles over storage
 ***********************/
/*** 
 * @key is waar naar gezocht wordt, 
 * @returnt value of een error
 * @returnt false indien key niet aanwezig in storage
 ***/
function haalUitStorage(key) {

    // var sStorage = cookieOfLokaal();

    if (localStorage[key] || (sStorage == "sCookie" && getCookie(key))) {
        // ingelogd
        if (sStorage == "sCookie") {
            return getCookie(key);
        } else {
            return JSON.parse(localStorage[key]);
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

function plaatsInStorage(key, data) {
    // var sStorage = cookieOfLokaal();
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

/**
 * @keys zijn alle keys welke je wilt verwijderen
 * @keys = "alles" gaat alles uit de storage
 */
function verwijderVanStorage(...keys) {
    if (keys != "alles") {
        // verwijderd elke key
        if (sStorage == "sCookie") {
            keys.forEach(element => {
                clearCookie(element);
            });
        } else if (sStorage == "sLocal") {
            keys.forEach(element => {
                localStorage.removeItem(element);
            });

        } else {
            console.log("Er is geen storage");
        }
    } else {
        // Verwijderd alle storage
        if (sStorage == "sCookie") {
            window.postMessage({
                type: "CLEAR_COOKIES_EXTENSION_API"
            }, "*");
        } else if (sStorage == "sLocal") {
            localStorage.clear();
        }
    }
}

/**
 * Controleerd of er met localStorage moet gewerkt worden of met cookies
 **/
function cookieOfLokaal() {
    if (localStorage) {
        sStorage = "sLocal";
    } else if (navigator.cookieEnabled) {
        sStorage = "sCookie";
        console.log('cookies OK');
    } else {
        return false;
    }
}

/*
 * Plaatst indien nodig het cookie bestand
 */
(function () {
    if (cookieOfLokaal() != 'sLocal') {
        var ref = window.document.getElementsByTagName('script')[0];
        var script = window.document.createElement('script');
        script.src = 'assets/nuttig_lib.js';
        ref.parentNode.insertBefore(script, ref);
        console.log("Cookiefile geladen");
    }
})();

/************************* 
 * Alles over alerts
 ************************/
function verbergMsg() {
    // verberg en verwijder inhoud
    let eError = document.getElementById("errorMsg");
    if (eError) {
        eError.classList.add("d-none");
        eError = "";
    }

    let eSucces = document.getElementById("succesMsg");
    if (eSucces) {
        eSucces.classList.add("d-none");
        eSucces.innerHTML = "";
    }
}

function toonerrorMsg(msg) {
    verbergMsg();
    let eError = document.getElementById("errorMsg");
    eError.classList.remove("d-none");
    eError.innerHTML = msg;
}

function toonsuccesMsg(msg) {
    verbergMsg();
    let eSucces = document.getElementById("succesMsg");
    eSucces.classList.remove("d-none");
    eSucces.innerHTML = msg;
}


function getSterrenbeeld(geboortedatum) {
    /* return sterrenbeeld op basis van geboortedatum */
    let sterrenbeelden = ["Steenbok", "Waterman", "Vissen", "Ram", "Stier", "Tweelingen", "Kreeft", "Leeuw", "Maagd", "Weegschaal", "Schorpioen", "Boogschutter"]
    let maand = geboortedatum.split('-')[1];
    let dag = geboortedatum.split('-')[2];

    if ((maand == 1 && dag <= 20) || (maand == 12 && dag >= 23)) {
        return sterrenbeelden[0];
    } else if ((maand == 1 && dag >= 21) || (maand == 2 && dag <= 18)) {
        return sterrenbeelden[1];
    } else if ((maand == 2 && dag >= 19) || (maand == 3 && dag <= 20)) {
        return sterrenbeelden[2];
    } else if ((maand == 3 && dag >= 21) || (maand == 4 && dag <= 20)) {
        return sterrenbeelden[3];
    } else if ((maand == 4 && dag >= 21) || (maand == 5 && dag <= 21)) {
        return sterrenbeelden[4];
    } else if ((maand == 5 && dag >= 22) || (maand == 6 && dag <= 21)) {
        return sterrenbeelden[5];
    } else if ((maand == 6 && dag >= 22) || (maand == 7 && dag <= 23)) {
        return sterrenbeelden[6];
    } else if ((maand == 7 && dag >= 24) || (maand == 8 && dag <= 23)) {
        return sterrenbeelden[7];
    } else if ((maand == 8 && dag >= 24) || (maand == 9 && dag <= 23)) {
        return sterrenbeelden[8];
    } else if ((maand == 9 && dag >= 24) || (maand == 10 && dag <= 23)) {
        return sterrenbeelden[9];
    } else if ((maand == 10 && dag >= 24) || (maand == 11 && dag <= 22)) {
        return sterrenbeelden[10];
    } else if ((maand == 11 && dag >= 23) || (maand == 12 && dag <= 21)) {
        return sterrenbeelden[11];
    }
}