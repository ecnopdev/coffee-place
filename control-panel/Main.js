FirebaseService.init();

function doGet(e) {

  return HtmlService
      .createTemplateFromFile('index')
      .evaluate()
      .setHeight(30)
      .setTitle("SPHTech Day Coffee Place")
      .addMetaTag("viewport","width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui");
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function serveOrder(payload) {
  FirebaseService.updateData('nowServing/'+payload.spaceId,payload);
  FirebaseService.removeData('new/'+payload.spaceId);

  return {
    status:200,
    message:"Order was served successfully"
  };
} 

function completeOrder(payload) {
  FirebaseService.removeData('nowServing/'+payload.spaceId);
  FirebaseService.updateData('doneServing/'+payload.spaceId,payload);

  return {
    status:200,
    message:"Order was completed"
  };
}

function returnToQueue(payload) {
  FirebaseService.removeData('nowServing/'+payload.spaceId);
  FirebaseService.updateData('new/'+payload.spaceId,payload);

  return {
    status:200,
    message:"Order was returned to queue"
  };  
}

function sendMessageToUser(spaceId,message){
  return ChatBotService.sendMessage(spaceId,message);
}



function validateSpaceId(){

}

function populateTestData(){
  var spaceId = "5ltwEgAAAAE";
  var timestamp = new Date();
  var newOrder = {
    orderInfo:{
      drink: "Hot Chocolate",
      queueNum:1,
      timestamp:timestamp.getTime()
    },
    spaceId:spaceId,
    userInfo:{
      avatarUrl:"https://lh3.googleusercontent.com/a-/AAuE7mBgGsoVUVXfEblHkt_eYkLEd5noT1rjbYxy3YUfvQ",
      displayName:"KSS Jose Mari Ponce",
      email: "kssjmpv1@sph.com.sg",
      name: "users/102483854431126509275",
      type: "HUMAN"
    }
  }

  for(var i=1; i<100; i++){
    var curSpaceId = spaceId + i;
    newOrder.spaceId = curSpaceId;
    newOrder.orderInfo.queueNum = i;
    FirebaseService.updateData("new/" + curSpaceId,newOrder);
  }


}
