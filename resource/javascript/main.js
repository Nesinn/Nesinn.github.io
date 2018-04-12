$(document).ready(function() {
  //Get the page we want to display and load.
  var page = getPage();
  //Append the page to the site
  page.display();
});

// -- Calendar --
var Calendar = {
  //Names of the months in Icelandic
  iceMonths : ["Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Juní", "Julí", "Ágúst", "September", "Október", "Nóvember", "Desember"],
  //Names of the Days in Icelandic
  iceDays : ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimtudagur", "Föstudagur", "Laugardagur"],
  //Returns true if the input date is a date
  isDate : function(date){
    return (date instanceof Date);
  },
  //Ruturns Day of Week Day og month and month
  getDayMdayMonth : function(newDate){
    return this.iceDays[newDate.getDay()] + " " + newDate.getDate() + ". " + this.iceMonths[newDate.getMonth()];
  },
  //Returns hour:min:sec of NOW
  getClock : function(){
    var today = new Date();
    var h = today.getHours();
    var m = addZero(today.getMinutes());
    var s = addZero(today.getSeconds());
    return (h + ":" + m + ":" + s);
  },
  //Returns the number with 0 if it´s below 10.
  addZero : function(num){
    if(num < 10){
      return "0" + num;
    } else {
      return "" + num;
    }
  },
  getDayID : function(date){
    if(this.isDate(date)){
      var d = "" + date.getDate();
      var m = this.addZero(date.getMonth() + 1);
      var y = this.addZero(date.getYear() + 1900);
      return (d + m + y);
    } else {
      return date;
    }
  },
  // returns the day before given date.
  yesterday : function(date) {
    if(this.isDate(date)){
      if(date.getDate() === 1) {
        //First day of the month, so yesterday would be previous month.
        if(date.getMonth() === 0) {
          //if its January we need to change the year.
          return (new Date(date.getYear() + 1899, 12, 0));
        } else {
          //it's not January, so only change month.
          return (new Date(date.getYear() + 1900, date.getMonth(), 0));
        }
      } else {
        //it's not the first day of the month.
        return (new Date(date.getYear() + 1900, date.getMonth(), date.getDate() - 1));
      }
    } else {
      return date;
    }
  },
  // returns the day after given date.
  tomorrow : function(date) {
    if(this.isDate(date)){
      //if its the last day of the month, change month
      if(date.getDate() === 0) {
        //if the month is Desember, also change the year
        if(date.getMonth() === 12) {
          return (new Date(date.getYear() + 1901, 1, 1));
        } else {
          //last day of the month, but not Desember
          return (new Date(date.getYear() + 1900, date.getMonth() + 1, 1));
        }
      } else {
        //not the last day of the month.
        return (new Date(date.getYear() + 1900, date.getMonth(), date.getDate() + 1));
      }
    } else {
      return date;
    }
  }
};

// -- Data Base --
var DATABASE = {
  USER : {
    name : ["Kambholl"],
    password : ["12345"],
    lastLogin : ["Wed Apr 11 2018 13:07:57 GMT+0000 (Greenwich Standard Time)"],
    ip : 0,
    userExists : function(username){
      for(var i = 0 ; i < this.name.length ; i++){
        if(this.name[i] === username){
          return i;
        }
      }
      return -1;
    },
    login : function(username, password){
      var id = this.userExists(username)
      if(id >= 0){
        if(this.password[id] === password){
          return id;
        }
      }
      return -1;
    },
    loggedIn : function(id){
    var ONE_HOUR = 3600000; /* ms */
    if((new Date - this.lastLogin[id]) < ONE_HOUR){
      return true;
    } else {
      return false;
    }
  }
  },
  HOMEHELP : {
    SHOPPINGLISTITEMS : {
      mainIngrediant : ["Fiskur", "Kjúklingur", "Kjöt", "Pasta"],
      vegetables : ["kál", "gúrka", "tómatar", "laukur", "papríka", "karteflur"],
      sauce : ["tómatsósa", "sinnep", "kokteilsósa", "köld bernessósa", "piparsósa", "hvítlaukssósa"],
      spice : ["rasp", "kjúklingakridd", "Aromat"],
      sideDish : ["franskar"],
      bathroomItems : ["tannkrem", "klósettpappír", "Sturtusápa", "Handsápa"]
    },
    DINNER : [{ name : "Kjúklingaréttur", ingredients : []},
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
    USER: [{
      startDate: "Wed Apr 11 2018 13:07:57 GMT+0000 (Greenwich Standard Time)",
      dateID : ["13042018", "14042018", "15042018", "16042018", "17042018"],
      dinnerPlans : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33]
    }]
  }
};

