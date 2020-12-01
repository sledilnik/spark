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

function AdujstTxtGender(text, word, wordm, wordf) {
	var checkBoxM = document.getElementById("male");
	var checkBoxF = document.getElementById("female");
	
	splitArrayGender = text.split(word);
	var finalStringG = splitArrayGender[0];
	if (checkBoxM.checked == true) {
		for ( i = 1; i < splitArrayGender.length; i++) {
			finalStringG += wordm+splitArrayGender[i]; 
        }
		return finalStringG;
	}
	if (checkBoxF.checked == true) {
		for ( i = 1; i < splitArrayGender.length; i++) {
			finalStringG += wordf+splitArrayGender[i]; 
        }
		return finalStringG;
	}
	return text;
}

function AdujstTxtSumnik(text, s_old, s_new) {
	var checkBoxSumniki = document.getElementById("sumniki");
	
	splitArrayGender = text.split(s_old);
	var finalStringG = splitArrayGender[0];
	if (checkBoxSumniki.checked == false) {
		for ( i = 1; i < splitArrayGender.length; i++) {
			finalStringG += s_new+splitArrayGender[i]; 
        }
		return finalStringG;
	} else {
		return text;
	}
}

var simptoms_out = new Array("Vročina", "Suh kašelj", "Utrujenost", "Bolečine v mišicah/sklepih", "Boleče žrelo", "Driska", "Konjunktivitis", "Glavobol", "Izguba okusa/vonja", "Srbečica/razbarvanost prstov", "Težave pri dihanju/izguba sape", "Bolečina/pritisk v prsih", "Izguba zmožnosti govora/premikanja");

function changeTextS() {
	var text = 'Spark S, covid-spark.info<br>Mislim, da sva bila v zadnjem času v stiku';
	
	flag = true;
	flag2 = false;
	for (i=0;i<simptoms.length;i++) {
		var checkBox = document.getElementById("simpt".concat(i.toString()));
        var simpt_i = simptoms_out[i].toLowerCase();
		var date_i = formatDate(document.getElementById("date".concat(i.toString())).value);
		
		if (checkBox.checked == true){
			if (flag){
				text = text.concat(".<br>Sporočam ti, da imam simptome, značilne za COVID-19: ");
				flag = false;
				flag2 = true;
			} else {
			    text = text.concat(", ");
			}
			text = text.concat(simpt_i+" ("+date_i+")");
		}
	}
	if (flag2) {
		text = text.concat(".<br> Kužen/Kužna sem najverjetneje bil/a 2 dneva pred pričetkom prvih simptomov");
	}
	text = text.concat(".<br>Preveri, kaj to pomeni zate: https://covid-spark.info");
	
	text = AdujstTxtGender(text, "/a", "", "a");
	text = AdujstTxtGender(text, "Kužen/Kužna", "Kužen", "Kužna");
	text = AdujstTxtGender(text, "kužen/kužna", "kužen", "kužna");
	
	text = AdujstTxtSumnik(text, "č", "c");
	text = AdujstTxtSumnik(text, "š", "s");
	text = AdujstTxtSumnik(text, "ž", "z");
	
	splitArray = text.split("<br>");
	
	var finalString = "sms:?&body=";
    for ( i = 0; i < splitArray.length; i++) {
        finalString += splitArray[i]+ "%0a"; 
        }
	
	document.getElementById('msgText').innerHTML=text;
	document.getElementById('msgHref').href= finalString;
	document.getElementById('msgHref2').href= finalString; 
}

var P_scene1_out = new Array("Prvi simptom sem imel/a ", "Nimam simptomov, a mislim, da sem se okužil/a ", "Nimam simptomov in ne vem, kdaj sem se okužil/a");
var P_scene2_out = new Array(", kužen/kužna pa bi lahko bil/a že 2 dneva prej", ", 3 dni po tem pa bi lahko bil/a kužen/kužna", "");

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
	
	text = AdujstTxtGender(text, "/a", "", "a");
	text = AdujstTxtGender(text, "Kužen/Kužna", "Kužen", "Kužna");
	text = AdujstTxtGender(text, "kužen/kužna", "kužen", "kužna");
	
	text = AdujstTxtSumnik(text, "č", "c");
	text = AdujstTxtSumnik(text, "š", "s");
	text = AdujstTxtSumnik(text, "ž", "z");
	
	splitArray = text.split("<br>");
	
	var finalString = "sms:?&body=";
    for ( i = 0; i < splitArray.length; i++) {
        finalString += splitArray[i]+ "%0a"; 
        }
	
	document.getElementById('msgText').innerHTML=text;
	document.getElementById('msgHref').href= finalString;
	document.getElementById('msgHref2').href= finalString; 
}

