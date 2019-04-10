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

    gebruiker = haalUitStorage("gebruiker");

    document.getElementById('login').addEventListener('click', function (e) {
        let profielId = document.getElementById('persoonId').value;

        let url = rooturl + '/profiel/read_one.php?id=' + profielId;

        fetch(url)
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                console.log(data);
                gebruiker = data;
                gebruikersId = gebruiker.id;
                plaatsInStorage("gebruiker", gebruiker);

            })
            .catch(function (error) {
                console.log(error);
            });
    });
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
    window.history.go(0);
}

function haalUitStorage(key) {


    var sStorage = cookieOfLokaal();

    if (localStorage.gebruiker || (sStorage == "sCookie" && getCookie(key))) {
        // ingelogd
        if (sStorage == "sCookie") {
            return getCookie(key);
        } else {
            return localStorage.key;
        }
    } else if (sStorage) {
        console.log(sStorage + " is de gekozen storage.");
    } else {
        errorMsg += "Er konden geen cookies of localStorage gebruikt worden. ";
        errorMsg += "Activeer cookies - of gebruik een moderne browser - om een rekening aan te kunnen maken.";

        return toonerrorMsg(errorMsg);
    }

}

function toonerrorMsg(errorMsg) {
    let eError = document.getElementById("errorMsg");
    eError.classList.remove("d-none");
    eError.innerHTML = errorMsg;
}

function verbergErrorMsg() {
    let eError = document.getElementById("errorMsg");
    eError.classList.add("d-none");
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


function getSterrenbeeld(geboortedatum) {
    /* return sterrenbeeld op basis van geboortedatum */
    let sterrenbeelden = ["Steenbok", "Waterman", "Vissen", "Ram", "Stier", "Tweelingen", "Kreeft", "Leeuw", "Maagd", "Weegschaal", "Schorpioen", "Boogschutter"]
    let maand = geboortedatum.split('-')[1];
    let dag = geboortedatum.split('-')[2];

    if((maand == 1 && dag <= 20) || (maand == 12 && dag >=23)) {
        return sterrenbeelden[0];
    } else if ((maand == 1 && dag >= 21) || (maand == 2 && dag <= 18)) {
        return sterrenbeelden[1];
    } else if((maand == 2 && dag >= 19) || (maand == 3 && dag <= 20)) {
        return sterrenbeelden[2];
    } else if((maand == 3 && dag >= 21) || (maand == 4 && dag <= 20)) {
        return sterrenbeelden[3];
    } else if((maand == 4 && dag >= 21) || (maand == 5 && dag <= 21)) {
        return sterrenbeelden[4];
    } else if((maand == 5 && dag >= 22) || (maand == 6 && dag <= 21)) {
        return sterrenbeelden[5];
    } else if((maand == 6 && dag >= 22) || (maand == 7 && dag <= 23)) {
        return sterrenbeelden[6];
    } else if((maand == 7 && dag >= 24) || (maand == 8 && dag <= 23)) {
        return sterrenbeelden[7];
    } else if((maand == 8 && dag >= 24) || (maand == 9 && dag <= 23)) {
        return sterrenbeelden[8];
    } else if((maand == 9 && dag >= 24) || (maand == 10 && dag <= 23)) {
        return sterrenbeelden[9];
    } else if((maand == 10 && dag >= 24) || (maand == 11 && dag <= 22)) {
        return sterrenbeelden[10];
    } else if((maand == 11 && dag >= 23) || (maand == 12 && dag <= 21)) {
        return sterrenbeelden[11];
    }
}
