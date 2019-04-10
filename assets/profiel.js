/* DOM elementen */
var eError = document.querySelector("h1.error");
var eProfiel = document.querySelector("div.profiel");
var eNickname = document.querySelector(".profiel .nickname");
var eFoto = document.querySelector(".profiel .profielfoto img");
var eProfielVelden = document.querySelector(".profiel .gegevens dl").childNodes;
var eFamilienaam = document.querySelector(".profiel .familienaam dd");
var eVoornaam = document.querySelector(".profiel .voornaam dd");
var eGeboortedatum = document.querySelector(".profiel .geboortedatum dd");
var eSterrenbeeld = document.querySelector(".profiel .sterrenbeeld dd");
var eEmail = document.querySelector(".profiel .email dd");
var eBeroep = document.querySelector(".profiel .beroep dd");
var eSexe = document.querySelector(".profiel .sexe dd");
var eHaarkleur = document.querySelector(".profiel .haarkleur dd");
var eOogkleur = document.querySelector(".profiel .oogkleur dd");
var eGrootte = document.querySelector(".profiel .grootte dd");
var eGewicht = document.querySelector(".profiel .gewicht dd");
var eLovecoins = document.querySelector(".profiel .lovecoins dd");



// TO DO : aanvullen aan de hand van zoekpagina / local storage
// TO DO : controleren of ingelogd
var eigenProfiel = true;
var zoekId;
if (zoekId) {
	eigenProfiel = false;

	//getIngevuldProfielById(id);

	//toon button "favoriet"
	var eButtonFavoriet = document.createElement("button");
	eButtonFavoriet.className = "btn btn-dark float-right mt-2 favoriet";
	

	//TO DO button verschilt indien reeds favoriet (ophalen uit database)
	var favoriet = false;
	if (favoriet) {
		eButtonFavoriet.className = "btn btn-dark float-sm-right fa fa-heart mt-2 favoriet";
	}
	else {
		eButtonFavoriet.className = "btn btn-dark float-sm-right fa fa-heart-o mt-2 favoriet";
	}
	eProfiel.insertBefore(eButtonFavoriet, eNickname);

	//event button "favoriet"
	// document.querySelector(".profiel button.favoriet").addEventListener("click", function () {
	// 	aan te vullen like/unlike
	// });

	//toon button "stuur bericht"
	var eButtonBericht = document.createElement("button");
	var tButtonBericht = document.createTextNode("Stuur bericht");
	eButtonBericht.appendChild(tButtonBericht);
	eButtonBericht.className = "btn btn-dark bericht";
	eProfiel.appendChild(eButtonBericht);

	//event button "stuur bericht"
	// document.querySelector(".profiel button.bericht").addEventListener("click", function () {
	// 	location.href = berichten.html?berichtnaar=id; 
	// });

	//toon button "toon volledig profiel"
	var eButtonVolledig = document.createElement("button");
	var tButtonVolledig = document.createTextNode("Toon volledig profiel");
	eButtonVolledig.appendChild(tButtonVolledig);
	eButtonVolledig.className = "btn btn-dark volledig ml-2";
	eProfiel.appendChild(eButtonVolledig);

	//event button "toon volledig profiel"
	document.querySelector(".profiel button.volledig").addEventListener("click", function () {
	//	TO DO lovecoins
	// 	popup: kost 1 lovecoin: ok? nog voldoende lovecoins?

	//	toon alle velden behalve lovecoins + verberg button
		for (var i = 0; i < eProfielVelden.length; i++) {
			if (eProfielVelden[i].classList && !profielVelden[i].classList.contains('lovecoins')) {
				eProfielVelden[i].classList.remove('d-none');
			}		
		}
		this.classList.add('d-none');
	});
}
else if (eigenProfiel) {
	//haal gegevens profiel uit local storage (1 of meerdere keys?)
	//gebruiker = localStorage.gebruiker;
	
	//getIngevuldProfiel(gebruiker);

	//toon alle velden van profiel
	for (var i = 0; i < eProfielVelden.length; i++) {
		if (eProfielVelden[i].classList) {
			eProfielVelden[i].classList.remove('d-none');
		}		
	}

	//toon button "bewerk profiel"
	var eButtonBewerk = document.createElement("button");
	var tButtonBewerk = document.createTextNode("Bewerk profiel");
	eButtonBewerk.appendChild(tButtonBewerk);
	eButtonBewerk.className = "btn btn-dark bewerk";
	eProfiel.appendChild(eButtonBewerk);

	//event button "bewerk profiel"
	// document.querySelector(".profiel button.bewerk").addEventListener("click", function () {
	// 	location.href = profielbewerken.html;
	// });

	//toon button "verwijder profiel"
	var eButtonVerwijder = document.createElement("button");
	var tButtonVerwijder = document.createTextNode("Verwijder profiel");
	eButtonVerwijder.appendChild(tButtonVerwijder);
	eButtonVerwijder.className = "btn btn-dark ml-2 verwijder";
	eProfiel.appendChild(eButtonVerwijder);

	//event button "verwijder profiel"
	document.querySelector(".profiel button.verwijder").addEventListener("click", function () {
		//voorlopig vast id
		verwijderProfiel(5071);
		//melding profiel verwijderd?

	});

	// lovecoins verhogen
}

//voorlopig vast id
getIngevuldProfielById(5071);

function getIngevuldProfielById(id) {
	/* haalt profiel op o.b.v. id en vult profiel in */
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
	        	eProfiel.classList.remove('d-none');
	        	eError.classList.add('d-none');
	        }
	        else {
	        	console.log('niet');
	        	eError.innerHTML = "De gevraagde gebruiker werd niet gevonden";
	        	
	        }
	   		
	    })
	    .catch(function (error) {
	        console.log(error);
	    });
}

function getIngevuldProfiel(profiel) {
	/* vult gegevens profiel aan op basis van een array */

	eNickname.innerHTML = profiel.nickname;
	eFoto.src = profiel.foto;

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
	eLovecoins.innerHTML = profiel.lovecoins;
}

function verwijderProfiel(profielId) {
	/* verwijderd gebruiker op basis van id */

	let url=rooturl+'/profiel/delete.php';

    let data = {
        id: profielId
    }

    var request = new Request(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    
    fetch(request)
        .then( function (resp) {
        	return resp.json();
        })
        .then( function (data) {
        	console.log(data);
        })
        .catch(function (error) {
        	console.log(error);
        });

    //TO DO uitloggen
}

function getFavorietenGebruiker(profielId) {
	/* verwijderd alle favorieten van een gebruiker o.b.v. id */

	//alle favorieten gebruiker ophalen
	let url=rooturl+'/favoriet/read.php?profielId='+profielId;

	var idFavorietenGebruiker = [];

    fetch(url)
        .then(function (resp) {
        	return resp.json();
        })
        .then(function (data) {
        	//ids favorieten verzamelen in array
        	if (data.length > 0) {
	        	var favorietenGebruiker = data;
	        	
	        	for (var i = 0; i < favorietenGebruiker.length; i++) {
	        		idFavorietenGebruiker.push(favorietenGebruiker[i].id);
	        	}
	        }
        })
        .catch(function (error) {
        	console.log(error);
        });

    
}