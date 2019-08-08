var APP_SHEET_ID = "1ujfp9HOlDKKtXWcXi9zpj4bOr11bqSfNQwnz_UTHMII";
var Setup = "setup";
var APPS = "nominations";
var AWARDS = "awards";
var RES = "best story query";
//var RESPONSE = 'best story response';
var RESPONSE = 'response';
var Vote = [];
var FINAL_FORM_MARKUP = "";
var ss = SpreadsheetApp.openById(APP_SHEET_ID);
var userProperties = PropertiesService.getUserProperties();
var category = "Story of the Month";

var FINAL_STATS_MARKUP = "";
var FINAL_CHART_MARKUP = "";
var FINAL_TABLE_MARKUP = "";
var FINAL_DATE_MARKUP = "";


  var firebaseUrl = "https://dev-ntof.firebaseio.com/"; 
  var secret = "eLEwdq64g8Fr91hu5tf4TAHb0Ef8Mnwla0CrnPpA";
  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl, secret);


function doGet(e) {
  return HtmlService
      .createTemplateFromFile('index')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);  
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function getStats(){
  var curStatsMarkup = "";
  var curStatsMarkup1 = "";
  var curStatsMarkup2 = "";
  var resultMarkup = "";
  
 var mydata =  base.getData("Stats/Queue");
  for(var i in mydata) {
          var email = mydata[i];
          if(email){
//          var email = mydata[i].emailAddress;
            if(email.emailAddress == 'quekch@sph.com.sg'){
              Logger.log(email.emailAddress + " : " + email.qNo);
              
               curStatsMarkup = '<div class="w3-quarter"><div class="w3-container w3-red w3-text-white w3-padding-16">';
               curStatsMarkup += '<div class="w3-left"><i class="fas fa-ticket-alt w3-xxxlarge"></i></div>';
               curStatsMarkup += '<div class="w3-right w3-padding w3-jumbo">'+email.qNo+'';
               curStatsMarkup += '</div><div class="w3-clear"></div><h4> My Queue Number </h4>';
               curStatsMarkup += '</div></div>';
               
            }
          }
  }
  
  for( var i=1; i<=3; i++) {
      var data =  base.getData("Stats/" + i);
          var Title = data.Title;
          var Icon = data.Icon;
          var Count = data.Count;
          var Color = data.Color;

          Logger.log(i + " : " + data.Title + " : " + Count);
          
            curStatsMarkup1 = '<div class="w3-quarter"><div class="w3-container w3-'+Color+' w3-text-white w3-padding-16">';
            curStatsMarkup1 += '<div class="w3-left"><i class="'+Icon+'"></i></div>';
            curStatsMarkup1 += '<div class="w3-right w3-padding w3-jumbo">'+Count+'';
            curStatsMarkup1 += '</div><div class="w3-clear"></div><h4>'+Title+'</h4>';
            curStatsMarkup1 += '</div></div>';

        resultMarkup += curStatsMarkup1; 
  }
    FINAL_STATS_MARKUP = curStatsMarkup + resultMarkup;
}


function getStatsTemplates(){
     getStats();
     return FINAL_STATS_MARKUP;   
}

