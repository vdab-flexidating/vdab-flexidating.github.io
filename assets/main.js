/* Global vars
 ****************/
var rooturl = "https://scrumserver.tenobe.org/scrum/api";
var errorMsg = "";
var gebruikersId;
var gebruiker;
var sStorage;
//favoriet 
var favorietenVanId;
var vraagFavorietOp;
var likeIemand;
var verwijderFavoriet;



$(function () {

    if (sStorage == false) {
        console.log("Geen cookies of localStorage");
    }

    gebruiker = haalUitStorage("gebruiker");

    /* DEBUG 
     ***********************/
    // Storage
    // plaatsInStorage("iLike", "trains");
    // let ikHouVan = haalUitStorage("iLike"); //zowel strings als 
    // console.log("i like " + ikHouVan);
    // Favorieten 
    // haalFavorietenOp(gebruiker.id, "mijnFavorieten");
    // likeIemand(gebruiker.id, 65);
    // likeIemand(gebruiker.id, 20);
    // haalFavorietenOp(5, "FavorietenVanId5");
    // vraagFavorietOp(10, "FavorietId");
    // verwijderEenFavoriet(65);
    // Lovecoins
    // pasLovecoinsAan(50, '=');
    // pasLovecoinsAan(50, '+');
    // pasLovecoinsAan(300, '-');

    /* END DEBUG */

    isIngelogd();

    // TODO
    haalFavorietenOp(gebruiker.id, "mijnFavorieten");


    document.getElementById('login').addEventListener('click', function (e) {
        gebruikersId = login();
        haalFavorietenOp(data.id, "mijnFavorieten");
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
        //toonerrorMsg("Niet ingelogd.<br>");

        for (const element of eUitgelogd) {
            element.classList.remove("d-none");
        }
        for (const element of eIngelogd) {
            element.classList.add("d-none");
        }

        // haal de favorieten op bij het inloggen
        haalFavorietenOp(gebruiker.id, "mijnFavorieten");

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

                    haalFavorietenOp(data.id, "mijnFavorieten");

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

/*******
 * Alles over favoriet
 */

/**
 * 
 * @param {*} profielId het id van wie je de favorieten wilt
 * @param {*} storageKey plaats een key als je het in storage wilt
 */
function haalFavorietenOp(profielId, storageKey) {
    let url = rooturl + '/favoriet/read.php?profielId=' + profielId;

    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            favorietenVanId = data;

            if (typeof storageKey == "string") {
                // TODO: bij logout moet dit weg
                plaatsInStorage(storageKey, data);
                console.log("Geplaats in storage met key: " + storageKey + " value: " + favorietenVanId);
            } else {
                console.log("var favorietenVanId : " + favorietenVanId);
            }
            console.log(data);
            console.log("----");
        })
        .catch(function (error) {
            console.log(error);
        });
}

function vraagFavorietOp(favoerietId, storageKey) {

    let url = rooturl + '/favoriet/read_one.php?id=' + favoerietId;

    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            favorietenVanId = data;

            if (typeof storageKey == "string") {
                // TODO: bij logout moet dit weg
                plaatsInStorage(storageKey, data);
                console.log("De favorieten van " + favoerietId + " zijn: " + favorietenVanId + " en zitten als  " + storageKey + " in storage");

            } else {
                console.log("De favorieten van : " + favoerietId + " zijn:  " + favorietenVanId);
            }
            console.log(data);
            console.log("----");
        })
        .catch(function (error) {
            console.log(error);
        });
}

function likeIemand(mijnId, anderId, storageKey) {

    let url = rooturl + '/favoriet/like.php';

    let data = {
        mijnId: mijnId,
        anderId: anderId
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
            likeIemand = data;

            if (typeof storageKey == "string") {
                // TODO: bij logout moet dit weg
                if (data.id) {
                    plaatsInStorage(storageKey, data);
                }

                console.log(data.message);
                if (data.id) {
                    console.log("id " + mijnId + " likte: " + likeIemand.id + " en zit als " + storageKey + " in storage");
                }
            } else {
                console.log(data.message);
                if (data.id) {
                    console.log("id " + mijnId + " likte: " + likeIemand.id);
                }
            }
            console.log(data);
            console.log("----");
        })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * Plaats een bericht als favoriet
 * @param {*} berichtId met betrekking tot bericht als favoriet bestempelen
 */
function verwijderEenFavoriet(berichtId) {
    let id = berichtId;

    let url = rooturl + '/favoriet/delete.php';

    let data = {
        id: id
    }

    var request = new Request(url, {
        method: 'DELETE',
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
            verwijderFavoriet = data;
            console.log(data.message);
            console.log("Van id: " + berichtId);
            console.log("----");
        })
        .catch(function (error) {
            console.log(error);
        });
}


