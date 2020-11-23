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
	text = text.concat(".<br>Poglej: https://covid-spark.info");
	
	splitArray = text.split("<br>");
	
	var finalString = "sms:?body='";
    for ( i = 0; i < splitArray.length; i++) {
        finalString += splitArray[i]+ "%0a"; 
        }
	finalString += "'";
	
	document.getElementById('msgText').innerHTML=text;
	document.getElementById('msgText').innerHTML=text;
	document.getElementById('msgHref').href= finalString; 
}
