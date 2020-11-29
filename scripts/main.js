var acc = document.getElementsByClassName("collapsible");

for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

function showDate(n) {
  // Get the checkbox
  var checkBox = document.getElementById("simpt".concat(n.toString()));
  // Get the output text
  var date = document.getElementById("date".concat(n.toString()));

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    date.style.display = "block";
  } else {
    date.style.display = "none";
  }
}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day,month,year].join('.');
}

var simptoms_out = new Array("Vrocina", "Suh kaselj", "Utrujenost", "Bolecine", "Bolece zrelo", "Driska", "Konjunktivitis", "Glavobol", "Izguba okusa/vonja", "Srbecica/razbarvanost prstov", "Tezave pri dihanju/izguba sape", "Bolecina/pritisk v prsih", "Izguba zmožnosti govora/premikanja");
function changeTextS() {
	var text = 'Spark S, covid-spark.info<br>Mislim, da sva bila v zadnjem casu v stiku';
	
	flag = true;
	flag2 = false;
	for (i=0;i<simptoms.length;i++) {
		var checkBox = document.getElementById("simpt".concat(i.toString()));
        var simpt_i = simptoms_out[i].toLowerCase();
		var date_i = formatDate(document.getElementById("date".concat(i.toString())).value);
		
		if (checkBox.checked == true){
			if (flag){
				text = text.concat(".<br>Sporocam ti, da imam simptome, znacilne za COVID-19: ");
				flag = false;
				flag2 = true;
			} else {
			    text = text.concat(", ");
			}
			text = text.concat(simpt_i+" ("+date_i+")");
		}
	}
	if (flag2) {
		text = text.concat(".<br> Kuzen/Kuzna sem najverjetneje bil/a 2 dneva pred pricetkom prvih simptomov");
	}
	text = text.concat(".<br>Preveri, kaj to pomeni zate: https://covid-spark.info");
	
	splitArray = text.split("<br>");
	
	var finalString = "sms:?&body=";
    for ( i = 0; i < splitArray.length; i++) {
        finalString += splitArray[i]+ "%0a"; 
        }
	
	document.getElementById('msgText').innerHTML=text;
	document.getElementById('msgHref').href= finalString;
	document.getElementById('msgHref2').href= finalString; 
}

var P_scene1_out = new Array("", "Nimam simptomov, a mislim, da sem se okuzil/a ", "Nimam simptomov in ne vem, kdaj sem se okuzil/a");
var P_scene2_out = new Array(" sem imel/a prvi simptom, kuzen/kuzna pa bi lahko bil/a ze 2 dneva prej", ", 3 dni po tem pa bi lahko bil/a kuzen/kuzna", "");

function changeTextP() {
	var text = 'Spark P, covid-spark.info<br>Imam pozitiven test na SARS-CoV-2';
	
	flag = true;
	for (i=0;i<P_scene1_out.length;i++) {
		var checkBox = document.getElementById("simpt".concat(i.toString()));
        var simpt1_i = P_scene1_out[i];
		var simpt2_i = P_scene2_out[i];
		var date_i = formatDate(document.getElementById("date".concat(i.toString())).value);
		
		if (checkBox.checked == true){
			if (flag){
				text = text.concat(".<br>");
				flag = false;
			} else {
			    text = text.concat(", in ");
			}
			if (i<2){
				text = text.concat(simpt1_i+date_i+simpt2_i);
			} else {
				text = text.concat(simpt1_i+simpt2_i);
			}
			
		}
	}
	
	text = text.concat(".<br>Preveri, kaj to pomeni zate: https://covid-spark.info");
	
	splitArray = text.split("<br>");
	
	var finalString = "sms:?&body=";
    for ( i = 0; i < splitArray.length; i++) {
        finalString += splitArray[i]+ "%0a"; 
        }
	
	document.getElementById('msgText').innerHTML=text;
	document.getElementById('msgHref').href= finalString;
	document.getElementById('msgHref2').href= finalString; 
}

var N_scene_out = new Array("Imam negativen test na SARS-CoV-2.", "Moj potencialni vir okuzbe se je izkazal za negativno testiranega.");

function changeTextN() {
	var text = 'Spark N, covid-spark.info<br>';
	
	flag = true;
	for (i=0;i<N_scene_out.length;i++) {
		var checkBox = document.getElementById("simpt".concat(i.toString()));
        var simpt_i = N_scene_out[i];
		
		if (checkBox.checked == true){
			if (flag){
				flag = false;
			} else {
			    text = text.concat(" ");
			}
			text = text.concat(simpt_i);
		}
	}
	
	splitArray = text.split("<br>");
	
	var finalString = "sms:?&body=";
    for ( i = 0; i < splitArray.length; i++) {
        finalString += splitArray[i]+ "%0a"; 
        }
	
	document.getElementById('msgText').innerHTML=text;
	document.getElementById('msgHref').href= finalString;
	document.getElementById('msgHref2').href= finalString; 
}

function changeTextA() {
	var i = 0;
	var date_i = formatDate(document.getElementById("date".concat(i.toString())).value);
	
	var text = 'Spark A, covid-spark.info<br>Mislim, da sva bila v zadnjem casu v stiku.<br>Sporocam ti, da sem bil/a '+date_i+' v stiku z moznim superprenasalcem, kar pa pomeni, da bi lahko jaz postal/a 3 dni kasneje asimptomaticni prenasalec virusa';

	text = text.concat(".<br>Preveri, kaj to pomeni zate: https://covid-spark.info");
	
	splitArray = text.split("<br>");
	
	var finalString = "sms:?&body=";
    for ( i = 0; i < splitArray.length; i++) {
        finalString += splitArray[i]+ "%0a"; 
        }
	
	document.getElementById('msgText').innerHTML=text;
	document.getElementById('msgHref').href= finalString;
	document.getElementById('msgHref2').href= finalString; 
}

var R_scene1_out = new Array("da sem bil/a v stiku z vec osebami, ki so se po ", "da sem bil/a ");
var R_scene2_out = new Array(" izkazale za simptomaticne ali pozitivne na SARS-CoV-2, kar pomeni, da bi lahko bil/a jaz njihov vir okuzbe in kuzen/kuzna ze 5 dni prej", " na dogodku supersirjenja virusa SARS-CoV-2, kar pa pomeni, da bi lahko 3 dni po dogodku postal/a kuzen/kuzna");

function changeTextR() {
	var text = 'Spark R, covid-spark.info<br>Mislim, da sva bila v zadnjem casu v stiku';
	
	flag = true;
	for (i=0;i<R_scene1_out.length;i++) {
		var checkBox = document.getElementById("simpt".concat(i.toString()));
        var simpt1_i = R_scene1_out[i];
		var simpt2_i = R_scene2_out[i];
		var date_i = formatDate(document.getElementById("date".concat(i.toString())).value);
		
		if (checkBox.checked == true){
			if (flag){
				text = text.concat(".<br>Sporocam ti, ");
				flag = false;
			} else {
			    text = text.concat(", in ");
			}
			text = text.concat(simpt1_i+date_i+simpt2_i);
		}
	}
	
	text = text.concat(".<br>Preveri, kaj to pomeni zate: https://covid-spark.info");
	
	splitArray = text.split("<br>");
	
	var finalString = "sms:?&body=";
    for ( i = 0; i < splitArray.length; i++) {
        finalString += splitArray[i]+ "%0a"; 
        }
	
	document.getElementById('msgText').innerHTML=text;
	document.getElementById('msgHref').href= finalString;
	document.getElementById('msgHref2').href= finalString; 
}
