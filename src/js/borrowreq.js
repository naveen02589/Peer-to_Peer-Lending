App = {
  web3Provider: null,
  contracts: {},
  //admin :"0x7f5c034f90336199f3b31ed74f1c9056b3eaacc5",

  init: function() {
    
    

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
    $.getJSON('borrowlist.json',function(data){
      var AdotionArtifacts= data;
      App.contracts.borrowlist = TruffleContract(AdotionArtifacts);

      App.contracts.borrowlist.setProvider(App.web3Provider);
	// alert("initContract");

      //return App.markAdopted();
    });

    $.getJSON('borrow.json',function(data){
      var AdotionArtifacts= data;
      App.contracts.borrow = TruffleContract(AdotionArtifacts);

      App.contracts.borrow.setProvider(App.web3Provider);
	// alert("initContract 1");

      return App.markAdopted();
    });

   // return App.bindEvents();
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
    //alert(1);
   
  },

  markAdopted: function() {
    var adoptionInstance;
    var adoptionInstance1;
   
    App.getCoinbasePromise()
    .then(function(fromAddress){
      document.getElementById('fromAddress').value = fromAddress;
    })
    .catch(function(err){
      alert(err);
    });
    web3.eth.getAccounts(function(error,accounts){
      //alert(admin.toLowerCase()); 
       });
     
   
    App.contracts.borrowlist.deployed().then(function(instance){
        adoptionInstance=instance;
        adoptionInstance1=instance;
        // alert(2);
        var borrowCount=0;
        var j=0;
        var k=0;
        adoptionInstance.getborrowsCount().then(function(res){
                
            borrowCount = parseInt(res.toString());
            var petsRow = $('#petsRow');
                      
            // alert(movieCount);
            for(i=0;i<borrowCount;i++)
            {
            
              adoptionInstance1.getborrow(i).then(function(addr){
                  // alert(window.petsCount);
                  // alert(addr.toString());
                  var instance2 = App.contracts.borrow.at(addr.toString());
                  instance2.getborrow().then(function(ab){
                     // alert(ab[7].toString()); 
                      var petTemplate = $('#petTemplate');

                
                      petTemplate.find('.amt').text(ab[0].toString());
                      petTemplate.find('.roi').text(ab[1].toString());
                      petTemplate.find('.rt').text(ab[2].toString());
                      
                      if(web3.eth.accounts[0]!=undefined)
                      {
                        if(k==0)
                        {
                          petsRow.empty();
                          petsRow.append(petTemplate.html());
                          k++;
                        }
                        else
                          petsRow.append(petTemplate.html());
                      }
                  });
                 
                  
              });
            
            } 
                       
            });
          
          
        
    });
    
  },



};

$(function() {
  $(window).load(function() {
    App.init();
  });
  });
 