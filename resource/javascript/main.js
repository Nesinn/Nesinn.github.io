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
      path = "heimahjalp";
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
  //Each year contains months and weeks with starting date and end date
  year : [
  { start: 0, 
    end: 364, 
    month: [
      {start: 0, end: 30},
      {start: 31, end: 58},
      {start: 59, end: 89},
      {start: 90, end: 119},
      {start: 120, end: 150},
      {start: 151, end: 180},
      {start: 181, end: 211},
      {start: 212, end: 242},
      {start: 243, end: 272},
      {start: 273, end: 303},
      {start: 304, end: 333},
      {start: 334, end: 364}
    ], 
    week: [
      {start: 0, end: 5},
      {start: 6, end: 12},
      {start: 13, end: 19},
      {start: 20, end: 26},
      {start: 27, end: 33},
      {start: 34, end: 40},
      {start: 41, end: 47},
      {start: 48, end: 54},
      {start: 55, end: 61},
      {start: 62, end: 68},
      {start: 69, end: 75},
      {start: 76, end: 82},
      {start: 83, end: 89},
      {start: 90, end: 96},
      {start: 97, end: 103},
      {start: 104, end: 110},
      {start: 111, end: 117},
      {start: 118, end: 124},
      {start: 125, end: 131},
      {start: 132, end: 138},
      {start: 139, end: 145},
      {start: 146, end: 152},
      {start: 153, end: 159},
      {start: 160, end: 166},
      {start: 167, end: 173},
      {start: 174, end: 180},
      {start: 181, end: 187},
      {start: 188, end: 194},
      {start: 195, end: 201},
      {start: 202, end: 208},
      {start: 209, end: 215},
      {start: 216, end: 222},
      {start: 223, end: 229},
      {start: 230, end: 236},
      {start: 237, end: 243},
      {start: 244, end: 250},
      {start: 251, end: 257},
      {start: 258, end: 264},
      {start: 265, end: 271},
      {start: 272, end: 278},
      {start: 279, end: 285},
      {start: 286, end: 292},
      {start: 293, end: 299},
      {start: 300, end: 306},
      {start: 307, end: 313},
      {start: 314, end: 320},
      {start: 321, end: 327},
      {start: 328, end: 334},
      {start: 335, end: 341},
      {start: 342, end: 348},
      {start: 349, end: 355},
      {start: 356, end: 362}
    ]
  },
  { start: 365, 
    end: 730, 
    month: [
      {start: 365, end: 395},
      {start: 396, end: 424},
      {start: 425, end: 455},
      {start: 456, end: 485},
      {start: 486, end: 516},
      {start: 517, end: 546},
      {start: 547, end: 577},
      {start: 578, end: 608},
      {start: 609, end: 638},
      {start: 639, end: 669},
      {start: 670, end: 699},
      {start: 700, end: 730}
    ], 
    week: [
      {start: 363, end: 369},
      {start: 370, end: 376},
      {start: 377, end: 383},
      {start: 384, end: 390},
      {start: 391, end: 397},
      {start: 398, end: 404},
      {start: 405, end: 411},
      {start: 412, end: 418},
      {start: 419, end: 425},
      {start: 426, end: 432},
      {start: 433, end: 439},
      {start: 440, end: 446},
      {start: 447, end: 453},
      {start: 454, end: 460},
      {start: 461, end: 467},
      {start: 468, end: 474},
      {start: 475, end: 481},
      {start: 482, end: 488},
      {start: 489, end: 495},
      {start: 496, end: 502},
      {start: 503, end: 509},
      {start: 510, end: 516},
      {start: 517, end: 523},
      {start: 524, end: 530},
      {start: 531, end: 537},
      {start: 538, end: 544},
      {start: 545, end: 551},
      {start: 552, end: 558},
      {start: 559, end: 565},
      {start: 566, end: 572},
      {start: 573, end: 579},
      {start: 580, end: 586},
      {start: 587, end: 593},
      {start: 594, end: 600},
      {start: 601, end: 607},
      {start: 608, end: 614},
      {start: 615, end: 621},
      {start: 622, end: 628},
      {start: 629, end: 635},
      {start: 636, end: 642},
      {start: 643, end: 649},
      {start: 650, end: 656},
      {start: 657, end: 663},
      {start: 664, end: 670},
      {start: 671, end: 677},
      {start: 678, end: 684},
      {start: 685, end: 691},
      {start: 692, end: 698},
      {start: 699, end: 705},
      {start: 706, end: 712},
      {start: 713, end: 719},
      {start: 720, end: 726},
      {start: 727, end: 733}
    ]
  },
  { start: 731, 
    end: 1095, 
    month: [
      {start: 731, end: 761},
      {start: 762, end: 789},
      {start: 790, end: 820},
      {start: 821, end: 850},
      {start: 851, end: 881},
      {start: 882, end: 911},
      {start: 912, end: 942},
      {start: 943, end: 973},
      {start: 974, end: 1003},
      {start: 1004, end: 1034},
      {start: 1035, end: 1064},
      {start: 1065, end: 1095}
    ], 
    week: [
      {start: 734, end: 740},
      {start: 741, end: 747},
      {start: 748, end: 754},
      {start: 755, end: 761},
      {start: 762, end: 768},
      {start: 769, end: 775},
      {start: 776, end: 782},
      {start: 783, end: 789},
      {start: 790, end: 796},
      {start: 797, end: 803},
      {start: 804, end: 810},
      {start: 811, end: 817},
      {start: 818, end: 824},
      {start: 825, end: 831},
      {start: 832, end: 838},
      {start: 839, end: 845},
      {start: 846, end: 852},
      {start: 853, end: 859},
      {start: 860, end: 866},
      {start: 867, end: 873},
      {start: 874, end: 880},
      {start: 881, end: 887},
      {start: 888, end: 894},
      {start: 895, end: 901},
      {start: 902, end: 908},
      {start: 909, end: 915},
      {start: 916, end: 922},
      {start: 923, end: 929},
      {start: 930, end: 936},
      {start: 937, end: 943},
      {start: 944, end: 950},
      {start: 951, end: 957},
      {start: 958, end: 964},
      {start: 965, end: 971},
      {start: 972, end: 978},
      {start: 979, end: 985},
      {start: 986, end: 992},
      {start: 993, end: 999},
      {start: 1000, end: 1006},
      {start: 1007, end: 1013},
      {start: 1014, end: 1020},
      {start: 1021, end: 1027},
      {start: 1028, end: 1034},
      {start: 1035, end: 1041},
      {start: 1042, end: 1048},
      {start: 1049, end: 1055},
      {start: 1056, end: 1062},
      {start: 1063, end: 1069},
      {start: 1070, end: 1076},
      {start: 1077, end: 1083},
      {start: 1084, end: 1090},
      {start: 1091, end: 1097}
    ]
  },
  { start: 1096, 
    end: 1460, 
    month: [
      {start: 1096, end: 1126},
      {start: 1127, end: 1154},
      {start: 1155, end: 1185},
      {start: 1186, end: 1215},
      {start: 1216, end: 1246},
      {start: 1247, end: 1276},
      {start: 1277, end: 1307},
      {start: 1308, end: 1338},
      {start: 1339, end: 1368},
      {start: 1369, end: 1399},
      {start: 1400, end: 1429},
      {start: 1430, end: 1460}
    ], 
    week: [
      {start: 1098, end: 1104},
      {start: 1112, end: 1118},
      {start: 1119, end: 1125},
      {start: 1126, end: 1132},
      {start: 1133, end: 1139},
      {start: 1140, end: 1146},
      {start: 1147, end: 1153},
      {start: 1154, end: 1160},
      {start: 1161, end: 1167},
      {start: 1168, end: 1174},
      {start: 1175, end: 1181},
      {start: 1182, end: 1188},
      {start: 1189, end: 1195},
      {start: 1196, end: 1202},
      {start: 1203, end: 1209},
      {start: 1210, end: 1216},
      {start: 1217, end: 1223},
      {start: 1224, end: 1230},
      {start: 1231, end: 1237},
      {start: 1238, end: 1244},
      {start: 1245, end: 1251},
      {start: 1252, end: 1258},
      {start: 1259, end: 1265},
      {start: 1266, end: 1272},
      {start: 1273, end: 1279},
      {start: 1280, end: 1286},
      {start: 1287, end: 1293},
      {start: 1294, end: 1300},
      {start: 1301, end: 1307},
      {start: 1308, end: 1314},
      {start: 1315, end: 1321},
      {start: 1322, end: 1328},
      {start: 1329, end: 1335},
      {start: 1336, end: 1342},
      {start: 1343, end: 1349},
      {start: 1350, end: 1356},
      {start: 1357, end: 1363},
      {start: 1364, end: 1370},
      {start: 1371, end: 1377},
      {start: 1378, end: 1384},
      {start: 1385, end: 1391},
      {start: 1392, end: 1398},
      {start: 1399, end: 1405},
      {start: 1406, end: 1412},
      {start: 1413, end: 1419},
      {start: 1420, end: 1426},
      {start: 1427, end: 1433},
      {start: 1434, end: 1440},
      {start: 1441, end: 1447},
      {start: 1448, end: 1454},
      {start: 1455, end: 1461}
    ]
  },
  { start: 1461, 
    end: 1825, 
    month: [
      {start: 1461, end: 1491},
      {start: 1492, end: 1519},
      {start: 1520, end: 1550},
      {start: 1551, end: 1580},
      {start: 1581, end: 1611},
      {start: 1612, end: 1641},
      {start: 1642, end: 1672},
      {start: 1673, end: 1703},
      {start: 1704, end: 1733},
      {start: 1734, end: 1764},
      {start: 1765, end: 1794},
      {start: 1795, end: 1825}
    ], 
    week: [
      {start: 1462, end: 1468},
      {start: 1469, end: 1475},
      {start: 1483, end: 1489},
      {start: 1490, end: 1496},
      {start: 1497, end: 1503},
      {start: 1504, end: 1510},
      {start: 1511, end: 1517},
      {start: 1518, end: 1524},
      {start: 1525, end: 1531},
      {start: 1532, end: 1538},
      {start: 1539, end: 1545},
      {start: 1546, end: 1552},
      {start: 1553, end: 1559},
      {start: 1560, end: 1566},
      {start: 1567, end: 1573},
      {start: 1574, end: 1580},
      {start: 1581, end: 1587},
      {start: 1588, end: 1594},
      {start: 1595, end: 1601},
      {start: 1602, end: 1608},
      {start: 1609, end: 1615},
      {start: 1616, end: 1622},
      {start: 1623, end: 1629},
      {start: 1630, end: 1636},
      {start: 1637, end: 1643},
      {start: 1644, end: 1650},
      {start: 1651, end: 1657},
      {start: 1658, end: 1664},
      {start: 1665, end: 1671},
      {start: 1672, end: 1678},
      {start: 1679, end: 1685},
      {start: 1686, end: 1692},
      {start: 1693, end: 1699},
      {start: 1700, end: 1706},
      {start: 1707, end: 1713},
      {start: 1714, end: 1720},
      {start: 1721, end: 1727},
      {start: 1728, end: 1734},
      {start: 1735, end: 1741},
      {start: 1742, end: 1748},
      {start: 1749, end: 1755},
      {start: 1756, end: 1762},
      {start: 1763, end: 1769},
      {start: 1770, end: 1776},
      {start: 1777, end: 1783},
      {start: 1784, end: 1790},
      {start: 1791, end: 1797},
      {start: 1798, end: 1804},
      {start: 1805, end: 1811},
      {start: 1812, end: 1818}
    ]
  }],
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
        var eow = this.addZero(endOfWeek.getDate()) + "." + this.addZero(endOfWeek.getMonth() + 1);
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
  },
  loadDays : function(){
    var dayPlans = [];
    var date = new Date(2019, 0, 1);
    for(var d = date.getDay() ; d <= 1825 ; d++){
      //add the day to the infinite days array
      dayPlans.push({
        date : this.addZero(date.getDate()), 
        dayOfWeek : d, 
        month : date.getMonth(), 
        year: date.getYear() + 1900,
        plans: {}
      });
      date = Calendar.tomorrow(date);
    }
    return dayPlans;
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
      startDate: 179,
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
      var settings = HTMLmaker.aClass("", "settings"); //displays clickable settings logo
      HTMLmaker.loadToolbar(empty + appName + settings);

      //Comments for the page
      var commenttop = HTMLmaker.comment("Buttons for meal organizing");
      var commentbottom = HTMLmaker.comment("Tells what day of the week");

      //buttons for the page
      var weekButton = HTMLmaker.aID("","week"); //displays Week and date of monday-sunday
      var BrowseButton = HTMLmaker.aID("","browse"); //displays dinner ideas for your planing
      var dayNameButton = HTMLmaker.aID("","dayName"); //displays the name of today
      var mealOfTodayButton = HTMLmaker.aID("","dinner"); //displays what was planned for todaysd
      var mealimg = HTMLmaker.aID("", "mealImg");

      //Page Layout
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
        //toolbar
        $("#top-page").empty();
        var backArrow = HTMLmaker.aClass("", "back-arrow"); //backarrow to go back to main page.
        var location = HTMLmaker.p("Vikan"); //The name displayed in the middle of the toolbar.
        var settings = HTMLmaker.aClass("", "settings"); //displays clickable settings logo
        HTMLmaker.loadToolbar(backArrow + location + settings);
        $("a.back-arrow").on('click', function(e){
          Page.getPage("heimahjalp");
        });

        //since he clicked the week button.
        var user = User.getUser(); //We need to get the ID of the User
        var today = Calendar.getDayID(displayDay);//get the id of today for css preferences
        var day = Calendar.getStartOfWeek(displayDay); //Get the first day of the week (Sunday)
        var dayID = ""; //To save the dayId for the database
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
          if(dayID == today){ //make to day a special color
            var mealOfToday = HTMLmaker.aClass(Calendar.iceDays[i] + ": " + dinner, "today");
            mealList = mealList + mealOfToday;
          } else {
            mealList = mealList + HTMLmaker.aClass(Calendar.iceDays[i] + ": " + dinner, dayID);
          }
          day = Calendar.tomorrow(day); //get the day after that day
        }
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

