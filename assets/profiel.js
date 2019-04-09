var rooturl = "https://scrumserver.tenobe.org/scrum/api";
var profiel;

// TO DO VERBORGEN VELDEN


/* DOM elementen */
var eProfiel = document.querySelector('div.profiel')
var eNickname = document.querySelector('.profiel .nickname');
var eFamilienaam = document.querySelector('.profiel .familienaam dd');
var eVoornaam = document.querySelector('.profiel .voornaam dd');
var eGeboortedatum = document.querySelector('.profiel .geboortedatum dd');
var eSterrenbeeld = document.querySelector('.profiel .sterrenbeeld dd');
var eEmail = document.querySelector('.profiel .email dd');
var eBeroep = document.querySelector('.profiel .beroep dd');
var eSexe = document.querySelector('.profiel .sexe dd');
var eHaarkleur = document.querySelector('.profiel .haarkleur dd');
var eOogkleur = document.querySelector('.profiel .oogkleur dd');
var eGrootte = document.querySelector('.profiel .grootte dd');
var eGewicht = document.querySelector('.profiel .gewicht dd');
var eFoto = document.querySelector('.profiel .foto img');
//var eBewerk = document.querySelector('button.bewerk');
//var eBericht  = document.querySelector('button.bericht');

// TO DO : aanvullen aan de hand van zoekpagina / local storage
var eigenProfiel = true;
var zoekId;
if (zoekId) {
	eigenProfiel = false;

	//getProfielById(id);

	//toon button 'stuur bericht'
	var eButtonBericht = document.createElement('button');
	var tButtonBericht = document.createTextNode('Stuur bericht');
	eButtonBericht.appendChild(tButtonBericht);
	eButtonBericht.className = "btn btn-dark bericht";
	eProfiel.appendChild(eButtonBericht);

	//event button 'stuur bericht'
	// eButtonBericht.addEventListener('click', function () {
	// 	location.href = berichten.html; 
	// });

} else
if (eigenProfiel) {
	//haal gegevens profiel uit local storage (1 of meerdere keys?)
	//profiel = localStorage.profiel;
	
	//getIngevuldProfiel(profiel);

	//toon button 'bewerk profiel'
	var eButtonBewerk = document.createElement('button');
	var tButtonBewerk = document.createTextNode('Bewerk profiel');
	eButtonBewerk.appendChild(tButtonBewerk);
	eButtonBewerk.className = "btn btn-dark bewerk";
	eProfiel.appendChild(eButtonBewerk);

	//event button 'bewerk profiel'
	// eButtonBewerk.addEventListener('click', function () {
	// 	location.href = profielbewerken.html;
	// });
}

//voorlopig vast id
getProfielById(5);

function getProfielById(id) {
	/* haalt profiel op o.b.v. id */
	let profielId = id;
	let url = rooturl + '/profiel/read_one.php?id=' + profielId;

	fetch(url)
	    .then(function (resp) {
	        return resp.json();
	    })
	    .then(function (data) {
	        profiel = data;

	        if (profiel.id) {
	        	getIngevuldProfiel(profiel);
	        }
	        else {

	        }
	   		
	    })
	    .catch(function (error) {
	        console.log(error);
	    });
}

function getIngevuldProfiel(profiel) {
	/* vult gegevens profiel aan op basis van een array */

	eNickname.innerHTML = profiel.nickname;

	eFamilienaam.innerHTML = profiel.familienaam;
	eVoornaam.innerHTML = profiel.voornaam;
	eGeboortedatum.innerHTML = profiel.geboortedatum;

	eSterrenbeeld.innerHTML = getSterrenbeeld(profiel.geboortedatum);

	eEmail.innerHTML = profiel.email;
	eBeroep.innerHTML = profiel.beroep;
	eSexe.innerHTML = profiel.sexe;
	eHaarkleur.innerHTML = profiel.haarkleur;
	eOogkleur.innerHTML = profiel.oogkleur;
	eGrootte.innerHTML = profiel.grootte;
	eGewicht.innerHTML = profiel.gewicht;

	// Foto
	//eFoto.src = profiel.foto;
}

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