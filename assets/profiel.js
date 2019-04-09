//
var profiel;
var familienaam;


/* DOM elementen */
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

var rooturl = "https://scrumserver.tenobe.org/scrum/api";
let profielId = 5;
let url = rooturl + '/profiel/read_one.php?id=' + profielId;

fetch(url)
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        profiel = data;
        console.log(profiel);
        familienaam = profiel.familienaam;
        console.log(familienaam);
    })
    .catch(function (error) {
        console.log(error);
    });

console.log(profiel);
console.log(familienaam);


// eFamilienaam.innerHTML = ;