var N_scene_out = new Array("Imam negativen test na SARS-CoV-2.", "Moj potencialni vir okužbe se je izkazal za negativno testiranega.");

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
	
	text = AdujstTxtSumnik(text, "č", "c");
	text = AdujstTxtSumnik(text, "š", "s");
	text = AdujstTxtSumnik(text, "ž", "z");
	
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
	
	var text = 'Spark A, covid-spark.info<br>Mislim, da sva bila v zadnjem času v stiku.<br>Sporočam ti, da sem bil/a '+date_i+' v stiku z možnim superprenašalcem, kar pa pomeni, da bi lahko jaz postal/a 3 dni kasneje asimptomatični prenašalec virusa';
	
	text = AdujstTxtGender(text, "/a", "", "a");
	text = AdujstTxtGender(text, "Kužen/Kužna", "Kužen", "Kužna");
	text = AdujstTxtGender(text, "kužen/kužna", "kužen", "kužna");
	
	text = AdujstTxtSumnik(text, "č", "c");
	text = AdujstTxtSumnik(text, "š", "s");
	text = AdujstTxtSumnik(text, "ž", "z");
	
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

var R_scene1_out = new Array("da sem bil/a v stiku z več osebami, ki so se po ", "da sem bil/a ");
var R_scene2_out = new Array(" izkazale za simptomatične ali pozitivne na SARS-CoV-2, kar pomeni, da bi lahko bil/a jaz njihov vir okužbe in kužen/kužna že 5 dni prej", " na dogodku superširjenja virusa SARS-CoV-2, kar pa pomeni, da bi lahko 3 dni po dogodku postal/a kužen/kužna");

function changeTextR() {
	var text = 'Spark R, covid-spark.info<br>Mislim, da sva bila v zadnjem času v stiku';
	
	flag = true;
	for (i=0;i<R_scene1_out.length;i++) {
		var checkBox = document.getElementById("simpt".concat(i.toString()));
        var simpt1_i = R_scene1_out[i];
		var simpt2_i = R_scene2_out[i];
		var date_i = formatDate(document.getElementById("date".concat(i.toString())).value);
		
		if (checkBox.checked == true){
			if (flag){
				text = text.concat(".<br>Sporočam ti, ");
				flag = false;
			} else {
			    text = text.concat(", in ");
			}
			text = text.concat(simpt1_i+date_i+simpt2_i);
		}
	}
	
	text = text.concat(".<br>Preveri, kaj to pomeni zate: https://covid-spark.info");
	
	text = AdujstTxtGender(text, "/a", "", "a");
	text = AdujstTxtGender(text, "Kužen/Kužna", "Kužen", "Kužna");
	text = AdujstTxtGender(text, "kužen/kužna", "kužen", "kužna");
	
	text = AdujstTxtSumnik(text, "č", "c");
	text = AdujstTxtSumnik(text, "š", "s");
	text = AdujstTxtSumnik(text, "ž", "z");
	
	splitArray = text.split("<br>");
	
	var finalString = "sms:?&body=";
    for ( i = 0; i < splitArray.length; i++) {
        finalString += splitArray[i]+ "%0a"; 
        }
	
	document.getElementById('msgText').innerHTML=text;
	document.getElementById('msgHref').href= finalString;
	document.getElementById('msgHref2').href= finalString; 
}

function changeTextShare() {
	var text = 'Obišči spletni portal https://covid-spark.info. Deli naprej, da omejimo virus.';
	
	text = AdujstTxtSumnik(text, "č", "c");
	text = AdujstTxtSumnik(text, "š", "s");
	text = AdujstTxtSumnik(text, "ž", "z");
	
	splitArray = text.split("<br>");
	
	var finalString = "sms:?&body=";
    for ( i = 0; i < splitArray.length; i++) {
        finalString += splitArray[i]+ "%0a"; 
        }
	
	document.getElementById('msgText').innerHTML=text;
	document.getElementById('msgHref').href= finalString;
	document.getElementById('msgHref2').href= finalString;
}