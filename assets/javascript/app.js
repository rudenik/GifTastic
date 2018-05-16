var topics = ["Tom Cruise", "Kurt Russell", "Michael Keaton", "Jack Nicholson", "Sharon Stone",
    "Chrstopher Walken", "Harrison Ford", "Lea Thompson", "Geena Davis", "Goldie Hawn",
    "Sigourney Weaver", "Jennifer Jason Leigh", "Jennifer Connelly", "Kim Basinger",
    "Phoebe Cates", "Kathleen Turner"];

var moviesList = ["Inception", "Fight Club", "Office Space", "Seven", "Memento", "Captain America",
    "Cabin in the Woods", "Back to the Future", "The Breakfast Club", "Ghostbusters",
    "Ferris Bueller's Day Off", "The Goonies", "Aliens", "The Empire Strikes Back",
    "Die Hard", "Top Gun", "Stand by Me", "Raiders of the Lost Ark", "Gremlins", "The Terminator", "Sixteen Candles", "Pretty in Pink",
    "Fast Times at Ridgemont High", "Weird Science", "Heathers", "Blade Runner", "Dirty Dancing", "Beetlejuice", "The Princess Bride",
    "The Shining"];

var cities = [{
    "city": "Toronto",
    "country": "CA"
},
{
    "city": "New York",
    "country": "US"
},
{
    "city": "London",
    "country": "UK"
},
{
    "city": "Tokyo",
    "country": "JP"
},
{
    "city": "Los Angeles",
    "country": "US"
},
{
    "city": "Vancouver",
    "country": "CA"
},
{
    "city": "Cancun",
    "country": "MX"
},
{
    "city": "Paris",
    "country": "FR"
},
{
    "city": "Milan",
    "country": "IT"
}];
var favGifs = JSON.parse(localStorage.getItem("favs"));

if (!Array.isArray(favGifs)) {
    favGifs = [];
}

var giphyAPIKey = "19C8uwZhdiB9aK3J93kbQ6ph99HN1tc4";
var giphyQueryURL = "https://api.giphy.com/v1/gifs/search?";
var queryTerm = "";
var weatherAPIKey = "dcfef77b1fe26edc9d499d914dee01c8";
var weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast?APPID=dcfef77b1fe26edc9d499d914dee01c8&q=";
var selectedAPI = "Giphy";
var offset = 0;
var omdbQueryURL = "https://www.omdbapi.com/?apikey=8252a0f9&";

drawButtons(topics);
checkForFavourites();

function checkForFavourites() {
    var storedFavs = JSON.parse(localStorage.getItem("favs"));
    if (!Array.isArray(storedFavs)) {
        storedFavs = [];
    } else {
        favGifs = storedFavs;
    }

    if ((favGifs.length > 0) && ($(".btn-group").children().length) == 3) {
        console.log("we have favourites");
        var favLabel = $("<label class='btn btn-secondary' id='removableFavButton'>");
        var favInput = $("<input type='radio' name='options' id='Favourites' autocomplete='off'>");
        var favLabelText = "Favourites";
        favLabel.append(favInput);
        favLabel.append(favLabelText);
        $(".btn-group").append(favLabel);
    } else if (favGifs.length < 1) {
        console.log("No favourites here");
        $("#removableFavButton").remove();
    }
}

