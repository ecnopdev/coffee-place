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


function oneOffSetting() { 
  var file = DriveApp.getFilesByName('coffee-shop-638ff-260e883e6c4e.json').next();
  // used by all using this script
  var propertyStore = PropertiesService.getScriptProperties();
  // service account for our Dialogflow agent
  cGoa.GoaApp.setPackage (propertyStore , 
    cGoa.GoaApp.createServiceAccount (DriveApp , {
      packageName: 'dialogflow_serviceaccount',
      fileId: file.getId(),
      scopes : cGoa.GoaApp.scopesGoogleExpand (['cloud-platform']),
      service:'google_service'
    }));
}

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

function sendMessageToUser(spaceId,message){
  return ChatBotService.sendMessage(spaceId,message);
}

