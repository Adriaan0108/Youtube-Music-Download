//let background script know we are on https://free-mp3-download.net/
browser.runtime.sendMessage({message: "OnMP3Download"});

//receive song info with message from background script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "SongSent") {
		var title = request.data;
        searchSong(title);
    }
});

//enter the song info in search bar and click the search button to searc for the song
function searchSong(song)
{
    document.querySelectorAll("label[for]")[0].click();
    document.getElementsByClassName("input")[0].value = song;
    document.getElementsByClassName("btn waves-effect waves-light grey lighten-5")[0].click();
}
