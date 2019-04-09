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


    // alert("hello");

    /*
    --------------------------------------
    -- knoppen voor profielen
    --------------------------------------
    */

    //  random 10 profielen op te halen


    // var oaProf10 = []
    for (var i = 0; i < 5; i++) {
        var profielId = Math.floor(Math.random() * 5000)
        let url = rooturl + '/profiel/read_one.php?id=' + profielId;

        fetch(url)
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                oaProf10.push(data);
                console.log(oaProf10.length);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    console.log(oaProf10);
    set10prof(oaProf10);
    console.log("na functie");
    // }




    function toonerrorMsg(errorMsg) {
        let eError = document.getElementById("errorMsg");
        eError.classList.remove("d-none");
        eError.innerHTML = errorMsg;
    }

    // document.getElementById('knop12').addEventListener('click', function (e) {
    //     let page = document.getElementById('input12_1').value;
    //     let pageSize = document.getElementById('input12_2').value;

    //     let url = rooturl + '/profiel/read.php?page=' + page + '&pageSize=' + pageSize;;

    //     fetch(url)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop2').addEventListener('click', function (e) {
    //     let profielId = document.getElementById('input2_1').value;


    //     let url = rooturl + '/profiel/read_one.php?id=' + profielId;

    //     fetch(url)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });


    // });

    // document.getElementById('knop3').addEventListener('click', function (e) {
    //     let grootte = document.getElementById('input3_1').value;
    //     let grootteOperator = document.getElementById('input3_2').value;
    //     let orderby = document.getElementById('input3_3').value;

    //     let url = rooturl + '/profiel/search.php?grootte=' + grootte + '&grootteOperator=' + grootteOperator + '&orderBy=' + orderby;

    //     fetch(url)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop4').addEventListener('click', function (e) {
    //     let voornaam = document.getElementById('input4_1').value;

    //     let url = rooturl + '/profiel/search.php?voornaam=' + voornaam;

    //     fetch(url)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop13').addEventListener('click', function (e) {
    //     let nickname = document.getElementById('input13_1').value;
    //     let fuzzy = document.getElementById('input13_2').checked;

    //     let url = rooturl + '/profiel/search.php?voornaam=' + nickname;

    //     if (fuzzy) {
    //         url += '&voornaamFuzzy=1';
    //     }

    //     fetch(url)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop5').addEventListener('click', function (e) {
    //     let geslacht = document.getElementById('input5_1').value;

    //     let url = rooturl + '/profiel/search.php?sexe=' + geslacht;

    //     fetch(url)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop11').addEventListener('click', function (e) {
    //     let rangeMinGeboortedatum = document.getElementById('input11_1').value;
    //     let rangeMaxGeboortedatum = document.getElementById('input11_2').value;

    //     let rangeMinGrootte = document.getElementById('input11_3').value;
    //     let rangeMaxGrootte = document.getElementById('input11_4').value;

    //     let url = rooturl + '/profiel/search.php'
    //     url += '?geboortedatumOperator=range&rangeMinGeboortedatum=' + rangeMinGeboortedatum + '&rangeMaxGeboortedatum=' + rangeMaxGeboortedatum;
    //     url += '&grootteOperator=range&rangeMinGrootte=' + rangeMinGrootte + '&rangeMaxGrootte=' + rangeMaxGrootte;

    //     fetch(url)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop6').addEventListener('click', function (e) {
    //     let geboortedatum = document.getElementById('input6_1').value;
    //     let geboortedatumOperator = document.getElementById('input6_2').value;

    //     let url = rooturl + '/profiel/search.php?geboortedatum=' + geboortedatum + '&geboortedatumOperator=' + geboortedatumOperator;

    //     fetch(url)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop7').addEventListener('click', function (e) {
    //     let profielId = document.getElementById('input7_1').value;
    //     let nieuweVoornaam = document.getElementById('input7_2').value;

    //     let url = rooturl + '/profiel/read_one.php?id=' + profielId;

    //     fetch(url)
    //         .then(function (resp) {
    //             return resp.json();
    //         }) //haal de JSON op en stuur die als resultaat van je promise                         
    //         .then(function (data) {
    //             //nadat de vorige promise opgelost werd kwamen we in deze procedure tercht
    //             //hier kunnen we nu , met het resultat (data) van de vorige promise, aan de slag
    //             //we passen de voornaam aan en sturen ook dit terug zodat deze promise afgesloten kan worden                        
    //             let urlUpdate = rooturl + '/profiel/update.php';

    //             data['voornaam'] = nieuweVoornaam;

    //             var request = new Request(urlUpdate, {
    //                 method: 'PUT',
    //                 body: JSON.stringify(data),
    //                 headers: new Headers({
    //                     'Content-Type': 'application/json'
    //                 })
    //             });
    //             fetch(request)
    //                 .then(function (resp) {
    //                     return resp.json();
    //                 })
    //                 .then(function (data) {
    //                     console.log(data);
    //                 })
    //                 .catch(function (error) {
    //                     console.log(error);
    //                 });



    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    document.getElementById('knop8').addEventListener('click', function (e) {
        e.preventDefault();
        let url = rooturl + '/profiel/create.php';

        // Data ophalen uit id
        let familienaam = document.getElementById('familienaam').value;
        let voornaam = document.getElementById('voornaam').value;
        let geboortedatum = document.getElementById('geboortedatum').value;
        let email = document.getElementById('email').value;
        let nickname = document.getElementById('nickname').value;
        let foto = document.getElementById('foto').value;
        let beroep = document.getElementById('beroep').value;

        let sexe = document.getElementsByName('sexe');
        for (let i = 0; i < sexe.length; i++) {
            if (sexe[i].checked) {
                sexe = sexe[i].value;
            }
        }

        let haarkleur = document.getElementById('haarkleur').value;
        let oogkleur = document.getElementById('oogkleur').value;
        let grootte = document.getElementById('grootte').value;
        let gewicht = document.getElementById('gewicht').value;
        let wachtwoord = document.getElementById('wachtwoord').value;
        let wachtwoord2 = document.getElementById('wachtwoord2').value;
        let lovecoins = document.getElementById('lovecoins').value;

        /* Validatie
         *********************/
        var valid = true;
        // Geboortejaar
        let oGeboortedatum = new Date(geboortedatum);
        let vandaag = new Date();
        // Ouder dan 18
        let verschil = vandaag.getTime() - oGeboortedatum.getTime();
        let verschilInJaar = Math.ceil(verschil / (1000 * 60 * 60 * 24 * 365.25));
        if (verschilInJaar < minLeeftijd) {
            valid = false;
            errorMsg += "je bent nog te jong<br>";
            document.getElementById('geboortedatum').
            classList.add("is-invalid");
        }
        // Nickname is uniek
        console.log(oData);
        for (let i = 0; i < oData.length; i++) {
            if (nickname == oData[i].nickname) {
                valid = false;
                errorMsg += "Nickname reeds in gebruik, kies een andere nickname.<br>";
                document.getElementById('nickname').
                classList.add("is-invalid");
            }
        }

        // Lengte groter dan nul
        if (grootte <= 0) {
            valid = false;
            errorMsg += "Lengte moet groter zijn dan nul.<br>";
            document.getElementById('grootte').
            classList.add("is-invalid");
        }

        // Gewicht groter dan nul
        if (gewicht <= 0) {
            valid = false;
            errorMsg += "Gewicht moet groter zijn dan nul.<br>";
            document.getElementById('gewicht').
            classList.add("is-invalid");
        }

        // Wachtwoorden komen overeen en > 6
        if (wachtwoord.length >= minLengtePass) {
            if (wachtwoord != wachtwoord2) {
                valid = false;
                errorMsg += "Wachtwoorden komen niet overeen<br>";

                document.getElementById('wachtwoord').
                classList.add("is-invalid");
                document.getElementById('wachtwoord2').
                classList.add("is-invalid");
            }
        } else {
            valid = false;
            errorMsg += "Je wachtwoord is te klein, minimum " + minLengtePass + " karakters<br>";

            document.getElementById('wachtwoord').
            classList.add("is-invalid");
        }

        let allesIngevuld = true;
        let alleWaarden = document.querySelectorAll('#registratie input:not([type="radio"])');
        for (let i = 0; i < alleWaarden.length; i++) {
            if (!alleWaarden[i].value.length && allesIngevuld) {
                valid = false;
                allesIngevuld = false;
                errorMsg += "Niet alle velden werden ingevuld.<br>";
                console.log("Niet alle waarden werden ingevuld");
            }

        }

        if (valid) {
            let data = {
                familienaam: familienaam,
                voornaam: voornaam,
                geboortedatum: geboortedatum,
                email: email,
                nickname: nickname,
                foto: foto,
                beroep: beroep,
                sexe: sexe,
                haarkleur: haarkleur,
                oogkleur: oogkleur,
                grootte: grootte,
                gewicht: gewicht,
                wachtwoord: wachtwoord,
                lovecoins: lovecoins
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
                    gebruikersId = parseInt(data.id);

                })
                .catch(function (error) {
                    console.log(error);
                    // 400 of 503 error tonen
                    let konNietAanmaken = "Kon profiel niet aanmaken.";
                    let dataOnvolledig = "Kon profiel niet aanmaken. Data is onvolledig.";

                    if (dataOnvolledig == error) {
                        errorMsg += "Niet alle velden werden ingevuld.<br>";
                    }
                    if (konNietAanmaken == error) {
                        // De enigste error die we niet opvangen is de controle op uniekheid nickname
                        errorMsg += "Nickname reeds in gebruik, kies een andere nickname.<br>";
                        document.getElementById('nickname').
                        classList.add("is-invalid");

                    }
                });


        }


        // Toon de error
        if (errorMsg != "") {
            toonerrorMsg(errorMsg);
        }

    });

    // document.getElementById('knop9').addEventListener('click', function (e) {
    //     let profielId = document.getElementById('input9_1').value;

    //     let url = rooturl + '/profiel/delete.php';

    //     let data = {
    //         id: profielId
    //     }

    //     var request = new Request(url, {
    //         method: 'DELETE',
    //         body: JSON.stringify(data),
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         })
    //     });

    //     fetch(request)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop10').addEventListener('click', function (e) {
    //     let nickname = document.getElementById('input10_1').value;
    //     let wachtwoord = document.getElementById('input10_2').value;

    //     let url = rooturl + '/profiel/authenticate.php';
    //     //let url = 'http://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php"'

    //     let data = {
    //         nickname: nickname,
    //         wachtwoord: wachtwoord
    //     }

    //     var request = new Request(url, {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         })
    //     });

    //     fetch(request)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // /*
    // --------------------------------------
    // -- knoppen voor berichten
    // --------------------------------------
    // */
    // document.getElementById('knop20').addEventListener('click', function (e) {
    //     let profielId = document.getElementById('input20_1').value;

    //     let url = rooturl + '/bericht/read.php?profielId=' + profielId;

    //     fetch(url)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop21').addEventListener('click', function (e) {
    //     let berichtId = document.getElementById('input21_1').value;

    //     let url = rooturl + '/bericht/read_one.php?berichtId=' + berichtId;

    //     fetch(url)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop22').addEventListener('click', function (e) {
    //     let vanId = document.getElementById('input22_1').value;
    //     let naarId = document.getElementById('input22_2').value;
    //     let bericht = document.getElementById('input22_3').value;

    //     let url = rooturl + '/bericht/post.php';

    //     let data = {
    //         vanId: vanId,
    //         naarId: naarId,
    //         bericht: bericht,
    //         status: "verzonden"
    //     }

    //     var request = new Request(url, {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         })
    //     });

    //     fetch(request)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop23').addEventListener('click', function (e) {
    //     let id = document.getElementById('input23_1').value;

    //     let url = rooturl + '/bericht/delete.php';

    //     let data = {
    //         id: id
    //     }

    //     var request = new Request(url, {
    //         method: 'DELETE',
    //         body: JSON.stringify(data),
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         })
    //     });

    //     fetch(request)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop24').addEventListener('click', function (e) {
    //     let id = document.getElementById('input24_1').value;
    //     let status = document.getElementById('input24_2').value;

    //     let url = rooturl + '/bericht/zet_status.php';

    //     let data = {
    //         id: id,
    //         status: status
    //     }

    //     var request = new Request(url, {
    //         method: 'PUT',
    //         body: JSON.stringify(data),
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         })
    //     });

    //     fetch(request)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // /*
    // --------------------------------------
    // -- knoppen voor favorieten
    // --------------------------------------
    // */
    // document.getElementById('knop30').addEventListener('click', function (e) {
    //     let profielId = document.getElementById('input30_1').value;

    //     let url = rooturl + '/favoriet/read.php?profielId=' + profielId;

    //     fetch(url)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop31').addEventListener('click', function (e) {
    //     let id = document.getElementById('input31_1').value;

    //     let url = rooturl + '/favoriet/read_one.php?id=' + id;

    //     fetch(url)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop32').addEventListener('click', function (e) {
    //     let mijnId = document.getElementById('input32_1').value;
    //     let anderId = document.getElementById('input32_2').value;

    //     let url = rooturl + '/favoriet/like.php';

    //     let data = {
    //         mijnId: mijnId,
    //         anderId: anderId
    //     }

    //     var request = new Request(url, {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         })
    //     });

    //     fetch(request)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });

    // });

    // document.getElementById('knop33').addEventListener('click', function (e) {
    //     let id = document.getElementById('input33_1').value;

    //     let url = rooturl + '/favoriet/delete.php';

    //     let data = {
    //         id: id
    //     }

    //     var request = new Request(url, {
    //         method: 'DELETE',
    //         body: JSON.stringify(data),
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         })
    //     });

    //     fetch(request)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });

    // document.getElementById('knop40').addEventListener('click', function (e) {
    //     let naam = document.getElementById('input40_1').value;
    //     let afbeelding = document.getElementById('input40_2').value;

    //     let url = rooturl + '/image/upload.php';

    //     let data = {
    //         naam: naam,
    //         afbeelding: afbeelding
    //     }

    //     var request = new Request(url, {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         })
    //     });

    //     fetch(request)
    //         .then(function (resp) {
    //             return resp.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });



}

function set10prof(oaProf10) 
{
    
    console.log("start functie");
    console.log(oaProf10.length);
    //console.log(oaProf10[0].id);
    for (i = 0; i < oaProf10.length; i++) {
        var placeId = document.getElementById("prof" + i);
        var eImg = document.createElement('img');
        eImg.setAttribute('src', 'https://scrumserver.tenobe.org/scrum/img/' + oaProf10[i].foto);
        placeId.appendChild(eImg);
    }

}