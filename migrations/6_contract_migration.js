var borrowlist = artifacts.require("./borrowlist.sol");

module.exports = function(deployer){
	deployer.deploy(borrowlist);
}
