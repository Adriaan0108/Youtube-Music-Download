//create Download button if it is not already created
function createButton()
{
	//check if Download button is already created
    if (document.getElementById("youtube-music-download-button") === null)
    {
        let button = document.createElement("button");
        let element = document.getElementById("buttons");
        button.id = "youtube-music-download-button";
        button.src = "images/FreeMp3Logo-96.png";
        button.title = "Download";
        button.textContent = "Download";
        document.getElementsByClassName("middle-controls-buttons style-scope ytmusic-player-bar")[0].appendChild(button);

        //buttonClickHandler's parentheses are omitted. If they were included, buttonClickHandler() would have been 
        //immediately invoked, even without a triggering event, and thus the handler would not function properly.
        button.addEventListener("click", buttonClickHandler);
    }
}

//send song info with ButtonClicked message
function buttonClickHandler()
{
	var title = fetchData();
	browser.runtime.sendMessage({message: "ButtonClicked", data: title});
}

//get song artist and title from elements
function fetchData()
{
    var songLine = document.getElementsByClassName("title style-scope ytmusic-player-bar")[0].innerText;
    var start1, end1;
    
    for (let i = 0; i < songLine.length; i++)
    {
        if (songLine[i] == ">" && i != songLine.length -1)
        {
            start1 = i;
        }

        if (songLine[i] == "<" && i != 0)
        {
            end1 = i;
        }
    }

    var song = songLine.substring(start1, end1);

	var artistLine = document.getElementsByClassName("byline style-scope ytmusic-player-bar complex-string")[0].innerText;
	var indx = artistLine.indexOf("•");
	var artist = artistLine.substring(0, indx);
	
	
	/* //This does not work after minimizing the currently playing song and then maximizing it again
	
	var artistLine = document.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string")[0].innerText;
    var start2, end2;
    
    for (let i = 0; i < artistLine.length; i++)
    {
        if (artistLine[i] == ">" && i != artistLine.length -1)
        {
            start2 = i;
        }

        if (artistLine[i] == "<" && i != 0)
        {
            end2 = i;
        }
    }

    var artist = artistLine.substring(start2, end2);
	*/

    return artist + "- " + song;
}

createButton();
