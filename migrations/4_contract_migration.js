var lend = artifacts.require("./lend.sol");

module.exports = function(deployer){
	deployer.deploy(lend);
}
