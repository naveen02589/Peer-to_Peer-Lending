pragma solidity ^0.4.11;
import "contracts/TokenList.sol";
import "zeppelin-solidity/contracts/token/StandardToken.sol";

contract signup is StandardToken{
	
    string public name = 'MovieName';
    string public email = 'Sym';
	string public password = '0';
	uint public phone=0;
	address public userwal;
	string public wallet = "wal";
	uint public credit_score = 10;
	address[] holders;

	function signup(string _name1,string _email1,string _password1,uint _phone1, uint _cs,string _wallet, address _userwal1) public {
		
  		name = _name1;
  		email= _email1;
  		password= _password1;
  		phone= _phone1;
  		wallet= _wallet;
  		TokenList tok = TokenList(_userwal1);
		credit_score = _cs;
		balances[msg.sender]=credit_score;
  		tok.addToken(this);
	}
	function improvescore() public {
		 credit_score=credit_score+10;
	}
	function getowner() public  constant returns(address){
		return msg.sender;
	}
	function getscore() public constant returns(uint){
		return balances[msg.sender];
	}


	function getuser() public constant returns(string, string, string, uint) {
		
		return(name, email,wallet,credit_score);//,balances[owner],picture,location,price,movieType,showTime,now);
		
	}
}
