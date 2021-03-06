$(function () {

    var minLeeftijd = 18;
    var minLengtePass = 6;

    gebruiker = haalUitStorage("gebruiker");
    gebruikersId = gebruiker.id;
    huidigeFoto = gebruiker.foto;

    /* DOM-elementen */
    let eFamilienaam = document.getElementById('familienaam');
    let eVoornaam = document.getElementById('voornaam');
    let eGeboortedatum = document.getElementById('geboortedatum');
    let eEmail = document.getElementById('maakEmail');
    let eNickname = document.getElementById('nickname');
    let eHuidigeFoto = document.getElementById('huidigeFoto')
    let eFoto = document.getElementById('foto');
    let eBeroep = document.getElementById('beroep');
    let eSexe = document.getElementsByName('sexe');
    let eHaarkleur = document.getElementById('haarkleur');
    let eOogkleur = document.getElementById('oogkleur');
    let eGrootte = document.getElementById('grootte');
    let eGewicht = document.getElementById('gewicht');
    let eWachtwoord1 = document.getElementById('wachtwoord1');
    let eWachtwoord2 = document.getElementById('wachtwoord2');
    let eLovecoins = document.getElementById('lovecoins');

    if (gebruiker) {
        getIngevuldProfiel(gebruiker);
    }
    else {        
        toonerrorMsg("Deze inhoud is enkel zichtbaar voor ingelogde gebruikers.");
    }

    function getIngevuldProfiel(profiel) {
        /* vult gegevens profiel aan op basis van een array */

        eFamilienaam.value = profiel.familienaam;
        eVoornaam.value = profiel.voornaam;
        eGeboortedatum.value = profiel.geboortedatum;
        eEmail.value = profiel.email;
        eNickname.value = profiel.nickname;
        eHuidigeFoto.src = "https://scrumserver.tenobe.org/scrum/img/" + huidigeFoto;
        eBeroep.value = profiel.beroep;

        //radiobuttons doorlopen
        for (let i = 0; i < eSexe.length; i++) {
            if (eSexe[i].value == profiel.sexe) {
                eSexe[i].checked = true;
            }
        }

        eHaarkleur.value = profiel.haarkleur;
        eOogkleur.value = profiel.oogkleur;
        eGrootte.value = profiel.grootte;
        eGewicht.value = profiel.gewicht;
        eWachtwoord1.value = profiel.wachtwoord;
        eWachtwoord2.value = profiel.wachtwoord;
        eLovecoins.value = profiel.lovecoins;
    }

    document.querySelector('button.update').addEventListener('click', function (e) {
        e.preventDefault();
        let profielId = gebruikersId;

        //reset error meldingen
        errorMsg = "";
        let registratieVelden = document.querySelectorAll('form#registratie input');
        registratieVelden.forEach(function (input) {
            input.addEventListener('focus', function () {
                input.classList.remove("is-invalid");
            })
        })

        // Data ophalen uit velden
        let familienaam = eFamilienaam.value;
        let voornaam = eVoornaam.value;
        let geboortedatum = eGeboortedatum.value;
        let email = eEmail.value;
        let nickname = eNickname.value;
        let beroep = eBeroep.value;
        let sexe;
        for (let i = 0; i < eSexe.length; i++) {
            if (eSexe[i].checked) {
                sexe = eSexe[i].value;
            }
        }
        let haarkleur = eHaarkleur.value;
        let oogkleur = eOogkleur.value;
        let grootte = eGrootte.value;
        let gewicht = eGewicht.value;
        let wachtwoord1 = eWachtwoord1.value;
        let wachtwoord2 = eWachtwoord2.value;
        let lovecoins = eLovecoins.value;

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
            errorMsg += "Gebruikers moeten ouder zijn dan 18.<br>";
            document.getElementById('geboortedatum').
            classList.add("is-invalid");
        }

        // Lengte > 0
        if (grootte <= 0) {
            valid = false;
            errorMsg += "Lengte moet groter zijn dan nul.<br>";
            document.getElementById('grootte').
            classList.add("is-invalid");
        }

        // Gewicht > 0
        if (gewicht <= 0) {
            valid = false;
            errorMsg += "Gewicht moet groter zijn dan nul.<br>";
            document.getElementById('gewicht').
            classList.add("is-invalid");
        }

        // Wachtwoorden komen overeen en > minLengtePass
        if (wachtwoord1.length >= minLengtePass) {
            if (wachtwoord1 != wachtwoord2) {
                valid = false;
                errorMsg += "Wachtwoorden komen niet overeen<br>";

                document.getElementById('wachtwoord1').
                classList.add("is-invalid");
                document.getElementById('wachtwoord2').
                classList.add("is-invalid");
            }
        } else {
            valid = false;
            errorMsg += "Je wachtwoord is te klein, minimum " + minLengtePass + " karakters<br>";

            document.getElementById('wachtwoord1').
            classList.add("is-invalid");
        }

        let allesIngevuld = true;
        let alleWaarden = document.querySelectorAll('#registratie input:not([type="radio"]):not([type="file"])');
        //console.log(alleWaarden)
        for (let i = 0; i < alleWaarden.length; i++) {
            if (!alleWaarden[i].value.length) {
                valid = false;
                alleWaarden[i].classList.add("is-invalid");
                if (allesIngevuld) {
                    allesIngevuld = false;
                    errorMsg += "Niet alle velden werden ingevuld.<br>";
                    console.log("Niet alle waarden werden ingevuld");
                }

            }
        }

        if (valid) {
            //foto uit form halen
            var fotoUpload = document.getElementById('foto')
            var foto;
            if ('files' in fotoUpload && fotoUpload.files.length > 0) {
                if ('name' in fotoUpload.files[0]) {
                    naamFoto = fotoUpload.files[0].name;
                    //foto encoden en uploaden
                    encodeImageFileAsURL(fotoUpload, naamFoto, profielId, familienaam, voornaam, geboortedatum, email, nickname, beroep, sexe, haarkleur, oogkleur, grootte, gewicht, wachtwoord1, lovecoins);
                }
            }
            else {
                foto = huidigeFoto;
                changeProfiel(profielId, familienaam, voornaam, geboortedatum, email, nickname, foto, beroep, sexe, haarkleur, oogkleur, grootte, gewicht, wachtwoord1, lovecoins);
            }            
        }

        // Toon de error
        if (errorMsg != "") {
            toonerrorMsg(errorMsg);
        }
    });
});

