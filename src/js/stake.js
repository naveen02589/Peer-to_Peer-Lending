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
      $.getJSON('TokenList.json',function(data){
        var AdotionArtifacts= data;
        App.contracts.TokenList = TruffleContract(AdotionArtifacts);
  
        App.contracts.TokenList.setProvider(App.web3Provider);
      // alert("initContract");
  
        //return App.markAdopted();
      });
  
      $.getJSON('signup.json',function(data){
        var AdotionArtifacts= data;
        App.contracts.signup = TruffleContract(AdotionArtifacts);
  
        App.contracts.signup.setProvider(App.web3Provider);
      // alert("initContract 1");
  
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
      //alert(1);
      $(document).on('click','.btn-stake',App.stake);
     
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
       
     
      App.contracts.TokenList.deployed().then(function(instance){
          adoptionInstance=instance;
          adoptionInstance1=instance;
          console.log(instance.address);
          // alert(2);
          var movieCount=0;
          var j=0;
          var k=0;
          adoptionInstance.getTokensCount().then(function(res){
                  
              movieCount = parseInt(res.toString());
              var petsRow = $('#petsRow');
                        
              // alert(movieCount);
              for(i=0;i<movieCount;i++)
              {
              
                adoptionInstance1.getToken(i).then(function(addr){
                    // alert(window.petsCount);
                    // alert(addr.toString());
                    var instance2 = App.contracts.signup.at(addr.toString());
                    console.log("hi2");
                    instance2.getuser().then(function(ab){
                       // alert(ab[7].toString()); 
                        var petTemplate = $('#petTemplate');
                       console.log(ab);
                       console.log('hi');
                        petTemplate.find('.name').text(ab[0].toString());
                        petTemplate.find('.email').text(ab[1].toString());
                        petTemplate.find('.wallet').text(ab[2].toString());
                        petTemplate.find('.creditscore').text(ab[3].toString());
                         petTemplate.find('.btn-stake').text('stake').attr('disabled',false);
                      petTemplate.find('.btn-stake').attr('data-id', j);
                      petTemplate.find('.btn-stake').attr('data-name', addr.toString());
                        
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
    stake:function(event) {
        var i = parseInt($(event.target).data('id'));
        var addr = $(event.target).data('name');
        console.log(addr);
          console.log("hi4");
            web3.eth.getAccounts(function(error,accounts) {
             App.contracts.TokenList.deployed().then(function( instance) {
                adoptionInstance1=instance;
                var contract=App.contracts.signup.at(addr);
                console.log("hi3");
                
                contract.improvescore();
                
             });

        });
       
    },
  
  
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
    });
   