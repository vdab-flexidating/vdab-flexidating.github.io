var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

/* Global vars
 ****************/
var minLeeftijd = 18;
var minLengtePass = 6;
var errorMsg = "";
var oData;
var oaProf10 = [];
// (function haalAlleDataOp() {
//     let url = rooturl + '/profiel/read.php';

//     fetch(url)
//         .then(function (resp) {
//             return resp.json();
//         })
//         .then(function (data) {
//             oData = data;
//             console.log(oData);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });

// })();
// })();

var gebruikersId;
var gebruiker;


// (function haalAlleDataOp() {
//     // TODO: plaats alle data een localStorage, en pas pas aan bij nieuwe id's 
//     let url = rooturl + '/profiel/read.php';

//     fetch(url)
//         .then(function (resp) {
//             return resp.json();
//         })
//         .then(function (data) {
//             oData = data;
//             console.log(oData);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });

// })();

window.onload = function () {

    if (cookieOfLokaal() == false) {
        console.log("Geen cookies of localStorage");
    }

    var sStorage = cookieOfLokaal();

    if (localStorage.id || (sStorage == "sCookie" && getCookie('klantnaam'))) {
        //gekende klant
        if (sStorage == "sCookie") {
            var sNaam = getCookie('klantnaam');
            var nSaldo = parseFloat(getCookie('saldo')).toFixed(2);
        } else {
            var sNaam = localStorage.klantnaam;
            var nSaldo = parseFloat(localStorage.saldo);
        }
        //bericht
        sMsg += "Welkom " + sNaam + ", ";
        sMsg += "uw saldo bedraagt " + nSaldo + " Euro";
        //knop
        var eKnop = maakKnop('Sluit rekening');
        eKnop.addEventListener('click', function () {
            rekeningSluiten()
        });
    } else if (sStorage) {
        //nieuwe klant, eerste bezoek
        sMsg += "Welkom beste bezoeker. ";
        sMsg += "Als u bij ons een nieuwe rekening opent, ontvangt u een startsaldo van 100 Euro!";
        //knop
        var eKnop = maakKnop('Open rekening');
        //eKnop.addEventListener('click', rekeningOpenen());
        eKnop.addEventListener('click', function () {
            rekeningOpenen()
        });
    } else {
        sMsg += "Er konden geen cookies of localStorage gebruikt worden. ";
        sMsg += "Activeer cookies - of gebruik een moderne browser - om een rekening aan te kunnen maken.";
        var eKnop = maakKnop('Cookies inschakelen')
        eKnop.addEventListener('click', function () {
            window.open("https://support.norton.com/sp/nl/nl/home/current/solutions/v57840314_NortonM_Retail_1_nl_nl", "_blank");

        })
    }

    function toonerrorMsg(errorMsg) {
        let eError = document.getElementById("errorMsg");
        eError.classList.remove("d-none");
        eError.innerHTML = errorMsg;
    }


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
                console.log(gebruiker);

            })
            .catch(function (error) {
                console.log(error);
            });


    });







}

function cookieOfLokaal() {
    if (localStorage) {
        //console.log('localStorage OK');
        return "sLocal"
    } else if (navigator.cookieEnabled) {
        console.log('cookies OK');
        //return "sCookie"
    } else {
        return false;
    }
}

(function () {
    if (cookieOfLokaal() == 'sCookie') {
        var ref = window.document.getElementsByTagName('script')[0];
        var script = window.document.createElement('script');
        script.src = 'nuttig_lib.js';
        ref.parentNode.insertBefore(script, ref);
    }
    console.log("Cookiefile geladen");
})();