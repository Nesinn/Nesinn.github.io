$(document).ready(function() {
  //Get the page we want to display and load.
  var page = getPage();

  //Append the page to the site
  page.display();
});

// --  Login Factor  --
var User = {
  name : "Kambhóll",
  password : "12345",
  lastLogin : Date,
  ip : 0,
  login : function(){
    this.lastLogin = new Date;
    this.ip = 123456789;
  },
  loggedIn : function(){
    var ONE_HOUR = 3600000; /* ms */
    if(this.ip === 123456789 && ((new Date) - this.lastLogin) < ONE_HOUR){
      return true;
    } else {
      return false;
    }
  }
};

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
    var leftArrow = "<div class=\"arrow\"><p>&#8249;</p></div>";
    var rightArrow = "<div class=\"arrow\"><p>&#8250;</p></div>";
    var breakfast = "<p>Morgunmatur: <span class=\"breakfast\"></span></p>";
    var lunchbox = "<p>Nesti :<span class=\"lunchbox\"></span></p>";
    var dinner = "<p>Kv&ouml;ldmatur: <span class=\"dinner\"></span></p>";
    var project = "<p>Verkefni: <span class=\"project\"></span></p>";
    var day = "<div class=\"day\">" + breakfast + lunchbox + dinner + project + "</div>";
    var dagskra = "<div class=\"dagskra\">" + leftArrow + day + rightArrow + "</div>";
    $("#page").append(dagskra);
    //if user clicks arrow, we need to change the date.
    $("div.arrow:first").on('click', function(e){
      //since he clicked the left arrow go back a day.
      yesterday();
    });
    $("div.arrow:last").on('click', function(e){
      //since he clicked the right arrow go ahead a day.
      tomorrow();
    });
    setDay(new Date);
    this.setDinner(new Date);
  },
  shoppingListItems : {
    mainIngrediant : ["Fiskur", "Kjúklingur", "Kjöt", "Pasta"],
    vegetables : ["kál", "gúrka", "tómatar", "laukur", "papríka", "karteflur"],
    sauce : ["tómatsósa", "sinnep", "kokteilsósa", "köld bernessósa", "piparsósa", "hvítlaukssósa"],
    spice : ["rasp", "kjúklingakridd", "Aromat"],
    sideDish : ["franskar"],
    bathroomItems : ["tannkrem", "klósettpappír", "Sturtusápa", "Handsápa"]
  },
  dinner : [{ name : "Kjúklingaréttur", ingredients : []},
            { name : "Makkarónuréttur", ingredients : []},
            { name : "Soðin Fiskur", ingredients : []},
            { name : "Samlokur", ingredients : []},
            { name : "Tortilla", ingredients : []},
            { name : "Svínahnakkar", ingredients : []},
            { name : "Kjúklingabitar", ingredients : []},
            { name : "Bjúga", ingredients : []},
            { name : "Lasagnette", ingredients : []},
            { name : "Fiskur í Karrý", ingredients : []},
            { name : "Píta", ingredients : []},
            { name : "Pylsur og kjúklingur í pylsubrauði", ingredients : []},
            { name : "Grillkjöt", ingredients : []},
            { name : "Gordon Blu", ingredients : []},
            { name : "Gúllas og pasta", ingredients : []},
            { name : "Kjötbollur", ingredients : []},
            { name : "Kjúklingapasta", ingredients : []},
            { name : "Langtbrauð", ingredients : []},
            { name : "Gúllas og hrísgrjón", ingredients : []},
            { name : "Skyr", ingredients : []},
            { name : "Hakk og spagettí", ingredients : []},
            { name : "Ofnafisk réttur", ingredients : []},
            { name : "Naggar", ingredients : []},
            { name : "Pizza", ingredients : []},
            { name : "Hakkbollur", ingredients : []},
            { name : "Tikamasala Kjúklingaréttur", ingredients : []},
            { name : "Medisterpylsa og spagetti", ingredients : []},
            { name : "Steiktur Fiskur í raspi", ingredients : []},
            { name : "Slátur", ingredients : []},
            { name : "Mjólkurgrautur", ingredients : []},
            { name : "Súpa og brauð", ingredients : []},
            { name : "Hamborgarar", ingredients : []},
            { name : "Læri", ingredients : []},
            { name : "Bæjonesskinka", ingredients : []},
          ],
  date : {
    name : "",
    date : "",
    dinner : ""
  },
  setDinner : function(date){
    $(".dinner").append(this.dinner[0].name);
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
