$(document).ready(function() {
  //Start the page we want to display and load.
  Page.getPage();
});

var HTMLmaker = {
  aO : function(attribute){
    if(attribute == undefined){
      attribute = "";
    }
    return "<a" + attribute + ">";
  },
  aC : function(){
    return "</a>"
  },
  divO : function(attribute){
    if(attribute == undefined){
      attribute = "";
    }
    return "<div" + attribute + ">";
  },
  divC : function(){
    return "</div>"
  },
  IDMaker : function(IDName){
    return " id=\"" + IDName + "\"";
  },
  classMaker : function(className){
    return " class=\"" + className + "\"";
  },
  p : function(text){
    return "<p>" + text + "</p>";
  },
  aClass : function(insideA, className){
    return this.aO(this.classMaker(className)) + insideA + this.aC();
  },
  aID : function(insideA, IDName){
    return this.aO(this.IDMaker(IDName)) + insideA + this.aC();
  },
  comment : function(comment){
    return "<!-- " + comment + "-->";
  },
  divClass : function(insideDiv, className){
    return this.divO(this.classMaker(className)) + insideDiv + this.divC();
  },
  divID : function(insideDiv, IDName){
    return this.divO(this.IDMaker(IDName)) + insideDiv + this.divC();
  },
  div : function(insideDiv){
    return this.divO() + insideDiv + this.divC();
  },
  loadToolbar : function(addToToolbar){
    if(addToToolbar === undefined){
      addToToolbar = "";
    }
    var toolbar = this.divID(addToToolbar, "toolbar");
    $("#top-page").append(toolbar);
  },
  verticalSplit : function(left, right){
    return this.divClass(this.divClass(left, "vs-left") + this.divClass(right, "vs-right"), "vertical-split");
  },
  horizontalSplit : function(top, bottom){
    return this.divClass(this.divClass(top, "hs-top") + this.divClass(bottom, "hs-bottom"), "horizontal-split");
  },
  dropDownSelection : function(selections){
    return this.divClass(selections, "drop-down-selections");
  },
};

