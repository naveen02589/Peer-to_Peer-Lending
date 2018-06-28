pragma solidity ^0.4.11;
import 'contracts/borrowlist.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract borrow is StandardToken{
	
	uint public amount = 0;
	uint public roi = 0;
	uint public rt = 0;
	address[] holders;

	function borrow(uint _amt, uint _roi,uint _rt, address _userwal1) public {
		
  		amount = _amt;
  		roi= _roi;
  		rt= _rt;
  		
  		borrowlist tok = borrowlist(_userwal1);
  		tok.addborrow(this);
	}

		function getborrow() public constant returns(uint, uint, uint) {
		
			return(amount, roi,rt);//,balances[owner],picture,location,price,movieType,showTime,now);
		
	}
}
