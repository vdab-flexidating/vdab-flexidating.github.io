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