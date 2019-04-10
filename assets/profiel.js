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