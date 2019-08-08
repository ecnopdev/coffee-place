var Helpers = (function() {
  
    var getRandomInt = function(max) {
      return Math.floor((Math.random() * Math.floor(max))) + 10;
    }
    
    var getToday = function(hours, minutes){
       var date = new Date();
       date.setUTCHours(hours, minutes, 0, 0);
       return date;
    }
    
    var getTomorrow = function(hours, minutes){
        var date = getToday(hours, minutes);
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
        return date;
    }
    
    return {
      generateUniqueID: function() {
        var dtToday = new Date();
        var newRandNum = getRandomInt(89);
        var timeStamp = dtToday.getTime().toString().substr(7);
        var newID = dtToday.getFullYear() + timeStamp + newRandNum; 
        return newID; 
      },
      today: getToday,
      tomorrow: getTomorrow,
      convertDateToEpoch: function(dateObject){
        if(dateObject !== null && dateObject !== undefined && dateObject !== ''){
          return dateObject.getTime()/1000.0;
        }else{ 
          return '';
        }  
      },
      convertEpochToDate: function(dateObject){
        if(dateObject !== null && dateObject !== undefined && dateObject !== ''){
          return dateObject.getTime()/1000.0;
        }else{ 
          return '';
        }  
      },
     include: function (fileName){
         return HtmlService.createHtmlOutputFromFile(fileName).getContent();
     }
    }
    
  })();