var ChatBotService = (function(){
  
    /**
      * Configures the Chatbot service.
    */
    function getChatbotService() {
      var PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC91J7AGC13arkK\n/9G1M7x/QperMrSn7YxroQiqIhIP9aVBxZQttlP2hr7UY5Xf2+xCRuF1YQg4A9Uf\n2+4zse+3MMsSPfNBwzvqK84NNk+VjAhwPWiNbx3K3gtUsLOKHrGeduHgSIe/RHGT\nh3+imka7qVnMVG6uqKr4zQG4K5F2fBaLHMHNu/vIG03sz5gqikDk9IyIGM8z0TJV\n/qqqa1Fb68QAwMYjFk17Xn7ZDIOdkc1WvtCiu4WDoErepOYvT8oi0EoJ5xsg12jq\niXoo0kE3XxKkvWp7jKzSNFm6vP0DXL1Q/QTp1+Yzqd0LKCizdiEg+HrPboVKJWVt\nxdf0dWBxAgMBAAECggEACpXRSR4EBYZcBYfusz1sfbZqd415F0raz1rcPUPveMg6\naAau4MZrq8nXWOepcSFd3RN/oZRowVpd21Qfxg5OUxtPfI+7qXtr8y6wg4o3cXvs\nsckL1CSpvzDm5fjhNxLHdeIUTfXPa4ADGw5VhL04c+ERcMBVyGufdoaUeacEykvw\nFGZx6sXIs4STtYc13UxbXuhYZEtKgGzvyL5B9ZnZ4Rlg3tcNnDtXEizbF7tdpPJD\nVsK253a/AMK/GMwjJOhZfgjPO+4KBDHAKggFqooL1bT82d1HFhGttAGnmt108/XN\n4H6gfsHv9m5ygzOT91/VxdkbvkIR6OPyv6UJ+cKTYQKBgQDpK8sj2XkbbI/+zdqv\nB9zwNZowD9eaxR0Ly+a2Mq0syshDuoCVurIE7M18PXCjXe8JpB2sWnn6R/Uej7Ps\nHGN2M6LoCXdJIR/0aClfSLKbcl1lj9Fzn7dZi7qv2Fme7qMHd2y/NrqtsrfH6fPH\nsSiAMzrlnTId9xYmS+cqblazIQKBgQDQaoncCjMbmax9LVBuobjtdJ8MRcUCLC9g\n/4qRQytDWFbYyGCZrPr2EL/vVURCMbXyifTNfjmNMa1zc6CwPHSgBMjdrLAvJsYR\nAvXBwaq2rrY8J8mM6EZ1GgvMCr4P9QSJf880rkfqPjyA3iQjFiaMAn9SfW/AwvJX\nKq0cs5NTUQKBgGEwnOLbggx5SugFfBKa72+8mAFSiSb85GeHXSoyo1ZZS/JXKcO/\nZvaAkgIoRewCemGFY8z0hYVaOwS7F17iUl7xlQSs9WipAv3H8P7DeZcrq1xq/v33\n49/SS0WCo5CInbG+CLkHIfbG2K3eiXuCD4SoVfNhe4Nb+4KI/tkD1uWhAoGBAIKe\n4vwHYHSh4ZsqdUiBDxeziaL1bz2nV6JhRgU4pbq1eOiw3Oozoa3qXYCwXfFmmnQB\nxm2r+IHnap/7DfCmUymfFgzomBtVH7m1szTWHhoUcZ5OCWHIibAGvPIKoYf6tfc/\nJSwNNoE2tFDH6LocvdfuEMIwX4PeKmg7FPfyDBmhAoGAYQFC/fFPry5OPcnckOXx\nNcCyWgPriMXjCfRfeiXTE0lTEHosCSHwMDU5pVsZliZHLA0vLQe2G9y8bj+TUGFq\nsR3AMKTkmKssof2RoOLHcDUpkIs50+ikOxwZrFaKWbLcCBdxeXMWDgBr9cwkXOgs\n63PVKofrw3pIGHu/7A6e1n4=\n-----END PRIVATE KEY-----\n';
      var CLIENT_EMAIL = 'coffee-shop-638ff@appspot.gserviceaccount.com';
      
      return OAuth2.createService('MyChatBot')
      // Set the endpoint URL.
      .setTokenUrl('https://accounts.google.com/o/oauth2/token')
      
      // Set the private key and issuer.
      .setPrivateKey(PRIVATE_KEY)
      .setIssuer(CLIENT_EMAIL)
      
      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getScriptProperties())
      
      // Set the scope. This must match one of the scopes configured during the
      // setup of domain-wide delegation.
      .setScope('https://www.googleapis.com/auth/chat.bot');
    }
  
    /**
   * Creates a card-formatted response.
   * @param {object} widgets the UI components to send
   * @return {object} JSON-formatted response
   */
  function createCardResponse(widgets) {
    return {
      cards: [{
        sections: [{
          widgets: widgets
        }]
      }]
    };
  }

  return {
    sendMessage: function(spaceId, message){
      var service = getChatbotService();
      if (service.hasAccess()) {
        var url = 'https://chat.googleapis.com/v1/spaces';
        var url = 'https://chat.googleapis.com/v1/spaces/'+spaceId+'/messages';    
        
        var widgets = [{
          "textParagraph": {
              text: message
            }
          }];
        var cardMessage = createCardResponse(widgets);

        var options = {
          method : 'POST',
          contentType: 'application/json',
          headers: {
            Authorization: 'Bearer ' + service.getAccessToken()
          },
          payload : JSON.stringify(cardMessage)
        }
        
        //We send message to the DM room
        var response = UrlFetchApp.fetch(url, options);
        return response.getContentText(); 
        
      } else {
        console.log(service.getLastError());
        return service.getLastError();
      }
    }
  }
})();
