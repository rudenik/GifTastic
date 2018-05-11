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

drawButtons(topics);


function drawButtons(array) {
    console.log("drawbuttonsFN()")
    $("#buttonrow").empty();
    
    for (element in array) {
        if (selectedAPI=="Giphy"||selectedAPI=="OMDB") {
            var button = $("<button>");
            button.text(array[element]);
            button.addClass("btn btn-dark");
            button.attr("id", "querybutton");
            $("#buttonrow").append(button);
        } else {//if (isObject(element)){
            console.log("if statement else for drawbutton")
            var button = $("<button>");
            button.text(array[element].city);
            button.addClass("btn btn-dark");
            button.attr("id", "querybutton").attr("data-city", array[element]);
            // var dataCity = $(button.attr("data-city"));
            // console.log("Attr, data-city: " + dataCity);
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
                    cardDiv.attr("style", "max-width: 18rem");//.attr("data-animated", resp["data"][elements]["images"].fixed_width);
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
                    // imageToAdd.appendTo($("#results-col"));
                }
            })
            break;
        case "Weather":
            console.log(term);
            var weatherObj = {
                dateTime: "",
                temp: "",
                pressure: ""
            }
            var weatherArray = [];
            
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?APPID=dcfef77b1fe26edc9d499d914dee01c8&units=metric&q=" + term,
                method: "GET"
            }).then(function (resp) {
                console.log(resp["list"]);
                console.log(resp);
                
                for (elements in resp["list"]) {
                    var nextWO = new weatherObj;
                    nextWO.dateTime=resp["list"][elements].dt_txt;
                    nextWO.temp=resp["list"][elements]["main"].temp;
                    nextWO.pressure=resp["list"][elements]["main"].pressure;
                    console.log(resp["list"][elements].dt_txt);
                    console.log(resp["list"][elements]["main"].temp);
                    console.log(resp["list"][elements]["main"].pressure);
                    weatherArray.push(nextWO);



                    // var cardDiv = $("<div>");
                    // cardDiv.addClass("card");
                    // cardDiv.attr("style", "max-width: 18rem");
                    // var cardBody = $("<div>");
                    // cardBody.addClass("card-body")
                    // var 
                //     var cardText = $("<p>");
                //     cardText.addClass("card-text");
                //     cardTextHTML = "<b>Rating: </b>" + resp["data"][elements].rating;
                //     cardTextHTML += "<br><b>Title: </b>" + resp["data"][elements].title;
                //     cardText.html(cardTextHTML);
                //     console.log(resp["data"][elements]["images"].fixed_width["url"]);
                //     var imageToAdd = $("<img>")
                //     imageToAdd.attr("src", resp["data"][elements]["images"].fixed_width_still["url"]).attr("data-animated", resp["data"][elements]["images"].fixed_width["url"]);//add alt attribute
                //     imageToAdd.addClass("card-img-bottom");
                //     cardBody.append(cardText);
                //     cardBody.append(imageToAdd);
                //     cardDiv.append(cardBody)
                //     cardDiv.appendTo($("#results-col"));
                // imageToAdd.appendTo($("#results-col"));
                }

            })
            console.log(weatherArray);
            break;
        case "OMDB":

            break;
    }

}
$(".btn-group").on("click", "input", function () {
    // $(".btn").button('toggle');
    console.log($(this).attr("id"));
    // console.log($(this).find('input').attr('id'))
    var thisID = $(this).attr("id");

    $(this).parent().addClass("active").siblings().removeClass('active');
    if (thisID == "OMDB") {
        //queryURL=
        //apiKey=
        selectedAPI = "OMDB";
        $('body').css('background-color', '#DAA520');
        $('#buttonrow').css('background-color', '#DAA520');
        $('#search').css('background-color', '#DAA520');
        $('#results-col').css('background-color', '#c19d43');
    }
    if (thisID == "Weather") {
        //load city topics
        selectedAPI = "Weather";
        drawButtons(cities);
        $('body').css('background-color', '#639118');
        $('#buttonrow').css('background-color', '#639118');
        $('#search').css('background-color', '#639118');
        $('#results-col').css('background-color', '#5b782c');
    }
    if (thisID == "Giphy") {
        selectedAPI = "Giphy";

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
    // console.log(giphyAPIKey+ " queryURL: " + giphyQueryURL +" term: " +queryTerm)
    // makeRequest(giphyAPIKey, giphyQueryURL, queryTerm);
    makeRequest(queryTerm);

})
$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    console.log("Added Topic: " + topic);
    switch (selectedAPI){
        case "Giphy":
        case "OMDB":
        topics.push(topic);
        drawButtons(topics);
        break;
        case "Weather":
        cities.push({"city":topic,"country":""});
        drawButtons(cities);
        break;
    }
    // topics.push(topic);
    // drawButtons(topics);
    $("#topic-input").val("");
})
$(".container-fluid").on("click", ".card-img-bottom", function () {
    console.log($(this).attr("data-animated"));//.attributes["data-animated"]);
    if (!$(this).attr('data-still')) {
        console.log("not: data-still")
        console.log("src: " + $(this).attr('src'));
        var stillSrc = $(this).attr('src');
        $(this).attr("data-still", stillSrc);
        $(this).attr("src", $(this).attr('data-animated'));

    } else {
        console.log("else")
        console.log("data-still: " + $(this).attr('data-still'));
        //var animatedSrc = $(this).attr('data-animated');
        $(this).attr('src', $(this).attr('data-still'));

    }
    // var stillSrc = $(this).attr('src');
    // $(this).attr("src", $(this).attr('data-animated'));
    // $(this).attr("data-still", stillSrc);
    console.log($(this));//" //> ".card-img-bottom"));//.children("card-img-bottom"));
})