// Hamburger
hamburger = document.querySelector(".hamburger");
hamburger.onclick = function () {
	navbar = document.querySelector(".nav-bar");
	navbar.classList.toggle("active"); // Toggle is used to add and remove a class name from an element
}

// Initializing
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById("songNameMaster");

// Collections of songs
let songs = [
	{ songNames: "Kosandra Remix", filePath: "songs/1.mp3", coverPath: "covers/image_2.jpg", duration: "02:58" },
	{ songNames: "Metamorphosis", filePath: "songs/2.mp3", coverPath: "covers/image_3.jpg", duration: "02:23" },
	{ songNames: "After Dark", filePath: "songs/3.mp3", coverPath: "covers/image_4.jpg", duration: "04:17" },
	{ songNames: "Shri Hari Stotram", filePath: "songs/4.mp3", coverPath: "covers/image_5.jpg", duration: "04:37" },
	{ songNames: "Anisi Bas la vi da", filePath: "songs/5.mp3", coverPath: "covers/image_6.jpg", duration: "03:08" }
]

// Adding all the info at once
songItems.forEach((element, i) => {
	element.getElementsByTagName('img')[0].src = songs[i].coverPath;
	element.getElementsByClassName('songName')[0].innerHTML = songs[i].songNames;
	element.getElementsByClassName('time')[0].innerHTML = songs[i].duration;
});

// Handle Main play-pause
function mainPlay() {
	masterPlay.addEventListener('click', () => {
		if (audioElement.paused || audioElement.currentTime <= 0) {
			audioElement.play();
			masterPlay.classList.remove('bi-play-circle');
			masterPlay.classList.add('bi-pause-circle');
			document.getElementById('playGif').style.opacity = "1";
			masterSongName.style.opacity = '1';

		} else {
			audioElement.pause();
			masterPlay.classList.remove('bi-pause-circle');
			masterPlay.classList.add('bi-play-circle');
			document.getElementById('playGif').style.opacity = "0";
			masterSongName.style.opacity = '0';
		}
	})
}

mainPlay();

// Updating time one by one
let updateTime = document.getElementById('updateTime');
let end = document.getElementById('endDuration');
// Listen to events
audioElement.addEventListener("timeupdate", () => {
	console.log("timeupdate");
	progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
	// Update seek bar
	updateTime.innerHTML = progress;
	let time = audioElement.duration / 100
	end.innerHTML = time.toFixed(2);

	progressBar.value = progress
})

progressBar.addEventListener("change", () => {
	audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

const makeAllPlace = () => {
	Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
		element.classList.remove("bi-pause-circle");
		element.classList.add('bi-play-circle');
	})
}


Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
	element.addEventListener("click", (e) => {

		makeAllPlace();
		songIndex = parseInt(e.target.id);
		e.target.classList.remove('bi-play-circle');
		e.target.classList.add('bi-pause-circle');
		audioElement.src = `songs/${songIndex}.mp3`;
		audioElement.currentTime = 0;
		audioElement.play();

		masterSongName.style.opacity = '1';
		masterSongName.innerHTML = songs[songIndex - 1].songNames;
		document.getElementById('playGif').style.opacity = "1";

		masterPlay.classList.remove('bi-play-circle');
		masterPlay.classList.add('bi-pause-circle');

	})
});

document.getElementById("next").addEventListener('click', () => {
	if (songIndex >= 5) {
		songIndex = 0;
	} else {
		songIndex = songIndex + 1;
	}
	audioElement.src = `songs/${songIndex}.mp3`;
	audioElement.currentTime = 0;
	audioElement.play();
	masterSongName.innerHTML = songs[songIndex - 1].songNames;
	masterPlay.classList.remove('bi-play-circle');
	masterPlay.classList.add('bi-pause-circle');
})

document.getElementById("prev").addEventListener('click', () => {
	if (songIndex <= 0) {
		songIndex = 0;
	} else {
		songIndex = songIndex - 1;
	}

	console.log(songIndex);
	audioElement.src = `songs/${songIndex}.mp3`;
	audioElement.currentTime = 0;
	audioElement.play();
	masterSongName.innerHTML = songs[songIndex - 1].songNames;
	masterPlay.classList.remove('bi-play-circle');
	masterPlay.classList.add('bi-pause-circle');
})