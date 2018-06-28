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
    $.getJSON('signup.json',function(data){
      var AdotionArtifacts= data;
      App.contracts.signup = TruffleContract(AdotionArtifacts);

      App.contracts.signup.setProvider(App.web3Provider);

     
    });

    $.getJSON('TokenList.json',function(data){
      var AdotionArtifacts= data;
      App.contracts.TokenList = TruffleContract(AdotionArtifacts);

      App.contracts.TokenList.setProvider(App.web3Provider);


 });
  },

  handleAdopt: function(event) {
    //alert(document.getElementById("name").value);
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    //alert("2");
    var phone = parseInt(document.getElementById("phone_number").value);
    //var picture = document.getElementById("picture").value;
    var pass = document.getElementById("psw").value;
    var pass2 = document.getElementById("psw-repeat").value;
   

      document.getElementById("name").value="";
      document.getElementById("email").value="";
      document.getElementById("phone_number").value="";
      document.getElementById("psw").value="";
      document.getElementById("psw-repeat").value="";
     
      web3.eth.getAccounts(function(error,accounts){
      if(error)
      {
        console.log(error);
      }

      var account = accounts[0];
      var deployedContract = 0;

       App.contracts.TokenList.defaults({
        from: account,
        gas: 4712388,
        gasPrice: 100000000000
      })

      App.contracts.TokenList.deployed().then(function(instance){

        console.log(web3.eth.accounts[0]);
        console.log(instance.address,{"from": account});

        App.contracts.signup.new(name,email,pass,phone,10,web3.eth.accounts[0],instance.address,{"from": account}).then(function(deployedContract){

          console.log("signup successful");

    
     


  function createCORSRequest(method, url) {
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
  var a = Math.floor((Math.random() * 10)); 
  console.log(web3.eth.accounts[0]);
  var params = "wal="+web3.eth.accounts[0]+"&name="+name+"&email="+email+"&phone="+phone+"&password="+pass;
  var xhr = createCORSRequest('GET', "http://10.21.229.201/p2p/create_user.php?" + params);
  console.log("reached here");
  if (!xhr) {

    throw new Error('CORS not supported');
  }
  xhr.send();
        //  alert("Tickets added successfully.");
        //  window.open("login.html","_self");



        });
      });
   }); 
}
};

$(function() {
  $(window).load(function() {
    App.init();
  });


  document.getElementById("signupbtn").onclick = function () {

    console.log("signed up");
      //  location.href = "home.html";
        App.handleAdopt();
    
    // document.getElementById('signupbtn').style.visibility = 'hidden';
    };
    document.getElementById("cancelbtn").onclick = function () {

        location.href = "home.html";

    };
});