// -- Page --
var Page = {
  page : "",
  //Returns the Page object, acording to the path. If invalid or empty return menu
  getPage : function (destination) {
    var path = window.location.href.split('?')[1];
    if(path === undefined){
      path = "";
    } else {
      this.page = path;
    }
    if(destination === undefined){
      destination = "";
    } else {
      this.page = destination;
    }
    $("#page").empty();
    if(path === "heimahjalp" || destination === "heimahjalp" || this.page === "heimahjalp"){
      if(User.loggedIn()){
        return HomeHelp.display();
      } else {
        return User.display();
      }
    } else if(path === "hreifihjalp" || destination === "hreifihjalp" || this.page === "hreifihjalp"){
      return MoveHelp.display();
    } else if(path === "user" || destination === "user" || this.page === "user"){
      return User.display();
    } else {
      return Menu.display();
    }
  }
};

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
  //Returns name of Today
  getToday : function(){
    var date = new Date;
    return this.iceDays[date.getDay()];
  },
  //Returns Day of Week Day and month
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
  //Returns the number with 0 in front if it is below 10.
  addZero : function(num){
    if(num < 10){
      return "0" + num;
    } else {
      return "" + num;
    }
  },
  //Returns the date like social securaty number.
  getDayID : function(date){
    if(this.isDate(date)){
      var d = this.addZero(date.getDate());
      var m = this.addZero(date.getMonth() + 1);
      var y = (date.getYear() + 1900);
      return (d + m + y);
    } else {
      return date;
    }
  },
  //Retunrns start of week
  getStartOfWeek : function(date){
    if(this.isDate(date)){
      var dayOfWeek = date.getDay();
      if(dayOfWeek != 0){
        for(var i = dayOfWeek ; i > 0 ; i--){
        date = this.yesterday(date);
      }
    } 
    return date;
    }
  },
  //Retruns end of week
  getEndOfWeek : function(date){
    if(this.isDate(date)){
      var dayOfWeek = date.getDay();
      if(dayOfWeek != 6){
        for(var i = dayOfWeek ; i < 6 ; i++){
        date = this.tomorrow(date);
      }
    } 
    return date;
    }
  },
  //Returns the current week format monday-sunday 1-7. January or 31.01-06.02
  getWeek : function(date){
    if(this.isDate(date)){
      var day = new Date;
      var startOfWeek = this.getStartOfWeek(day);
      var endOfWeek = this.getEndOfWeek(day);
      var week = "";
      if(startOfWeek.getMonth() == this.addZero(endOfWeek.getMonth())){
        week = this.addZero(startOfWeek.getDate()) + "-" + this.addZero(endOfWeek.getDate()) + "." + this.iceMonths[endOfWeek.getMonth()];
      } else {
        var sow = this.addZero(startOfWeek.getDate()) + "." + this.addZero(startOfWeek.getMonth() + 1);
        var eow = this.addZero(endOfWeek.getDate()) + "." + this.addZero(endOfWeek.getMonth()) + 1;
        week = sow + " - " + eow;
      }
      return week;
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
  //Here we keep all the information about the user (when I say user, I don´t mean addict)
  USER : {
    //list of all the usernames
    name : ["Kambholl"],
    //list of unencrypted and very insecure passwords
    password : ["12345"],
    //when was this user last logged in
    lastLogin : ["Wed Apr 11 2018 13:07:57 GMT+0000 (Greenwich Standard Time)"],
    //for storing the ip address, witch I have no idea why, but might be useful later
    ip : 0,
    //returns the id of the user if he exists
    userExists : function(username){
      for(var i = 0 ; i < this.name.length ; i++){
        if(this.name[i] === username){
          //hooray we have a user,...!
          return i;
        }
      }
      //he did not exist,... poor bastard!
      return -1;
    },
    //should log the user in,... but untested so who knows?
    login : function(username, password){
      var id = this.userExists(username)
      if(id >= 0){
        //very good and secure way of handeling passwords!
        if(this.password[id] === password){
          this.lastLogin[id] = new Date;
          return id;
        }
      }
      //ooohhh,... sorry but your not going to be logged in!
      return -1;
    },
    //returns true if the user has logged in within the last hour
    loggedIn : function(id){
      var ONE_HOUR = 3600000; /* hour in milliseconds */
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
      dateID : ["09042019", "11042019", "12042019", "13042019", "14042019", "15042019", "16042019", "17042019", "18042019", "19042019", "20042019", "21042019", "22042019", "23042019", "24042019", "25042019", "26042019", "27042019", "28042019", "29042019", "30042019", "01052019"],
      dinnerPlans : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33]
    }]
  }
};

// --  Login Factor  --
var User = {
  user : {
    id : -1,
    name : "",
    ip: 00000
  },
  //Returns the user, or a empty one if not logged in.
  getUser : function(){
    return this.user;
  },
  //Append the login to the page
  display : function(){
    var loginMessage = "<div class=\"login-message\"><p>Velkominn!</p></div>";
    var loginUsername = "<div class=\"login-username\"><p>Notendanafn: <input type=\"text\" value=\"Kambholl\" class=\"username\"></p></div>";
    var loginPassword = "<div class=\"login-password\"><p>Lykilorð: <input type=\"text\" value=\"12345\" class=\"password\"></p></div>";
    var loginError = "<div><span class=\"login-error\"></span></div>";
    var loginSubmit = "<div class=\"login-submit\"><a class=\"loginButton\">Innskrá</a><a>Nýskrá</a></div>"
    var loginContainer = "<div class=\"login-container\">" + loginMessage + loginUsername + loginPassword + loginError + loginSubmit + "</div>";
    $("#page").append(loginContainer);
    $(".loginButton").on('click', function(e){
      //since he clicked the left arrow go back a day.
      var usr = document.getElementsByTagName("input")[0].value;
      var psw = document.getElementsByTagName("input")[1].value;
      if(User.login(usr, psw)){
        //user is logged in. Load the page he wants.
        Page.getPage();
      } else {
        $(".login-error").text("-- Notendanafn ekki til og/eða rangt lykilorð --");
      }
    });
  },
  //returns true if username and password is correct.
  login : function(username, password){
    var id = DATABASE.USER.login(username, password)
    if(id >= 0){

      this.user.id = id;
      this.user.name = DATABASE.USER.name[id];
      this.user.ip = 123456789;
      return true;
    } else {
      //User does not excist or password is incorrrect or both.
      return false;
    }
  },
  //Returns true if logged in
  loggedIn : function(){
    if(this.user.id >= 0){
      if(DATABASE.USER.loggedIn(this.user.id)){
        return true;
      }
    }
    return false;
  }
};

