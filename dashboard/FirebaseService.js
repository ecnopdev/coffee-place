var FirebaseService = (function() {
  
    var db = null;
    
    return {
      init: function(){
        var baseUrl = "https://coffee-shop-638ff.firebaseio.com/";
        var secret = "GAgrkqqO1Oz1LldK7kmCTFGQ67OAKouPql1wn8zk";
        db = FirebaseApp.getDatabaseByUrl(baseUrl,secret);
      },
      pushData: function(path,data){
        db.pushData(path,data);
      },
      getData: function(path){
        return db.getData(path);
      },
      updateData: function(path,data){
        db.updateData(path,data);
      },
      removeData: function(path){
        db.removeData(path);
      }
    }
    
  })();
  