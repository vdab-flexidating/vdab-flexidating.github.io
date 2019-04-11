/* DOM elementen */
var eZoeken = document.querySelector("h1.zoeken");
var eProfiel = document.querySelector("div.profiel");
var eNickname = document.querySelector(".profiel .nickname");
var eFoto = document.querySelector(".profiel .profielfoto img");
var eProfielVelden = document.querySelectorAll(".profiel .gegevens dl div");
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

var eHeaderTekst = document.querySelector('.banner-title span');

var eModal = document.getElementById('bevestigVerwijder');
var eClose = document.querySelector('#bevestigVerwijder .close');
var eBevestigVerwijder = document.getElementById('verwijder');
var eBehoudProfiel = document.getElementById('behoud');

gebruiker = haalUitStorage("gebruiker");
gebruikersId = gebruiker.id;
console.log(gebruikersId)

//controle of er een gebruiker ingelogd is
if (gebruiker) {
	var url = window.location.search;
	// via zoekpagina
	if(url.includes('gebruiker')) {
		var profielId = getProfielIdFromGet(url);
		getIngevuldProfielById(profielId);
		getButtonFavoriet();
		getButtonBericht();
		getButtonVolledigProfiel();
	}
	else {
		//eigen profiel
		document.title = "Mijn account";
		eHeaderTekst.innerHTML = "Mijn account";

		getIngevuldProfiel(gebruiker);


		//toon alle velden van profiel
		for (var i = 0; i < eProfielVelden.length; i++) {
			if (eProfielVelden[i].classList) {
				eProfielVelden[i].classList.remove('d-none');
				eProfielVelden[i].classList.remove('blur-text');
			}		
		}
		//buttons toevoegen
		getButtonBewerk();
		getButtonVerwijder();
		// lovecoins verhogen
	}
}
else {
	toonerrorMsg("Gelieve in te loggen om deze inhoud weer te geven.");
}

function getProfielIdFromGet(url) {
	var zoek = "gebruiker=";
	    
    var begin = url.indexOf(zoek);
    if (begin != -1) {
        begin += zoek.length;
        var einde = url.indexOf("&", begin);
        if (einde == -1) {
            einde = url.length;
        }
        return url.substring(begin, einde);
    }
	return profielId;
}

function getIngevuldProfielById(id) {
	/* haalt profiel op o.b.v. id en vult profiel in (indien niet eigen profiel)*/
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
	        	eZoeken.classList.add('d-none');
	        	toonerrorMsg("De gevraagde gebruiker werd niet gevonden");
	        }	
	    })
	    .catch(function (error) {
	        console.log(error);
	    });
}

function getIngevuldProfiel(profiel) {
	/* vult gegevens profiel aan op basis van een array */
	eNickname.innerHTML = profiel.nickname;
	eFoto.src = "https://scrumserver.tenobe.org/scrum/img/" + profiel.foto;
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

	eZoeken.classList.add('d-none');
}

function getButtonBewerk() {
	//toon button "bewerk profiel"
	var eButtonBewerk = document.createElement("button");
	var tButtonBewerk = document.createTextNode("Bewerk profiel");
	eButtonBewerk.appendChild(tButtonBewerk);
	eButtonBewerk.className = "btn btn-dark bewerk";
	eProfiel.appendChild(eButtonBewerk);

	//event button "bewerk profiel"
	document.querySelector(".profiel button.bewerk").addEventListener("click", function () {
		location.href = "profielbewerken.html";
	});
}

function getButtonVerwijder() {
	//toon button "verwijder profiel"
	var eButtonVerwijder = document.createElement("button");
	var tButtonVerwijder = document.createTextNode("Verwijder profiel");
	eButtonVerwijder.appendChild(tButtonVerwijder);
	eButtonVerwijder.className = "btn btn-dark ml-2 verwijder";
	eProfiel.appendChild(eButtonVerwijder);

	//event button "verwijder profiel"
	document.querySelector(".profiel button.verwijder").addEventListener("click", function () {
		eModal.classList.add('d-block');
		eClose.addEventListener("click", function () {
			eModal.classList.remove('d-block');	
		});
		eBehoudProfiel.addEventListener("click", function () {
			eModal.classList.remove('d-block');	
		});
		eBevestigVerwijder.addEventListener("click", function () {
			eModal.classList.remove('d-block');
			logout();
			verwijderVanStorage("alles");
			verwijderProfiel(gebruikersId);
			console.log(gebruiker);
			if(!gebruiker) {
				console.log('verwijderd')
				toonerrorMsg("Uw profiel werd succesvol verwijderd.");
				eZoeken.classList.add('d-none');
				eProfiel.classList.add('d-none');
			}
		});		
	});
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
}

function getButtonFavoriet() {
	//toon button "favoriet"
	var eButtonFavoriet = document.createElement("button");
	eButtonFavoriet.className = "btn btn-dark float-right mt-2 favoriet";
	eProfiel.insertBefore(eButtonFavoriet, eNickname);

	// is profiel een favoriet?
	getIconFavoriet(gebruikersId, profielId);

	//event button "favoriet"
	document.querySelector(".profiel button.favoriet").addEventListener("click", function () {
		//aan te vullen like/unlike
		if (document.querySelector('button.favoriet.fa-heart-o')) {
			console.log('like');
		}
		else {
			console.log('unlike');
		}
		//na wijziging
		getIconFavoriet(gebruikersId, profielId);
	});
}

function getIconFavoriet(gebruikersId, profielId) {
	/* controleert of profiel een favoriet is van de gebruiker en zorgt voor gepast icon*/

	//TO DO vervangen door local storage

	//alle favorieten gebruiker ophalen
	let url=rooturl+'/favoriet/read.php?profielId='+gebruikersId;

	let eButtonFavoriet = document.querySelector('button.favoriet');

    fetch(url)
        .then(function (resp) {
        	return resp.json();
        })
        .then(function (data) {
        	//ids favorieten verzamelen in array
        	if (data.length > 0) {
	        	var favorietenGebruiker = data;	     
	        	console.log(favorietenGebruiker);   	
	        	for (var i = 0; i < favorietenGebruiker.length; i++) {
	           		if (favorietenGebruiker[i].anderId == profielId && !(favorietenGebruiker[i].statusCode == 3)) {
	        			eButtonFavoriet.className = "btn btn-dark float-sm-right fa fa-heart mt-2 favoriet";
	        		}
	        		else {
	        			eButtonFavoriet.className = "btn btn-dark float-sm-right fa fa-heart-o mt-2 favoriet";
	        		}	        		
	        	}
	        }
        })
        .catch(function (error) {
        	console.log(error);
        });
}

function getButtonBericht() {
	//toon button "stuur bericht"
	var eButtonBericht = document.createElement("button");
	var tButtonBericht = document.createTextNode("Stuur bericht");
	eButtonBericht.appendChild(tButtonBericht);
	eButtonBericht.className = "btn btn-dark bericht";
	eProfiel.appendChild(eButtonBericht);

	//event button "stuur bericht"
	document.querySelector(".profiel button.bericht").addEventListener("click", function () {
		console.log('bericht')
	// 	location.href = berichten.html?berichtnaar=id; 
	});
}

function getButtonVolledigProfiel() {
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
			if (eProfielVelden[i].classList) {
				eProfielVelden[i].classList.remove('blur-text');
			}		
		}
		this.classList.add('d-none');
	});
}