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

var simptoms_out = new Array("Vrocina", "Kaselj", "Utrujenost", "Zadihanost", "Izguba vonja/okusa", "Bolece zrelo", "Glavobol", "Bolece misice/sklepi", "Mrzlica", "Slabost/bruhanje", "Zamasen nos", "Driska");

function changeTextS() {
	var text = 'Spark S, covid-spark.info<br>Mislim, da sva bila v zadnjem casu v stiku';
	
	flag = true;
	for (i=0;i<simptoms.length;i++) {
		var checkBox = document.getElementById("simpt".concat(i.toString()));
        var simpt_i = simptoms_out[i].toLowerCase();
		var date_i = formatDate(document.getElementById("date".concat(i.toString())).value);
		
		if (checkBox.checked == true){
			if (flag){
				text = text.concat(".<br>Sporocam ti, da imam simptome znacilne za SARS-CoV-2:<br>");
				flag = false;
			} else {
			    text = text.concat(", ");
			}
			text = text.concat(simpt_i+" ("+date_i+")");
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

function changeTextP() {
	var text = 'Spark P, covid-spark.info<br>Mislim, da sva bila v zadnjem casu v stiku.<br>Sporocam ti, da imam pozitiven rezultat na SARS-CoV-2';
	
	flag = true;
	for (i=0;i<simptoms.length;i++) {
		var checkBox = document.getElementById("simpt".concat(i.toString()));
        var simpt_i = simptoms_out[i].toLowerCase();
		var date_i = formatDate(document.getElementById("date".concat(i.toString())).value);
		
		if (checkBox.checked == true){
			if (flag){
				text = text.concat(".<br>Simptomi, ki sem jih zaznal:<br>");
				flag = false;
			} else {
			    text = text.concat(", ");
			}
			text = text.concat(simpt_i+" ("+date_i+")");
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
	
	var text = 'Spark A, covid-spark.info<br>Mislim, da sva bila v zadnjem casu v stiku.<br>Sporocam ti, da sem morda od '+date_i+' asimptomaticni prenasalec virusa SARS-CoV-2';

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

var R_scene1_out = new Array("da sem bil v stiku z vec osebami, ki so se po ", "da sem bil ");
var R_scene2_out = new Array(" izkazale za simptomaticne ali pozitivne na SARS-CoV-2", " na dogodku supersirjenja virusa SARS-CoV-2");

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
			    text = text.concat(" in ");
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
