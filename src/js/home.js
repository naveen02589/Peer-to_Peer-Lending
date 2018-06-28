var k=0;
App = {
  web3Provider: null,
  contracts: {},
  //k:0,
  init: function() {
    console.log("123");
      //var k=0;

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
	//alert("initContract 1");
        return App.pageload();
    });

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
   // console.log("123");
    $(document).on('click', '.lend', App.lendbtn);
    $(document).on('click', '.borrow', App.borrowbtn);
    $(document).on('click','.stake',App.borrowstake);
  
   // $(document).on('click', '.btn-tickets', App.bookedTickets);
  },

//alert("dsafa");
lendbtn: function() {
    if(k==1) {
          window.open('lend.html', '_blank');
    }
    else {
      alert("provide your wallet address in metamask");
    }

},
borrowbtn: function() {
  if(k==1) {
          window.open('borrow.html', '_blank');
    }
    else {
      alert("provide your wallet address in metamask");
    }
},
borrowstake:function() {
  if(k==1){
    window.open('stake.html','_blank');
  }
  else
  alert("provide your wallet address in metamask");

},
  pageload:function(){
 var adoptionInstance;
    var adoptionInstance1;
//alert("aaaa");
    App.getCoinbasePromise()
    .then(function(fromAddress){
      //document.getElementById('fromAddress').value = fromAddress;
    })
    .catch(function(err){
      alert(err);
    });
    web3.eth.getAccounts(function(error,accounts){
 
  
    App.contracts.TokenList.deployed().then(function(instance){
        adoptionInstance=instance;
        adoptionInstance1=instance;
        adoptionInstance.getTokensCount().then(function(res){
         movieCount = parseInt(res.toString());
          for(i=0;i<movieCount;i++)
            {
            //var k=0;
              adoptionInstance1.getToken(i).then(function(addr){
                  // alert(window.petsCount);
                  // alert(addr.toString());
                  var instance2 = App.contracts.signup.at(addr.toString());
                  instance2.getuser().then(function(ab){
                      //console.log(web3.eth.accounts[0]);
                     // console.log(ab);
                     
                     if(web3.eth.accounts[0]==ab[2])
                      {
                        console.log(ab);
                        document.getElementById("name1").innerHTML=ab[0];
                        document.getElementById("email1").innerHTML=ab[1];
                        document.getElementById("cs").innerHTML=ab[3];
                        k=1;
                                console.log("b"+Date.now());

                        //break;
                      }

                  });
  
              });
              if(k==1)
              {
                console.log("a"+Date.now());
                break;
              }
            }
            });
        });  

     });
        
        return App.bindEvents();

},




};


$(function() {
  $(window).load(function() {
    App.init();
  });
});