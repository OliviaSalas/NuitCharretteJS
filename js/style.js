var myVar;

function intro() {
	myVar = setTimeout(showPage, 5000);
};

function showPage() {
	document.getElementById("loader").style.opacity = "0";
	document.getElementById("loader").style.transition = "0.5s";
	setTimeout(function(){
		document.getElementById("loader").style.display = "none";
	}, 1000);
	document.getElementById("principal").style.display = "block";
	setTimeout(function(){
		document.getElementById("gif").style.opacity = "1";
		document.getElementById("gif").style.transition = "1s";
	}, 1000);
}