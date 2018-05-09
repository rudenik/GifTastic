topic = ["Tom Cruise", "Kurt Russell", "Michael Keaton", "Jack Nicholson", "Sharon Stone", 
        "Chrstopher Walken", "Harrison Ford", "Lea Thompson", "Geena Davis", "Goldie Hawn", 
        "Sigourney Weaver", "Jennifer Jason Leigh", "Jennifer Connelly", "Kim Basinger",
         "Phoebe Cates", "Kathleen Turner"];

cities = ["fill these in later with both cityname and state/province/region"];


var giphyAPIKey = "19C8uwZhdiB9aK3J93kbQ6ph99HN1tc4";
var gifphyQueryURL = "https://api.giphy.com/v1/gifs/search?q=" // + "&api_key=" + giphyAPIKey;
var queryTerm=""
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(resp){
//     console.log(resp)
// })
drawButtons(topic);

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
})