/***
 * Algemene functies over image uploader
 */
function encodeImageFileAsURL(element, naam, profielId, familienaam, voornaam, geboortedatum, email, nickname, beroep, sexe, haarkleur, oogkleur, grootte, gewicht, wachtwoord, lovecoins) {
    var file = element.files[0];
    var reader = new FileReader();
    var afbeelding;

    reader.readAsDataURL(file);
    reader.onloadend = function () {
        console.log('RESULT', reader.result);
        uploadFoto(naam, reader.result, profielId, familienaam, voornaam, geboortedatum, email, nickname, beroep, sexe, haarkleur, oogkleur, grootte, gewicht, wachtwoord, lovecoins)
    }
}

function uploadFoto(naam, afbeelding, profielId, familienaam, voornaam, geboortedatum, email, nickname, beroep, sexe, haarkleur, oogkleur, grootte, gewicht, wachtwoord, lovecoins) {
    let url = rooturl + '/image/upload.php';

    let data = {
        naam: naam,
        afbeelding: afbeelding
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
            let foto = data.fileName;
            changeProfiel(profielId, familienaam, voornaam, geboortedatum, email, nickname, foto, beroep, sexe, haarkleur, oogkleur, grootte, gewicht, wachtwoord, lovecoins);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function changeProfiel(profielId, familienaam, voornaam, geboortedatum, email, nickname, foto, beroep, sexe, haarkleur, oogkleur, grootte, gewicht, wachtwoord, lovecoins) {
    let url = rooturl + '/profiel/read_one.php?id=' + profielId;
    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let urlUpdate = rooturl + '/profiel/update.php';

            data['familienaam'] = familienaam;
            data['voornaam'] = voornaam;
            data['geboortedatum'] = geboortedatum;
            data['email'] = email;
            data['nickname'] = nickname;
            data['foto'] = foto;
            data['beroep'] = beroep;
            data['sexe'] = sexe;
            data['haarkleur'] = haarkleur;
            data['oogkleur'] = oogkleur;
            data['grootte'] = grootte;
            data['gewicht'] = gewicht;
            data['wachtwoord'] = wachtwoord;
            data['lovecoins'] = lovecoins;

            console.log(JSON.stringify(data));

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
                    document.getElementById('profielBewerkt').classList.remove('d-none');
                    haalGebruikersInfoOp(gebruikersId, true);

                })
                .catch(function (error) {
                    console.log(error);
                });

        })
        .catch(function (error) {
            console.log(error);
        });
}