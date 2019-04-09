/* global vars */
var profiel;


/* DOM elementen */
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

var eFoto = document.querySelector('.profiel img.foto');
console.log(eFoto);
console.log(eNickname);

var rooturl = "https://scrumserver.tenobe.org/scrum/api";

getProfielById(5);

function getProfielById(id) {
	let profielId = 5;
	let url = rooturl + '/profiel/read_one.php?id=' + profielId;

	fetch(url)
	    .then(function (resp) {
	        return resp.json();
	    })
	    .then(function (data) {
	        profiel = data;
	        console.log(profiel);
	   	
	   		//TO DO buiten fetch plaatsen
	   		eNickname.innerHTML = profiel.nickname;

			eFamilienaam.innerHTML = profiel.familienaam;
			eVoornaam.innerHTML = profiel.voornaam;
			eGeboortedatum.innerHTML = profiel.geboortedatum;

			eEmail.innerHTML = profiel.email;
			eBeroep.innerHTML = profiel.beroep;
			eSexe.innerHTML = profiel.sexe;
			eHaarkleur.innerHTML = profiel.haarkleur;
			eOogkleur.innerHTML = profiel.oogkleur;
			eGrootte.innerHTML = profiel.grootte;
			eGewicht.innerHTML = profiel.gewicht;

			//Foto's ?????
			//eFoto.src = profiel.foto;
	    })
	    .catch(function (error) {
	        console.log(error);
	    });

	console.log(profiel);
}

// sterrenbeeld nog invullen

// verborgen velden aanpassen