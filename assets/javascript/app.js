topics = ["Tom Cruise", "Kurt Russell", "Michael Keaton", "Jack Nicholson", "Sharon Stone",
    "Chrstopher Walken", "Harrison Ford", "Lea Thompson", "Geena Davis", "Goldie Hawn",
    "Sigourney Weaver", "Jennifer Jason Leigh", "Jennifer Connelly", "Kim Basinger",
    "Phoebe Cates", "Kathleen Turner"];

cities = [{
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


var giphyAPIKey = "19C8uwZhdiB9aK3J93kbQ6ph99HN1tc4";
var giphyQueryURL = "https://api.giphy.com/v1/gifs/search?";// + "&api_key=" + giphyAPIKey;
var queryTerm = "";
var weatherAPIKey = "dcfef77b1fe26edc9d499d914dee01c8";
var weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast?APPID=dcfef77b1fe26edc9d499d914dee01c8&q=";
var selectedAPI = "Giphy"
var omdbQueryURL = "http://www.omdbapi.com/?apikey=8252a0f9&"

drawButtons(topics);

function drawButtons(array) {
    console.log("drawbuttonsFN()")
    $("#buttonrow").empty();
    for (element in array) {
        if (selectedAPI == "Giphy" || selectedAPI == "OMDB") {
            var button = $("<button>");
            button.text(array[element]);
            button.addClass("btn btn-dark");
            button.attr("id", "querybutton");
            $("#buttonrow").append(button);
        } else {
            console.log("if statement else for drawbutton")
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
function makeRequest(term) {
    $("#results-col").empty();
    // var giphyQueryURL
    switch (selectedAPI) {
        case "Giphy":
            //Giphy example URL //  https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + term + "&limit=10&offset=0&lang=en
            $.ajax({
                url: giphyQueryURL + "api_key=" + giphyAPIKey + "&q=" + term + "&limit=10&offset=0&lang=en",//queryURL+term+"&api_key="+apikey+"&limit=10&lang=en&offset=0&rating=Y",
                method: "GET"
            }).then(function (resp) {
                console.log(resp["data"]);
                console.log(resp);
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
                    console.log(resp["data"][elements]["images"].fixed_width["url"]);
                    var imageToAdd = $("<img>")
                    imageToAdd.attr("src", resp["data"][elements]["images"].fixed_width_still["url"]).attr("data-animated", resp["data"][elements]["images"].fixed_width["url"]);//add alt attribute
                    imageToAdd.addClass("card-img-bottom");
                    cardBody.append(cardText);
                    cardBody.append(imageToAdd);
                    cardDiv.append(cardBody)
                    cardDiv.appendTo($("#results-col"));
                }
            })
            break;
        case "Weather":
            console.log(term);
            var weatherArray = [];
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?APPID=dcfef77b1fe26edc9d499d914dee01c8&units=metric&q=" + term,
                method: "GET"
            }).then(function (resp) {
                console.log(resp["list"]);
                console.log(resp);
                for (elements in resp["list"]) {
                    var weatherObj = {
                        dateTime: resp["list"][elements].dt_txt,
                        temp: resp["list"][elements]["main"].temp,
                        pressure: resp["list"][elements]["main"].pressure
                    }
                    weatherArray.push(weatherObj);
                }
                var now = Date();
                console.log(now);
                console.log(now.substring(8, 10));
                console.log(weatherArray[1].dateTime.substring(8, 10));
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
                        console.log("day 1");
                        day1.push(weatherArray[dates]);
                    } else if (dateNowNumber + 1 == arrayDateNumber) {
                        console.log("day 2")
                        day2.push(weatherArray[dates]);
                    } else if (dateNowNumber + 2 == arrayDateNumber) {
                        console.log("day 3")
                        day3.push(weatherArray[dates]);

                    } else if (dateNowNumber + 3 == arrayDateNumber) {
                        console.log("day 4")
                        day4.push(weatherArray[dates]);
                    } else if (dateNowNumber + 4 == arrayDateNumber) {
                        console.log("day 5")
                        day5.push(weatherArray[dates]);
                    } else if (dateNowNumber + 5 == arrayDateNumber) {
                        console.log("day 5")
                        day6.push(weatherArray[dates]);
                    } else {
                        console.log("you counted wrong");
                    }

                }
                /* Look into the resp to see if theres icon for weather 
                    add a title to show which city you searched for.
                */
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
                        console.log(dayArray[DA][0].dateTime.substring(0, 11));
                        cardHeader.html("<b>" + dayArray[DA][0].dateTime.substring(0, 11) + "</b>");
                        cardHeader.appendTo(cardDiv);
                        var tempList = $("<ul>")
                        tempList.addClass("list-group list-group-flush");
                        for (ele in dayArray[DA]) {
                            var listItem = $("<li>")
                            listItem.addClass("list-group-item");
                            console.log(dayArray[DA][ele].temp)
                            listItem.html("Time: " + dayArray[DA][ele].dateTime.substring(10, 16) + "<br>Temp: " + dayArray[DA][ele].temp + "<br>Pressure: " + dayArray[DA][ele].pressure)
                            listItem.appendTo(tempList);
                        }
                        tempList.appendTo(cardDiv);
                        cardDiv.appendTo($("#results-col"));

                    }
                }

            })
            console.log(weatherArray);
            break;
        case "OMDB":

            break;
    }

}
$(".btn-group").on("click", "input", function () {
    console.log($(this).attr("id"));
    var thisID = $(this).attr("id");

    $(this).parent().addClass("active").siblings().removeClass('active');
    if (thisID == "OMDB") {
        selectedAPI = "OMDB";
        drawButtons(topics);
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
})
$("#buttonrow").on("click", "#querybutton", function () {

    var queryTerm = encodeURI($(this).text());
    console.log("On Click of querybutton, queryTerm: " + queryTerm);
    setQueryTerm(queryTerm);
    makeRequest(queryTerm);

})
$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    console.log("Added Topic: " + topic);
    switch (selectedAPI) {
        case "Giphy":
        case "OMDB":
            topics.push(topic);
            drawButtons(topics);
            break;
        case "Weather":
            cities.push({ "city": topic, "country": "" });
            drawButtons(cities);
            break;
    }
    
    $("#topic-input").val("");
})
$(".container-fluid").on("click", ".card-img-bottom", function () {
    console.log($(this).attr("data-animated"));
    if (!$(this).attr('data-still')) {
        console.log("not: data-still")
        console.log("src: " + $(this).attr('src'));
        var stillSrc = $(this).attr('src');
        $(this).attr("data-still", stillSrc);
        $(this).attr("src", $(this).attr('data-animated'));

    } else {
        console.log("else")
        console.log("data-still: " + $(this).attr('data-still'));
        $(this).attr('src', $(this).attr('data-still'));

    }
    console.log($(this));
})