//Menu page object
var Menu = {
  display : function() {
    var heimahjalp = "<a class=\"heima-hjalp\">Heimahjalp</a>";
    var hreyfihjalp = "<a class=\"hreifi-hjalp\">Hreyfihjalp</a>";
    var googledocs = "<a href=\"https:\/\/docs.google.com/document/d/1Y13UHfQHlWZ8VoAYb-OfVyFA-VGcokouLb4m-34KQHk/edit#heading=h.q71z80o3nmah\">Codecskjalid</a>"
    $("#page").append("<div class=\"menu\">" + heimahjalp + hreyfihjalp + googledocs + "</div>");
    $(".heima-hjalp").on('click', function(e){
      //Load homehelp page
      Page.getPage("heimahjalp");
    });
    $(".hreifi-hjalp").on('click', function(e){
      //Load hreifihjalp page
      Page.getPage("hreifihjalp");
    });
  }
};

//Heimahjalp page object
var HomeHelp = {
  displayDay : "",
  displayDinner : -1,
  display : function() {
    //We need the username before setting up the page
    if(User.loggedIn()){
      //We have a username, put up heimahjalp page.

      //toolbar
      var empty = HTMLmaker.p(""); //this is to create nothing that will be replaced with backarrow to keep the format of page.
      var appName = HTMLmaker.p("Home Help"); //The name displayed in the middle of the toolbar.

      //Comments for the page
      var commenttop = HTMLmaker.comment("Buttons for meal organizing");
      var commentbottom = HTMLmaker.comment("Tells what day of the week");

      //buttons for the page
      var settings = HTMLmaker.aClass("", "settings"); //displays clickable settings logo
      var weekButton = HTMLmaker.aID("","week"); //displays Week and date of monday-sunday
      var BrowseButton = HTMLmaker.aID("","browse"); //displays dinner ideas for your planing
      var dayNameButton = HTMLmaker.aID("","dayName"); //displays the name of today
      var mealOfTodayButton = HTMLmaker.aID("","dinner"); //displays what was planned for todaysd
      var mealimg = HTMLmaker.aID("", "mealImg");

      //Page Layout
      HTMLmaker.loadToolbar(empty + appName + settings);
      var pageTopDiv = HTMLmaker.verticalSplit(weekButton, BrowseButton); //top is split Vertically
      var pageBottomDiv = HTMLmaker.dropDownSelection(dayNameButton + mealOfTodayButton + mealimg);
      var page = HTMLmaker.horizontalSplit(pageTopDiv, pageBottomDiv); //page is split horizontally

      var displayDay = new Date;

      $("#page").append(page);
      var audio = new Audio('./resource/audio/fart.wav');
      $("a.settings").on('click', function(e){
        audio.play();
        //since he clicked the settings button.
        //layout the settings page
        //append it to the page $("#page").append();
      });
      $("#week").on('click', function(e){
        //since he clicked the week button.
        var user = User.getUser(); //We need to get the ID of the User
        var day = Calendar.getStartOfWeek(displayDay); //Get the first day of the week (Sunday)
        var dayId = ""; //To save the dayId for the database
        var mealList = ""; //the list of items we want to append to the page
        //get each day of the the week.
        for(var i = 0 ; i < 7 ; i++){ 
          dayID = Calendar.getDayID(day); //save the dayID of each day of the week
          var dinnerIDforToday = -1;
          var dinner = "";
          //check if this user has food plans for the day
          for(var p = 0 ; p < DATABASE.HOMEHELP.USER[user.id].dateID.length ; p++){
            if(DATABASE.HOMEHELP.USER[user.id].dateID[p] === dayID){ //get dinners for the week
              //the user has a plan. then there is no need to continue searching.
              dinnerIDforToday = p;
              p = DATABASE.HOMEHELP.USER[user.id].dateID.length;
            }
          }
          if(dinnerIDforToday >= 0){ 
            //since he has a plan we can get the name of the dinner
            dinner = DATABASE.HOMEHELP.DINNER[DATABASE.HOMEHELP.USER[user.id].dinnerPlans[dinnerIDforToday]].name;
            //here we can get image, recipe and other stuff for the dinner also, later on <------------------------------------------
          } else {
            //no plans for the day
            dinner = "ekkert";
          }
          mealList = mealList + HTMLmaker.aClass(dinner, dayId);
          day = Calendar.tomorrow(day); //get the day after that day
        }
        console.log(mealList);
        //Clear the page
        $("#page").empty();
        //put in dropdown list and append it to the page 
        $("#page").append(HTMLmaker.dropDownSelection(mealList));
      });
      $("#browse").on('click', function(e){
        audio.play();
        //since he clicked the browse button.
        //show recipes and images for meals
        //append it to the page $("#page").append();
      });
      $("div.hs-bottom").on('click', function(e){
        audio.play();
        //since he clicked the any of the meal of today buttons.
        //show recipe and cooking method for the meal
        //append it to the page $("#page").append();
      });

      this.setDay(displayDay);

    } else {
        //display login screen, there was no user in the path and no user was logged in
        Page.getPage("heimahjalp");
    }
  },
  //gets a date and changes accoringly.
  setDay : function(date) {
    //check newDate if it is a date!
    if(Calendar.isDate(date) && User.loggedIn()){
      //save the date for the arrows.
      displayDay = date;
      //get the day ID (looks like a social securaty number).
      var dayID = Calendar.getDayID(date);
      //we need to set these incase we dont have food plans.
      var dinnerIDforToday = -1;
      var dinner = "";
      var user = User.getUser();
      //check if this user has food plans for the day
      for(var i = 0 ; i < DATABASE.HOMEHELP.USER[user.id].dateID.length ; i++){
        if(DATABASE.HOMEHELP.USER[user.id].dateID[i] === dayID){
          //the user has a plan. then there is no need to continue searching.
          dinnerIDforToday = i;
          i = DATABASE.HOMEHELP.USER[user.id].dateID.length;
        }
      }
      if(dinnerIDforToday >= 0){
        //since he has a plan we can get the name of the dinner
        dinner = DATABASE.HOMEHELP.DINNER[DATABASE.HOMEHELP.USER[user.id].dinnerPlans[dinnerIDforToday]].name;
        //here we can get image, recipe and other stuff for the dinner also, later on <------------------------------------------
      }
      //we change the text on the page, if there was no plan the string will be empty
      $("#dinner").text(dinner);
      $("#browse").text("skoða rétti");
      $("#week").text("Vikan " + Calendar.getWeek(date));
      $("#dayName").text(Calendar.getToday());
      
    } else {
      //the date test failed, or the user is not lodeg in.
      $("#date").text("Error: date value for setDay was not a date (" + date + "), or user was not logged in!");
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


      //Old page before change, keep for alittle time!
      /*Page.loadToolbar("<p id=\"date\">");
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
      } 
      
      var audio = new Audio('./resource/audio/beep.wav');
      audio.play();

      <span class="mealimg"><img src="./resource/image/food/pizza.jpg"></span>
      var leftArrow = "<div class=\"arrow\"><p>&#8249;</p></div>";
      var rightArrow = "<div class=\"arrow\"><p>&#8250;</p></div>";
      var dagskra = "<div class=\"dagskra\">" + leftArrow + " day " + rightArrow + "</div>";
      var divO = "<div>";
      var divC = "</div>"
      var dagskra = divO + "" + divC;
      */

