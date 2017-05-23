var covers = document.querySelectorAll('.frame'),
	title = document.querySelectorAll('.playlist');
var ctrl = document.querySelector('#player'),
	trackDisplay = document.querySelector('.title'),
	repeat = document.querySelector('.loop'),
    play = document.querySelector('.play'),
    pause = document.querySelector('.pause'),
	shuffle = document.querySelector('.shuffle'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next');
var	albumID = -1,
	song = 0;
var shuffleOn = false;
ctrl.loop = false;


// Loads or reloads a song
function reload(){
	ctrl.pause();
	document.getElementById('source').src = playlist.albums[albumID][song].path;
	trackDisplay.innerHTML = '<p>' + playlist.albums[albumID][song].title + '</p>';
	ctrl.load();
	ctrl.play();
}

// Play/Pause function
function playPause(){
	if (albumID == -1){
		return;
	} else if(ctrl.paused) {
		ctrl.play();
		play.classList.add('hidden');
		play.classList.remove('visible');
		pause.classList.add('visible');
		pause.classList.remove('hidden');
    } else {	
    	ctrl.pause();
    	play.classList.remove('hidden');
		play.classList.add('visible');
		pause.classList.remove('visible');
		pause.classList.add('hidden');
  	}
}

//Switch the div button's display depending isOn boolean
function modeOnOff(div, isOn){
	if(isOn){
		div.style.border = '1px solid lightgrey';
		div.style.borderRadius = '20%';
		div.style.background = 'lightgrey';
	} else {
		div.style.border = 'none';
		div.style.borderRadius = 'none';
		div.style.background = 'none';
	}
}

//Shuffle function
function playShuffle(array, player){
	if(ctrl.loop == true){
		ctrl.loop == false
	}
	var oldSong = song;
	song = Math.floor(Math.random() * array.length);
	console.log(song);
	if (song == oldSong){
		song = song - 1;
		console.log("c'était la même !");
	}
	reload();
}

// Resizes the cover when selected and loads the album's first track
for (let i = 0 ; i < covers.length ; i++){
	covers[i].addEventListener('click', function(){	
		for (var j = 0; j < covers.length; j++){
			if(i==j) {
				albumID = j;
				song = 0;
				covers[j].classList.add('selected');
				play.classList.add('hidden');
				play.classList.remove('visible');
				pause.classList.add('visible');
				pause.classList.remove('hidden');
				reload();
			} else {
				covers[j].classList.remove('selected');
			}
		}
	});
}

// Loop button
repeat.addEventListener('click', function(){
	if(shuffleOn == true && ctrl.loop == false){
		shuffleOn = false;
		ctrl.loop = true;
		modeOnOff(repeat, ctrl.loop);
		modeOnOff(shuffle, shuffleOn);
	}else if(ctrl.loop == false){
		ctrl.loop = true;
		modeOnOff(repeat, ctrl.loop);
		modeOnOff(shuffle, shuffleOn);
	} else{
		ctrl.loop = false;
		modeOnOff(repeat, ctrl.loop);
		modeOnOff(shuffle, shuffleOn);
	}
});

// Play/Pause button
play.addEventListener('click', playPause);
pause.addEventListener('click', playPause);

//When the song is over, skips to the next song
ctrl.addEventListener('ended', function(){
	song++;
	document.getElementById('source').src = playlist.albums[albumID][song].path;
	reload();
});

// Shuffle button
shuffle.addEventListener('click', function(){
	if(shuffleOn == false){
		ctrl.loop = false;
		playShuffle(playlist.albums[albumID], ctrl);
		shuffleOn = true;
		modeOnOff(repeat, ctrl.loop);
		modeOnOff(shuffle, shuffleOn);
	}
	else {
		shuffleOn = false;
		modeOnOff(repeat, ctrl.loop);
		modeOnOff(shuffle, shuffleOn);
	}
});

//Updates the progress bar
ctrl.addEventListener('timeupdate', function(){
	var duration = ctrl.duration,
		time = ctrl.currentTime,
		fraction = time / duration,
		percent = Math.ceil(fraction * 100),
		progress = document.querySelector('#progressBar');

	trackDisplay.innerHTML = '<p>' + playlist.albums[albumID][song].title + '</p>';
	progress.style.width = percent + '%';
});

// Previous song button
prev.addEventListener('click', function(){
	repeat.loop = false;
	if(shuffleOn == true){
		playShuffle(playlist.albums[albumID], ctrl);
	} else if(ctrl.loop == true){
		reload();
	} else if (song == 0){
		song = playlist.albums[albumID].length - 1;
		reload();
	} else{
		song--;
		reload();
	}
});

// Next song button
next.addEventListener('click', function(){
	repeat.loop = false;
	if(shuffleOn == true){
		playShuffle(playlist.albums[albumID], ctrl);
	} else if(ctrl.loop == true){
		reload();
	} else if(song == playlist.albums[albumID].length - 1){
		song = 0;
		reload();
	} else{
		song++;
		reload();
	}
});