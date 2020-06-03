const tracks=[
    {
        name: "Three",
        artist: "Les Hayden",
        image: "https://images.pexels.com/photos/288100/pexels-photo-288100.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        audio_path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Les_Hayden/Proverbs/Les_Hayden_-_09_-_Three.mp3"
    },
    {
        name: "Pure Water",
        artist: "Meydn",
        image:"https://images.pexels.com/photos/62600/pexels-photo-62600.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        audio_path:"https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Meydn/Interplanetary_Forest/Meydn_-_02_-_Pure_Water.mp3"
    },
    {
        name: "Brushed Bells",
        artist: "Daniel Birch",
        image:"https://images.pexels.com/photos/3222196/pexels-photo-3222196.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", 
        audio_path:"https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Daniel_Birch/Ambient_Vol2/Daniel_Birch_-_03_-_Brushed_Bells_Leaving_Home.mp3"
    }
]

let playpause_btn = document.querySelector(".playpause-track");
let trackTitle = document.getElementById("track-title");
let trackArtist = document.getElementById("track-artist");
let trackCount = document.getElementById("track-count");
let trackImg    = document.getElementById("song-img");
let currentTime = document.getElementById("current-time");
let trackDuration = document.getElementById("track-duration");
let timeSlider = document.getElementById("time-slider");
let volumeSlider = document.getElementById("volume-slider");

let index = 0
let lastindex = tracks.length-1;

let isPlaying = false;

function random_bg_color() {
    var x = Math.floor(Math.random() * 256)+30;
    var y = Math.floor(Math.random() * 256)+30;
    var z = Math.floor(Math.random() * 256)+30;
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  
    document.body.style.background = bgColor;
    }

// Initial State////

let cur_audio = new Audio(tracks[index].audio_path);
trackCount.innerHTML = "Playing "  + (index+1) + " of " + (lastindex+1);
trackTitle.innerHTML = tracks[0].name;
trackArtist.innerHTML = tracks[0].artist; 
trackImg.src = tracks[0].image;

////////////////////

function showTime(){

    // Show the respective times on UI
    let currentTimeSeconds = Math.floor(cur_audio.currentTime)%60;
    let currentTimeMinutes = Math.floor(cur_audio.currentTime/60);

    let trackTimeSeconds = Math.floor(cur_audio.duration)%60;
    let trackTimeMinutes = Math.floor(cur_audio.duration/60);

    currentTime.innerHTML = currentTimeMinutes + ":" + currentTimeSeconds;
    trackDuration.innerHTML = trackTimeMinutes + ":" + trackTimeSeconds;

    //Handle the time slider UI animation
    timeSlider.value = (cur_audio.currentTime)*100/cur_audio.duration;

}


function playTrack(actualIndex){
  
    cur_audio.load();
    cur_audio = new Audio(tracks[actualIndex].audio_path);
    setInterval(showTime,1000);
    trackCount.innerHTML = "Playing "  + (index+1) + " of " + (lastindex+1);
    cur_audio.play();
    trackTitle.innerHTML = tracks[actualIndex].name;
    trackArtist.innerHTML = tracks[actualIndex].artist;
    trackImg.src = tracks[actualIndex].image;
    playpause_btn.innerHTML = " <i class='fas fa-pause fa-5x'></i> ";
    random_bg_color();
    cur_audio.addEventListener("ended",nextTrack);
}

function playpauseTrack(){
    cur_audio.load();
   
    if (!isPlaying){
        isPlaying = true;
        playTrack(index)
    }
    else{
        isPlaying = false;
        cur_audio.pause();
        playpause_btn.innerHTML = " <i class='fas fa-play fa-5x'></i> ";
    }
}

function nextTrack(){
    
    index=(index+1)%(lastindex+1);
    playTrack(index)
}

function prevTrack(){
    if((index-1)<0){
        index = lastindex; }
    else index=index-1;
    playTrack(index)
}

function setVolume(){
    cur_audio.volume = volumeSlider.value/100;
}