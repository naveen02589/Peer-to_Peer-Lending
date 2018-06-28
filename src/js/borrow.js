App = {
  web3Provider: null,
  contracts: {},

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
    $.getJSON('borrow.json',function(data){
      var AdotionArtifacts= data;
      App.contracts.MovieToken = TruffleContract(AdotionArtifacts);

      App.contracts.MovieToken.setProvider(App.web3Provider);

     
    });

    $.getJSON('borrowlist.json',function(data){
      var AdotionArtifacts= data;
      App.contracts.TokenList = TruffleContract(AdotionArtifacts);

      App.contracts.TokenList.setProvider(App.web3Provider);

     
    });
  },

  
 

  handlecreate: function(event) {
    //alert(document.getElementById("name").value);
    var amt = document.getElementById("amt").value;
    var roi = document.getElementById("roi").value;
    //alert("2");
    var rt = parseInt(document.getElementById("rt").value);
    
    var adoptionInstance;

    web3.eth.getAccounts(function(error,accounts){
      if(error)
      {
        console.log(error);
      }

      var account = accounts[0];
      var deployedContract = 0;
      alert("borrow request will be created once you confirm the Metamask transaction.");
      document.getElementById("amt").value="";
      document.getElementById("roi").value="";
    //alert("2");
      document.getElementById("rt").value="";
      
      App.contracts.TokenList.deployed().then(function(instance){
        App.contracts.MovieToken.new(amt,roi,rt,instance.address,{"from": account}).then(function(deployedContract){
          console.log("hello");
          alert("borrow request created");
          window.open("myborrowreq.html","_self");
       
        });
      });
      

    });

  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
  document.getElementById("create").onclick = function () {
       App.handlecreate();
       //location.href = "index.html";
    };
    document.getElementById("cancel").onclick = function () {
       document.getElementById("amt").value="";
       document.getElementById("roi").value="";
       document.getElementById("rt").value="";

       //App.handleAdopt();
      // location.href = "borrow.html";
    };
});
