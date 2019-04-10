window.onload = function () {

    var minLeeftijd = 18;
    var minLengtePass = 6;

    document.getElementById('knop8').addEventListener('click', function (e) {
        e.preventDefault();
        let url = rooturl + '/profiel/create.php';

        //reset error meldingen
        errorMsg = "";
        let registratieVelden = document.querySelectorAll('form#registratie input');
        registratieVelden.forEach(function(input) {
            input.addEventListener('focus', function() {
                input.classList.remove("is-invalid");
            })
        })
             
        // Data ophalen uit id
        let familienaam = document.getElementById('familienaam').value;
        let voornaam = document.getElementById('voornaam').value;
        let geboortedatum = document.getElementById('geboortedatum').value;
        let email = document.getElementById('maakEmail').value;
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
        let wachtwoord1 = document.getElementById('wachtwoord1').value;
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
        let alleWaarden = document.querySelectorAll('#registratie input:not([type="radio"])');
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
                wachtwoord: wachtwoord1,
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

                    // 400 of 503 error tonen
                    let konNietAanmaken = "Kon profiel niet aanmaken.";
                    let dataOnvolledig = "Kon profiel niet aanmaken. Data is onvolledig.";

                    if (dataOnvolledig == data.message) {
                        errorMsg += "Niet alle velden werden ingevuld.<br>";
                    }
                    if (konNietAanmaken == data.message) {
                        // De enigste error die we niet opvangen is de controle op uniekheid nickname
                        errorMsg += "Nickname reeds in gebruik, kies een andere nickname.<br>";
                        document.getElementById('nickname').
                        classList.add("is-invalid");
                    }
                    // Toon de error
                    if (errorMsg != "") {
                        toonerrorMsg(errorMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        // Toon de error
        if (errorMsg != "") {
            toonerrorMsg(errorMsg);
        }
    });
}