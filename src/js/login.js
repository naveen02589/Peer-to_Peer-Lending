App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
 
    return App.initWeb3();
  },

  initWeb3: function() {
   if(typeof web3 !== 'undefined')
    {
      App.web3Provider = web3.currentProvider;
    }
    else
    {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();

  },

  initContract: function() {
    
     $.getJSON('lend.json',function(data){
      var AdotionArtifacts= data;
      App.contracts.TokenList = TruffleContract(AdotionArtifacts);

      App.contracts.TokenList.setProvider(App.web3Provider);

    });

    $.getJSON('borrow.json',function(data){
      var AdotionArtifacts= data;
      App.contracts.MovieToken = TruffleContract(AdotionArtifacts);

      App.contracts.MovieToken.setProvider(App.web3Provider);

      return App.markAdopted();
    });

    $.getJSON('stake.json',function(data){
      var AdotionArtifacts= data;
      App.contracts.MovieToken = TruffleContract(AdotionArtifacts);

      App.contracts.MovieToken.setProvider(App.web3Provider);

      return App.markAdopted();
    });


    return App.bindEvents();
  },

  getCoinbasePromise: function(){
  return new Promise(function(resolve, reject){
    web3.eth.getCoinbase(function(err, res){
      if (!res) {
        reject("No accounts found. Please login in your metamask account before proceeding.");
      } else {
        resolve(res);
      }
    });
  });
},

  bindEvents: function() {
    $(document).on('click', '.login', App.handlelogin);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },

  handlelogin: function(event) {
    event.preventDefault();

       /* App.getCoinbasePromise()
    .then(function(fromAddress){
      document.getElementById('fromAddress').value = fromAddress;
    })
    .catch(function(err){
      alert(err);
    });*/
    web3.eth.getAccounts(function(error,accounts){
      //alert(admin.toLowerCase());
     
      alert(web3.eth.accounts[0]);
      var email = document.getElementById("email");
      var pswd = document.getElementById("pswd");

      
             /*   function createCORSRequest(method, url) {
                  var xhr = new XMLHttpRequest();
                  if ("withCredentials" in xhr) {
                    xhr.open(method, url, true);
                  } else if (typeof XDomainRequest != "undefined") {
                    xhr = new XDomainRequest();
                    xhr.open(method, url);
                  } else {
                    xhr = null;
                  }
                  return xhr;
                }

                var params = "&wallet="+web3.eth.accounts[0];
                //var params = "&wal=ab"+"&name=ab"+"&email=ab"+"&phone=1234567890"+"&password=ab";
               // alert(params);
                var xhr = createCORSRequest('GET', "http://10.21.229.201/p2p/get_user.php?"+params);
                if (!xhr) {
                  throw new Error('CORS not supported');
                }
                          
                xhr.send();
                xhr.onload = function() {
                            var text = xhr.responseText;
                            
                            alert('Response from CORS request to ');// + url + ': ' + text);
                          };

                          xhr.onerror = function(e) {
                            alert("Error Status: " + e.target.status);
                        };*/
 var params = "&wallet="+web3.eth.accounts[0];
                        function getCORS(url, success) {
                        var xhr = new XMLHttpRequest();
                        if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
                        xhr.open('GET', url);
                        xhr.onload = success;
                        xhr.send();
                        return xhr;
                    }

                    // example request
                    getCORS("http://10.21.229.201/p2p/get_user.php?"+params, function(request){
                        var response = request.currentTarget.response || request.target.responseText;
                        alert(response);
                        var obj = JSON.parse(response);
                        alert(obj.email);
                    });
               

    });

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});