function drawButtons(array) {
    $("#buttonrow").empty();
    for (element in array) {
        if (selectedAPI == "Giphy" || selectedAPI == "OMDB") {
            var button = $("<button>");
            button.text(array[element]);
            button.addClass("btn btn-dark");
            button.attr("id", "querybutton");
            $("#buttonrow").append(button);
        } else {
            var button = $("<button>");
            button.text(array[element].city);
            button.addClass("btn btn-dark");
            button.attr("id", "querybutton").attr("data-city", array[element]);
            $("#buttonrow").append(button);
        }
    }
}
function setQueryTerm(term) {
    queryTerm = term;
}
function grabFavs() {
    var favURL = "https://api.giphy.com/v1/gifs/";
    for (favs in favGifs) {
        $.ajax({
            url: favURL + favGifs[favs] + "?api_key=" + giphyAPIKey,
            method: "GET"
        }).then(function (resp) {
            var cardDiv = $("<div>");
            cardDiv.addClass("card");
            cardDiv.attr("style", "max-width: 18rem");
            var cardBody = $("<div>");
            cardBody.addClass("card-body").attr("id", "clickToGif").attr("data-animated", resp["data"]["images"].fixed_width["url"]);
            var cardText = $("<p>");
            cardText.addClass("card-text");
            cardTextHTML = "<b>Rating: </b>" + resp["data"].rating;
            cardTextHTML += "<br><b>Title: </b>" + resp["data"].title;
            cardText.html(cardTextHTML);
            var imageToAdd = $("<img>")
            imageToAdd.attr("src", resp["data"]["images"].fixed_width_still["url"]).attr("data-animated", resp["data"]["images"].fixed_width["url"]).attr("alt", "still image for gif " + resp["data"].title);
            imageToAdd.addClass("card-img-bottom");
            var favImg = $("<img src='assets/images/starFull.png'>");
            favImg.attr("id", "favImg").attr("data-imageID", resp["data"]["id"]);
            var dlButton = $("<button>");
            dlButton.text("Download");
            dlButton.attr("id", "dlbutton").addClass("btn btn-outline-secondary");
            cardBody.append(cardText);
            cardBody.append(imageToAdd);
            cardDiv.append(cardBody)
            dlButton.appendTo(cardDiv);
            favImg.appendTo(cardDiv);
            cardDiv.appendTo($("#results-col"));

        })

    }



}
function makeRequest(term, oset) {
    if (oset == 0) {
        $("#results-col").empty();
    }
    switch (selectedAPI) {
        case "Giphy":
            var searchTermDiv = $("<div>");
            searchTermDiv.addClass("card");
            searchTermDiv.attr("id", "searchtermdiv");
            searchTermDiv.html("<b>Here are the results for " + queryTerm + " on Giphy</b>");
            searchTermDiv.prependTo($("#results-col"));
            $.ajax({
                url: giphyQueryURL + "api_key=" + giphyAPIKey + "&q=" + term + "&limit=10&offset=" + oset + "&lang=en",
                method: "GET"
            }).then(function (resp) {
                for (elements in resp["data"]) {
                    var cardDiv = $("<div>");
                    cardDiv.addClass("card");
                    cardDiv.attr("style", "max-width: 18rem");
                    var cardBody = $("<div>");
                    cardBody.addClass("card-body").attr("id", "clickToGif").attr("data-animated", resp["data"][elements]["images"].fixed_width["url"]);
                    var cardText = $("<p>");
                    cardText.addClass("card-text");
                    cardTextHTML = "<b>Rating: </b>" + resp["data"][elements].rating;
                    cardTextHTML += "<br><b>Title: </b>" + resp["data"][elements].title;
                    cardText.html(cardTextHTML);
                    var imageToAdd = $("<img>")
                    imageToAdd.attr("src", resp["data"][elements]["images"].fixed_width_still["url"]).attr("data-animated", resp["data"][elements]["images"].fixed_width["url"]).attr("alt", "still image for gif " + resp["data"][elements].title);
                    imageToAdd.addClass("card-img-bottom");
                    var favImg = $("<img src='assets/images/starempty.png'>");
                    favImg.attr("id", "favImg").attr("data-imageID", resp["data"][elements]["id"]);
                    var dlButton = $("<button>");
                    dlButton.text("Download");
                    dlButton.attr("id", "dlbutton").addClass("btn btn-outline-secondary");
                    cardBody.append(cardText);
                    cardBody.append(imageToAdd);
                    cardDiv.append(cardBody)
                    dlButton.appendTo(cardDiv);
                    favImg.appendTo(cardDiv);
                    cardDiv.appendTo($("#results-col"));
                }
                var pageButton = $("<button>");
                pageButton.addClass("btn btn-success btn-lg btn-block");
                pageButton.text("Next 10");
                pageButton.attr("id", "nextpage");
                pageButton.appendTo("#results-col");

            })
            break;
        case "Weather":
            $("#results-col").empty();
            var weatherArray = [];
            var searchTermDiv = $("<div>");
            searchTermDiv.addClass("card");
            searchTermDiv.attr("id", "searchtermdiv");
            searchTermDiv.html("<b>Here is the five day forcast for " + queryTerm + "</b>");
            searchTermDiv.prependTo($("#results-col"));
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?APPID=dcfef77b1fe26edc9d499d914dee01c8&units=metric&q=" + term,
                method: "GET"
            }).then(function (resp) {
                for (elements in resp["list"]) {
                    var weatherObj = {
                        dateTime: resp["list"][elements].dt_txt,
                        temp: resp["list"][elements]["main"].temp,
                        pressure: resp["list"][elements]["main"].pressure,
                        icon: "https://openweathermap.org/img/w/" + resp["list"][elements]["weather"][0].icon + ".png"
                    }
                    weatherArray.push(weatherObj);
                }
                var now = Date();
                var dateNowNumber = parseInt(now.substring(8, 10));
                var day1 = [];
                var day2 = [];
                var day3 = [];
                var day4 = [];
                var day5 = [];
                var day6 = [];
                for (dates in weatherArray) {
                    var arrayDateNumber = parseInt(weatherArray[dates].dateTime.substring(8, 10));
                    if (dateNowNumber == arrayDateNumber) {
                        day1.push(weatherArray[dates]);
                    } else if (dateNowNumber + 1 == arrayDateNumber) {
                        day2.push(weatherArray[dates]);
                    } else if (dateNowNumber + 2 == arrayDateNumber) {
                        day3.push(weatherArray[dates]);
                    } else if (dateNowNumber + 3 == arrayDateNumber) {
                        day4.push(weatherArray[dates]);
                    } else if (dateNowNumber + 4 == arrayDateNumber) {
                        day5.push(weatherArray[dates]);
                    } else if (dateNowNumber + 5 == arrayDateNumber) {
                        day6.push(weatherArray[dates]);
                    } else {
                        console.log("you counted wrong");
                    }
                }
                var dayArray = [day1, day2, day3, day4, day5, day6];
                for (DA in dayArray) {
                    if (dayArray[DA].length == 0) {
                        console.log("empty Day");
                    } else {
                        var cardDiv = $("<div>");
                        cardDiv.addClass("card");
                        cardDiv.attr("style", "max-width: 18rem");
                        var cardHeader = $("<div>");
                        cardHeader.addClass("card-header");
                        cardHeader.html("<b>" + dayArray[DA][0].dateTime.substring(0, 11) + "</b>");
                        cardHeader.appendTo(cardDiv);
                        var tempList = $("<ul>")
                        tempList.addClass("list-group list-group-flush");
                        for (ele in dayArray[DA]) {
                            var listItem = $("<li>")
                            listItem.addClass("list-group-item");
                            listItem.html("<br>Time: " + dayArray[DA][ele].dateTime.substring(10, 16) + "<br>Temp: " + dayArray[DA][ele].temp + "<br>Pressure: " + dayArray[DA][ele].pressure)
                            listItem.appendTo(tempList);
                            var weatherIcon = $('<img>');
                            weatherIcon.attr("src", dayArray[DA][ele].icon);
                            weatherIcon.prependTo(listItem);
                        }
                        tempList.appendTo(cardDiv);
                        cardDiv.appendTo($("#results-col"));
                    }
                }
            })
            break;
        case "OMDB":
            $("#results-col").empty();
            var movieResults = [];
            var searchTermDiv = $("<div>");
            searchTermDiv.addClass("card");
            searchTermDiv.attr("id", "searchtermdiv");
            searchTermDiv.html("<b>Here are the results for " + queryTerm + " on OMDB</b>");
            searchTermDiv.prependTo($("#results-col"));
            $.ajax({
                url: omdbQueryURL = "https://www.omdbapi.com/?apikey=8252a0f9&s=" + term,
                method: "GET"
            }).then(function (resp) {
                for (results in resp["Search"]) {
                    if (resp["Search"][results]["Poster"] == "N/A") {
                        //do nothing don't add the card if the poster doesn't exist. 
                    } else {
                        var movieObj = {
                            title: resp["Search"][results]["Title"],
                            year: resp["Search"][results]["Year"],
                            poster: resp["Search"][results]["Poster"]
                        }
                        movieResults.push(movieObj);
                    }
                }
                for (posMov in movieResults) {
                    var cardDiv = $("<div>");
                    cardDiv.addClass("card");
                    cardDiv.attr("style", "max-width: 18rem").attr("id", "moviecard").attr("data-movie", movieResults[posMov].title).attr("data-poster", movieResults[posMov].poster).attr("data-poster-showing", "true");
                    var cardHeader = $("<div>");
                    cardHeader.addClass("card-header");
                    cardHeader.html("<b>Title: </b>" + movieResults[posMov].title + "<br>Year: " + movieResults[posMov].year);
                    cardHeader.appendTo(cardDiv);
                    var imageToAdd = $("<img>");
                    imageToAdd.attr("src", movieResults[posMov].poster).attr("alt", movieResults[posMov].title + " Poster");
                    imageToAdd.addClass("card-img-bottom");
                    cardDiv.append(imageToAdd);
                    cardDiv.appendTo($("#results-col"));
                }
            });
            break;
    }
}
$(".btn-group").on("click", "input", function () {
    var thisID = $(this).attr("id");
    offset = 0;
    $(this).parent().addClass("active").siblings().removeClass('active');
    if (thisID == "OMDB") {
        selectedAPI = "OMDB";
        drawButtons(moviesList);
        $('body').css('background-color', '#DAA520');
        $('#buttonrow').css('background-color', '#DAA520');
        $('#search').css('background-color', '#DAA520');
        $('#results-col').css('background-color', '#c19d43');
    }
    if (thisID == "Weather") {
        selectedAPI = "Weather";
        drawButtons(cities);
        $('body').css('background-color', '#639118');
        $('#buttonrow').css('background-color', '#639118');
        $('#search').css('background-color', '#639118');
        $('#results-col').css('background-color', '#5b782c');
    }
    if (thisID == "Giphy") {
        selectedAPI = "Giphy";
        drawButtons(topics);
        $('body').css('background-color', '#778899');
        $('#buttonrow').css('background-color', '#778899');
        $('#search').css('background-color', '#778899');
        $('#results-col').css('background-color', '#4a6580');
    }
    if (thisID == "Favourites") {
        $("#results-col").empty();
        $('body').css('background-color', '#778899');
        $('#buttonrow').css('background-color', '#778899');
        $('#search').css('background-color', '#778899');
        $('#results-col').css('background-color', '#4a6580');
        grabFavs();
    }
})