// --  Login Factor  --
var User = {
  id : 0,
  name : "",
  ip : 0,
  homeHelpValues : [{
    startDate: Date,
    dinnerPlans: []
  }],
  login : function(username, password){
    var id =DATABASE.USER.login(username, password)
    if(id >= 0){
      DATABASE.USER.lastLogin[this.id] = new Date;
      this.id = id;
      this.name = DATABASE.USER.name[id];
      this.ip = 123456789;
      this.homeHelpValues.startDate = DATABASE.USER.homeHelpValues.startDate[id];
      this.homeHelpValues.dinnerPlans = DATABASE.USER.homeHelpValues.dinnerPlans[id];
    } else {
      //display error message. wrong usernmae / password
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
  userID : -1,
  //displayDay : "",
  displayDinner : -1,
  display : function() {
    //We need the username before setting up the page
    var username = window.location.href.split('?')[2];
    if(username === undefined){
      //display create new user window, there was no user in the path
    } else {
      //since we have a username we need userID
      userID = DATABASE.USER.userExists(username);
      if(userID <= 0){
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
          HomeHelp.setDay(Calendar.yesterday(displayDay));
        });
        $("div.arrow:last").on('click', function(e){
          //since he clicked the right arrow go ahead a day.
          HomeHelp.setDay(Calendar.tomorrow(displayDay));
        });
        displayDay = new Date;
        this.setDay(displayDay);
      } else {
        //user does not exist
      }
    }
  },
  //gets a date and changes accoringly.
  setDay : function(date) {
    //check newDate if it is a date!
    if(Calendar.isDate(date)){
      //save the date for the arrows.
      displayDay = date;
      //get the day ID (looks like a social securaty number).
      var dayID = Calendar.getDayID(date);
      //we need to set these incase we dont have food plans.
      var dinnerIDforToday = -1;
      var dinner = "";
      //check if this user has food plans for the day
      for(var i = 0 ; i < DATABASE.HOMEHELP.USER[userID].dateID.length ; i++){
        if(DATABASE.HOMEHELP.USER[userID].dateID[i] === dayID){
          //the user has a plan. then there is no need to continue searching.
          dinnerIDforToday = i;
          i = DATABASE.HOMEHELP.USER[userID].dateID.length;
        }
      }
      if(dinnerIDforToday >= 0){
        //since he has a plan we can get the name of the dinner
        dinner = DATABASE.HOMEHELP.DINNER[DATABASE.HOMEHELP.USER[userID].dinnerPlans[dinnerIDforToday]].name;
      }
      //we change the text on the page, if there was no plan the string will be empty
      $(".dinner").text(dinner);
      $("#date").text(Calendar.getDayMdayMonth(date));
    } else {
      //the date test failed!
      $("#date").text("Error: date value for setDay was not a date (" + date + ")");
    }
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
};

/*
// Check browser support
if (typeof(Storage) !== "undefined") {
    // Store
    //localStorage.setItem("lastname", "Smith");
    // Retrieve
    //$(".result").text(localStorage.getItem("lastname"));
} else {
    //$(".result").text("Sorry, your browser does not support Web Storage...")
}
*/
/*
// Klukk
function startClock() {
  $("#clock").text(Calendar.getClock());
  var t = setTimeout(startClock, 500);
};

var clock = false;
var sec = 0;
var startTime = 60;
var play = true;
var fastTime = 11;
var slowTime = 7;
var speed = true;
*/

/*
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
*/
