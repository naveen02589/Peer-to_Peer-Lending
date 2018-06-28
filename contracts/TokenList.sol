pragma solidity ^0.4.11;
contract TokenList {
	address[] public tokens;
    
    function addToken(address _address) public returns(uint) {
        tokens.length++;
        tokens[tokens.length-1]= _address;
        
        return tokens.length;
    }
    function getTokensCount() public constant returns(uint) {
        return tokens.length;
    }

    function getToken(uint index) public constant returns(address) {
        return tokens[index];
    }
}