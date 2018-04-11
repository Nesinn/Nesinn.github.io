$(document).ready(function() {
  //Get the page we want to display and load.
  var page = getPage();

  //Append the page to the site
  page.display();


  /*  No more in use, start again!
  //Start the page on today.
  setDay(date);
  startClock();

  //-- Start with displaying the menu.
  display();

  //if user clicks Menu button.
  $("#Menu").click(function(){
    //since he clicked the menu, display the menu.
    display("Menu");
  });
  */
});

//Menu page object
var Menu = {
  display : function() {
    var heimahjalp = "<a href=\"https://nesinn.github.io/?heimahjalp\">Heimahjalp</a>";
    var hreyfihjalp = "<a href=\"https://nesinn.github.io/?hreifihjalp\">Hreyfihjalp</a>";
    var googledocs = "<a href=\"https:\/\/docs.google.com/document/d/1Y13UHfQHlWZ8VoAYb-OfVyFA-VGcokouLb4m-34KQHk/edit#heading=h.q71z80o3nmah\">Codecskjalid</a>"
    $("#page").append("<div class=\"menu\">" + heimahjalp + hreyfihjalp + googledocs + "</div>");
  }
};

//Heimahjalp page object
var HomeHelp = {
  display : function() {
    //Put up heimahjalp page.
    $("#page").append("<div class=\"dagskra\"><div class=\"arrow\"><p>&#8249;</p></div><div id=\"calendar\"><div class=\"day\"><p>Morgunmatur:<span class=\"breakfast\"></span></p><p>Nesti:<span class=\"lunchbox\"></span></p><p>Kv&ouml;ldmatur:<span class=\"dinner\"></span></p><p>Verkefni:<span class=\"project\"></span></p></div></div><div class=\"arrow\"><p>&#8250;</p></div></div>");
    //if user clicks arrow, we need to change the date.
    $("div.arrow:first").on('click', function(e){
      //since he clicked the left arrow go back a day.
      yesterday();
    });
    $("div.arrow:last").on('click', function(e){
      //since he clicked the right arrow go ahead a day.
      tomorrow();
    });
    startClock();
    setDay(new Date);
  }
};

var MoveHelp = {
  display : function() {
    $("#page").append("<a href=\"#\" class=\"klukk\"><span id=\"timer\">Start Klukk</span></a>");
      $("a.klukk").on('click', function(e){
        //Start/stop the excersise clock
        beatTimer();
      });
  }
};

//Returns the Page object, acording to the path. If invalid or empty return menu
function getPage() {
  var path = window.location.href.split('?')[1];
  if(path === undefined){
    return Menu;
  } else if(path === "heimahjalp"){
    return HomeHelp;
  } else if(path === "hreifihjalp"){
    return MoveHelp;
  } else {
    return Menu;
  }
}

// --  Login Factor  --
var loggedIn = true;

// Check browser support
if (typeof(Storage) !== "undefined") {
    // Store
    //localStorage.setItem("lastname", "Smith");
    // Retrieve
    //$(".result").text(localStorage.getItem("lastname"));
} else {
    //$(".result").text("Sorry, your browser does not support Web Storage...")
}


// Klukk
function startClock() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  if(m < 10) {
    m = "0" + m;
  }
  if(s < 10) {
    s = "0" + s;
  }
  sec = s;
  $("#clock").text(h + ":" + m + ":" + s);
  var t = setTimeout(startClock, 500);
};

var clock = false;
var sec = 0;
var startTime = 60;
var play = true;
var fastTime = 11;
var slowTime = 7;
var speed = true;

function countDown() {
  if(clock) {
    if(speed){
      var running = (startTime - sec) % fastTime;
    } else {
      var running = (startTime - sec) % slowTime;
    }
    $("#timer").text(running);
    if(running === 0) {
      if(play){
        play = false;
        var audio = new Audio('./resource/audio/beep.wav');
        audio.play();
        speed = !speed;
      } else {
        play = true;
      }
    }
    var repeat = setTimeout(countDown, 500);
  }
}

function beatTimer() {
  //start clock if off else stop clock
  if(clock) {
    //clock is on, we need to stop it.
    clock = false;
    $("#timer").text("Start Klukk");
  } else {
    //clock is off, we need to start it.
    clock = true;
    countDown();
  }
}


// --  Everything Belonging to Calendar and date below here  --

//this is today date.
var date = new Date();

//Names of the months in Icelandic
var iceMonths = ["Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Juní", "Julí", "Ágúst", "September", "Október", "Nóvember", "Desember"];

//Names of the Days in Icelandic
var iceDays = ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimtudagur", "Föstudagur", "Laugardagur"];

// When user clicks back arrow, change date to the day before.
function yesterday() {
  if(date.getDate() === 1) {
    //First day of the month, so yesterday would be previous month.
    if(date.getMonth() === 0) {
      //if its January we need to change the year.
      return setDay(new Date(date.getYear() + 1899, 12, 0));
    } else {
      //it's not January, so only change month.
      return setDay(new Date(date.getYear() + 1900, date.getMonth(), 0));
    }
  } else {
    //it's not the first day of the month.
    return setDay(new Date(date.getYear() + 1900, date.getMonth(), date.getDate() - 1));
  }
}

// When user clicks front arrow, change date to the day after.
function tomorrow() {
  //if its the last day of the month, change month
  if(date.getDate() === 0) {
    //if the month is Desember, also change the year
    if(date.getMonth() === 12) {
      return setDay(new Date(date.getYear() + 1901, 1, 1));
    } else {
      //last day of the month, but not Desember
      return setDay(new Date(date.getYear() + 1900, date.getMonth() + 1, 1));
    }
  } else {
    //not the last day of the month.
    return setDay(new Date(date.getYear() + 1900, date.getMonth(), date.getDate() + 1));
  }
}

//gets a date and changes accoringly.
function setDay(newDate) {
  //check newDate if it is a date!
  date = newDate;
  $("#date").text(iceDays[date.getDay()] + " " + date.getDate() + ". " + iceMonths[date.getMonth()]);
  return;
}