/**
 * 
 * Over Lovecoins
 */

function controleerLovecoins(aantalLovecoins) {
    if (!Number.isNaN(aantalLovecoins)) {
        return true;
    } else {
        // toon fout
        return false;
    }
}

/**
 * 
 * @param {*} aantalLovecoins de lovecoins welke je wilt aanpassen
 * @param {*} bewerking te gebruiken - + = (als string)
 * @param {*} transfer boolean Wil je een bevestiging (return value) krijgen? Ook nodig voor transfer
 */
function pasLovecoinsAan(aantalLovecoins, bewerking, transfer) {
    let valid = controleerLovecoins(aantalLovecoins);

    if (valid) {
        if (bewerking == "=") {
            // zet nieuw aantal lovecoins    
            zetLovecoins(aantalLovecoins);
        } else {
            // haal lovecoins op 
            let huidigAantalLovecoins = parseInt(gebruiker.lovecoins);

            // +
            if (bewerking == "+") {
                nieuwAantalLovecoins = huidigAantalLovecoins + aantalLovecoins;
                zetLovecoins(nieuwAantalLovecoins);

            } else if (bewerking == "-") {
                nieuwAantalLovecoins = huidigAantalLovecoins - aantalLovecoins;
                if (nieuwAantalLovecoins >= 0) {
                    zetLovecoins(nieuwAantalLovecoins);

                    // we gaan er hier van uit dat er geen fouten meer mogelijk zijn
                    // en starten reeds met de transfer
                    if (transfer) {
                        return true;
                    }
                } else {
                    // Onder 0 
                    errorMsg += "Je hebt te weinig lovecoins om deze actie uit te voeren.<br>";
                    errorMsg += "Meer bepaald hebt u " + -nieuwAantalLovecoins + " lovecoins te weinig.";
                    toonerrorMsg(errorMsg);
                    if (transfer) {
                        return false
                    }
                }

            } else {
                // Deze bewering is nog niet ondersteund
                toonerrorMsg("Deze bewerking is nog niet ondersteund.")
            }

        }
    }
}

/**
 * 
 * @param {*} nieuwAantalLovecoins zet de lovecoins naar dit bedrag
 */
function zetLovecoins(nieuwAantalLovecoins) {
    let ontvanger = gebruiker.id

    let url = rooturl + '/profiel/read_one.php?id=' + ontvanger;

    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let urlUpdate = rooturl + '/profiel/update.php';

            data['familienaam'] = data.familienaam;
            data['voornaam'] = data.voornaam;
            data['geboortedatum'] = data.geboortedatum;
            data['email'] = data.email;
            data['nickname'] = data.nickname;
            data['foto'] = data.foto;
            data['beroep'] = data.beroep;
            data['sexe'] = data.sexe;
            data['haarkleur'] = data.haarkleur;
            data['oogkleur'] = data.oogkleur;
            data['grootte'] = data.grootte;
            data['gewicht'] = data.gewicht;
            data['wachtwoord'] = data.wachtwoord;
            data['lovecoins'] = nieuwAantalLovecoins.toString();

            console.log(JSON.stringify(data));

            let copyVanGebruiker = data;

            var request = new Request(urlUpdate, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });

            fetch(request)
                .then(function (resp) {
                    return resp.json();
                    console.log(resp)
                })
                .then(function (data) {
                    console.log(data);
                    // pas gebruiker aan in localStorage
                    plaatsInStorage("gebruiker", copyVanGebruiker);

                    // en in var
                    gebruiker = copyVanGebruiker;
                    return true;
                })
                .catch(function (error) {
                    console.log(error);
                });

        })
        .catch(function (error) {
            console.log(error);
        });


    // Toon de error
    if (errorMsg != "") {
        toonerrorMsg(errorMsg);
    }

}

/**
 * Verplaats lovecoins van de ene persoon aan de andere persoon
 * @param {*} mijnId het id van de verzender
 * @param {*} ontvangerId het id van de ontvanger
 * @param {*} aantalLovecoins hoeveel je wilt versturen
 * @param {*} bewering de actie die je probeerd
 */
function transferLovecoins(mijnId, ontvangerId, aantalLovecoins, bewering) {
    // controleer of de verzender genoeg lovecoins heeft voor de actie
    let valid = pasLovecoinsAan(20, "-", true);

    if (valid) {
        // verzenden van lovecoins mag
        // TODO: tranfer naar ontvanger
    }
}


/***
 * Alles over sterrenbeelden
 */
/***
 *  @param {*} geboortedatum haal sterrenbeeld op op basis van geboortedatum
 */
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