$("#buttonrow").on("click", "#querybutton", function () {
    queryTerm = $(this).text();
    var queryTermEncoded = encodeURI($(this).text());
    setQueryTerm(queryTerm);
    makeRequest(queryTermEncoded, 0);

})

$(".container-fluid").on("click", "#nextpage", function () {
    offset += 10;
    var queryTermEncoded = encodeURI(queryTerm);
    makeRequest(queryTermEncoded, offset);
    $("#searchtermdiv").remove();
    $(this).remove();
})

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    switch (selectedAPI) {
        case "Giphy":
            topics.push(topic);
            drawButtons(topics);
        case "OMDB":
            moviesList.push(topic);
            drawButtons(moviesList);
            break;
        case "Weather":
            cities.push({ "city": topic, "country": "" });
            drawButtons(cities);
            break;
    }
    $("#topic-input").val("");
})

$(".container-fluid").on("click", ".card-img-bottom", function () {
    if (selectedAPI == "Giphy") {
        if (!$(this).attr('data-still')) {
            var stillSrc = $(this).attr('src');
            $(this).attr("data-still", stillSrc);
            $(this).attr("src", $(this).attr('data-animated'));
        } else {
            $(this).attr('src', $(this).attr('data-still'));
        }
    }
})

$(".container-fluid").on("click", "#moviecard", function () {
    var term = encodeURI($(this).attr("data-movie"));
    var actors;
    var awards;
    var thisCard = $(this)
    if ($(this).attr("data-poster-showing") == "true") {
        $.ajax({
            url: omdbQueryURL = "https://www.omdbapi.com/?apikey=8252a0f9&t=" + term,
            method: "GET"
        }).then(function (resp) {
            actors = resp["Actors"];
            awards = resp["Awards"];
            thisCard.attr("data-movie-info", actors);
            thisCard.attr("data-poster-showing", "false");
            thisCard.children()[1].remove();
            var cardText = $("<p>");
            cardText.addClass("card-text");
            cardText.html("<b>Actors: </b>" + actors + "<br><b>Awards: </b>" + awards);
            thisCard.append(cardText);
        })
    } else {
        thisCard.children()[1].remove();
        var imageToAdd = $("<img>");
        imageToAdd.attr("src", thisCard.attr("data-poster"));
        imageToAdd.addClass("card-img-bottom");
        thisCard.attr("data-poster-showing", "true");
        thisCard.append(imageToAdd);
    }
})

$(".container-fluid").on("click", ".btn-outline-secondary", function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", $(this).siblings().attr("data-animated"), true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        var urlCreator = window.url || window.URL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.download = "giphy.gif";
        tag.href = imageUrl;
        tag.target = "_blank";
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
})

$(".container-fluid").on("click", "#favImg", function () {
    if ($(this).attr("src") == "assets/images/starFull.png") {
        var indexToRemove = favGifs.indexOf($(this).attr("data-imageID"));
        favGifs.splice(indexToRemove, 1);
        $(this).attr("src", "assets/images/starempty.png");
        localStorage.setItem("favs", JSON.stringify(favGifs));
        checkForFavourites();
    } else {
        $(this).attr("src", "assets/images/starFull.png");
        favGifs.push($(this).attr("data-imageID"));
        localStorage.setItem("favs", JSON.stringify(favGifs));
        checkForFavourites();
    }
})

