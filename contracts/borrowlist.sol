pragma solidity ^0.4.11;
contract borrowlist {
	address[] public borrows;
    
    function addborrow(address _address) public returns(uint) {
        borrows.length++;
        borrows[borrows.length-1]= _address;
        
        return borrows.length;
    }
    function getborrowsCount() public constant returns(uint) {
        return borrows.length;
    }

    function getborrow(uint index) public constant returns(address) {
        return borrows[index];
    }
}