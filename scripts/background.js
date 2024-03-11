//counter to keep track of how many times the message OnMP3Download was sent from https://free-mp3-download.net/
//this is to prevent https://free-mp3-download.net/ from requesting the song info if https://free-mp3-download.net/
	//was not opened from https://music.youtube.com/
var counter = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	//only send song info if https://free-mp3-download.net/ is opened
    if (request.message === "OnMP3Download") {
		
		//increase counter everytime the message OnMP3Download is sent from https://free-mp3-download.net/
		counter++;
		
		//if counter is >= 1, it means https://free-mp3-download.net/ already requested the song info 
			//and it should not request it again
		if (counter <= 1) {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				//send song info with message to https://free-mp3-download.net/
			chrome.tabs.sendMessage(tabs[0].id, {message: "SongSent", data: title});  
			});
		}	
	}
});

var title = "";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "ButtonClicked") {
		
		//set song info to data received with message from https://music.youtube.com/
		title = request.data;
		
		//counter is reset because the user wants to download a new song
		counter = 0;
        buttonClickHandler();
    }
});


function buttonClickHandler()
{
	//create new https://free-mp3-download.net/ tab
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        chrome.tabs.create({url: "https://free-mp3-download.net/"});
    });
}

