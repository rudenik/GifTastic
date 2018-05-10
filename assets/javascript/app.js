topics = ["Tom Cruise", "Kurt Russell", "Michael Keaton", "Jack Nicholson", "Sharon Stone", 
        "Chrstopher Walken", "Harrison Ford", "Lea Thompson", "Geena Davis", "Goldie Hawn", 
        "Sigourney Weaver", "Jennifer Jason Leigh", "Jennifer Connelly", "Kim Basinger",
         "Phoebe Cates", "Kathleen Turner"];

cities = ["fill these in later with both cityname and state/province/region"];


var giphyAPIKey = "19C8uwZhdiB9aK3J93kbQ6ph99HN1tc4";
var gifphyQueryURL = "https://api.giphy.com/v1/gifs/search?" ;// + "&api_key=" + giphyAPIKey;
var queryTerm="";
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(resp){
//     console.log(resp)
// })
drawButtons(topics);

function drawButtons(array){
    $("#buttonrow").empty();
    for (element in array){
        var button = $("<button>");
        button.text(array[element]);
        button.addClass("btn btn-dark");
        button.attr("id", "querybutton");
        $("#buttonrow").append(button);
    }
}
function setQueryTerm(term){
    queryTerm=term;
}
function makeRequest(apikey, queryURL, term){
    $("#results-col").empty();
    $.ajax({
        url: queryURL+"api_key="+apikey+"&q="+term+"&limit=10&offset=0&lang=en",//queryURL+term+"&api_key="+apikey+"&limit=10&lang=en&offset=0&rating=Y",
        method: "GET"
    }).then(function(resp){
        console.log(resp["data"]);
        console.log(resp);

    for (elements in resp["data"]){
        var cardDiv = $("<div>");
        cardDiv.addClass("card");
        cardDiv.attr("style", "max-width: 18rem").attr("data-animated", resp["data"][elements]["images"].fixed_width);
        var cardBody = $("<div>");
        cardBody.addClass("card-body").attr("id", "clickToGif");
        var cardText = $("<p>");
        cardText.addClass("card-text");
        cardTextHTML = "<b>Rating: </b>" + resp["data"][elements].rating;
        cardTextHTML += "<br><b>Title: </b>" + resp["data"][elements].title;
        cardText.html(cardTextHTML);
        console.log(resp["data"][elements]["images"].fixed_width["url"]);
        var imageToAdd = $("<img>")
        imageToAdd.attr("src", resp["data"][elements]["images"].fixed_width_still["url"])
        imageToAdd.addClass("card-img-bottom");
        cardBody.append(cardText);
        cardBody.append(imageToAdd);
        cardDiv.append(cardBody)
        cardDiv.appendTo($("#results-col"));
        // imageToAdd.appendTo($("#results-col"));
    }
})
}
$(".btn-group").on("click", "input", function(){
    // $(".btn").button('toggle');
    console.log($(this).attr("id"));
    // console.log($(this).find('input').attr('id'))
    var thisID = $(this).attr("id");
    
    $(this).parent().addClass("active").siblings().removeClass('active');
    if(thisID=="OMDB"){
        //queryURL=
        //apiKey=
        $('body').css('background-color','#DAA520');
        $('#buttonrow').css('background-color','#DAA520');
        $('#search').css('background-color','#DAA520');
        $('#results-col').css('background-color', '#c19d43');
    }
    if(thisID=="Weather"){
        //load city topics

        $('body').css('background-color','#639118');
        $('#buttonrow').css('background-color','#639118');
        $('#search').css('background-color','#639118');
        $('#results-col').css('background-color', '#5b782c');
    }
    if(thisID=="Giphy"){


        $('body').css('background-color','#778899');
        $('#buttonrow').css('background-color','#778899');
        $('#search').css('background-color','#778899');
        $('#results-col').css('background-color', '#4a6580');
    }
})
$("#buttonrow").on("click", "#querybutton", function(){
    var queryTerm = encodeURI($(this).text());
    // console.log(queryTerm);
    setQueryTerm(queryTerm);
    // console.log(giphyAPIKey+ " queryURL: " + gifphyQueryURL +" term: " +queryTerm)
    makeRequest(giphyAPIKey, gifphyQueryURL, queryTerm);

})
$("#add-topic").on("click", function(event){
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    console.log("Added Topic: " + topic);
    topics.push(topic);
    drawButtons(topics);
    $("#add-topic").val() = "";
})
$("div#clickToGif.card-body").on("click", function(){
    console.log($(this));//not registering.
})