

var chartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var fortuneSubject = ["I", "You", "He", "She", "It", "We", "You all", "They", "Your best friend", 
    "Somebody", "The love of your life", "72 baboons", "The person closest to you"];

var fortuneName = "";

var fortuneVerb = [" will ", " might ", " already began to ", " will never again ", " will forever ",
    " might want to ", " might decide to ", " will try to ", " will not try to ", " might not want to ",
    " probably won't ", " definitely will never "];

var fortuneAction = ["eat", "fall in love", "marry rich", "cry", "live forever", "win the lottery",
    "get sprayed by a skunk", "desire nothing", "desire everything", "become allergic to cheese", "breed micro-organisms",
    "be the all knowing more powerful version of Michael Phelps", "yodel", "yodel forever", "cry tears of spray cheese"];

function startProgram()
{
 
    $("#addName").val("");

    //from jqueryUi toggle effect
        // run the currently selected effect
        function runEffect(slidePart, options) {

        // set effect type
        var selectedEffect = "slide";
    
        // Run the effect
        $( slidePart ).toggle( selectedEffect, options, 500 );
        };

    //random fortune generator
    function randomFortune()
    {
        var subjectName;
        //checks to see if it is to be the added name
        if (fortuneName !== "")
        {
            subjectName = fortuneName;
        }
        else
        {
            var subjectNum = Math.floor(Math.random() * fortuneSubject.length);
            subjectName = fortuneSubject[subjectNum]
        }

        //chooses random numbers for random generator
        var verbNum = Math.floor(Math.random() * fortuneVerb.length);
        var actionNum = Math.floor(Math.random() * fortuneAction.length);

        var fortune = subjectName + fortuneVerb[verbNum] + fortuneAction[actionNum];

        //appends the fortune to show it
        appendSection(fortune);

    }

    //add Name to fortune List
    function addName()
    {
        var name = $("#addName").val();

        console.log(name);

            fortuneName = name;

            randomFortune();

    }

    //adds the liked item into the liked list
    function likeRandom()
    {
        var randomItem = $( "#fortuneSpot" ).text()
        
        //checks to see if there is a fortune or jokeor not
        if (randomItem != 'Click on a button to Get Random!')
        //adds to list ok liked items
        $("#favList").append("<li>" + randomItem + "</li>");
    }

    function randomNumber()
    {
        var randNum = Math.floor(Math.random() * 11);
        appendSection("Your number between 0 and 10:<br>" + randNum);
        chartData[randNum] += 1;
        updateConfigByMutating(myChart);

    }

    //appends the random things to the show section
    function appendSection(randomThing)
    {
        $("#fortuneSpot").empty().append(randomThing);
    }

    //chart from additional library, chart.js

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['0', '1', '2', '3', '4', '5', '6','7', '8', '9', '10'],
        datasets: [{
            label: '# of times picked',
            data: chartData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 99, 132, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
    
    function updateConfigByMutating(chart) {
        chart.options.title.text = 'new title';
        chart.update();
    }

    function clearGraph()
    {
        for (var i = 0; i < chartData.length; i++)
        {
            chartData[i] = 0;
        }
        updateConfigByMutating(myChart);
    }

    //gets the joke with an ajax request from the joke API
    function getJoke()
    {
        var xhr = new XMLHttpRequest();


        xhr.open("GET", "https://icanhazdadjoke.com/", true);
        xhr.setRequestHeader("Accept", "text/plain");

        xhr.onload = function () 
        {
            var joke = "Jokes on you! No joke found :(";

            
            if (xhr.status >= 200 && xhr.status < 300) {
                
                joke = xhr.responseText;
            } 
            
            appendSection(joke);
	    };
	    xhr.send();
    }

    $( "#showFortune" ).on( "click", function() {
        randomFortune(0);
        });
    
    $( "#submit" ).on( "click", function() {
        addName();
        });

    $( "#showNumber" ).on( "click", function() {
        randomNumber();
        });

    $( "#like" ).on( "click", function() {
        likeRandom();
        });

    $( "#clear" ).on( "click", function() {
        $("#favList").empty();
        });

    $( "#showLike" ).on( "click", function() {
        runEffect("#likedSection", {});
        });

    $( "#showAddName" ).on( "click", function() {
        runEffect("#addNameSection", {direction: "down"});
        });

    $( "#showGraph" ).on( "click", function() {
        runEffect("#graphSection", { direction: "right" });
        });
    
    $("#clearGraph").on("click", function(){
        clearGraph();
    });

    $("#showJoke").on("click", function(){
        getJoke();
    });

    
}

