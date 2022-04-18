const Web3 = require("web3");

const stakerAbi = require("./abi.json");
const tokenAbi = require("./tokenAbi.json");
const poolAbi = require("./poolAbi.json");


let web3;

const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/287af69fca9142f3b1681a93ce4c3afa"
);
web3 = new Web3(provider);

async function getSUPERdata(address) {
  const stakerAddress = "0xf35A92585CeEE7251388e14F268D9065F5206207";

  const stakerInstance = new web3.eth.Contract(stakerAbi, stakerAddress);
  const LPToken = await stakerInstance.methods.poolTokens(0).call();
  const tokenInstance = new web3.eth.Contract(tokenAbi, LPToken);
  const decimals = await tokenInstance.methods.decimals().call();
  const symbol = await tokenInstance.methods.symbol().call();

  let userInfo = await stakerInstance.methods.userInfo(LPToken, address).call();
  let balance = userInfo.amount;

  balance = (balance / 10 ** decimals).toFixed(2);

  if(balance!=0)
  console.log("balance:", balance, symbol);
}


async function getPoolData(address) {
  const stakerAddress = "0xf35A92585CeEE7251388e14F268D9065F5206207";

  const stakerInstance = new web3.eth.Contract(stakerAbi, stakerAddress);
  const LPToken = await stakerInstance.methods.poolTokens(1).call();
  const poolInstance = new web3.eth.Contract(poolAbi, LPToken);
  let totalSupplyLp = await poolInstance.methods.totalSupply().call();
  const LPdecimals = await poolInstance.methods.decimals().call();
  let tokenReserve=await poolInstance.methods.getReserves().call()

  let userInfo = await stakerInstance.methods.userInfo(LPToken, address).call();
  let LptokensReceived = userInfo.amount;
  let rewards=await stakerInstance.methods.getPendingTokens(LPToken,address).call();

  var token0 = await poolInstance.methods.token0().call();
  var token1 = await poolInstance.methods.token1().call();

  //////////////for first token/////////////////////
  const token0contract = new web3.eth.Contract(tokenAbi, token0);
  var Symbol0 = await token0contract.methods.symbol().call();
  var Decimal0 = await token0contract.methods.decimals().call();
  totalSupplyLp= totalSupplyLp / 10 ** Decimal0;
  var token0Reserve = tokenReserve[0];
  token0Reserve = token0Reserve / 10 ** Decimal0;
  LptokensReceived = LptokensReceived / 10 ** Decimal0;
  var token0amount = (LptokensReceived / totalSupplyLp) * token0Reserve;
  token0amount = token0amount.toFixed(2);

  /////////////// for second token//////////////////////////////////////////////
  const token1contract = new web3.eth.Contract(tokenAbi, token1);
  var Symbol1 = await token1contract.methods.symbol().call();
  var Decimal1 = await token1contract.methods.decimals().call();
  var totalSupplytoken1 = totalSupplyLp / 10 ** Decimal1;
  var token1Reserve = tokenReserve[1] / 10 ** Decimal1;
  var LptokensReceivedtoken1 = LptokensReceived / 10 ** Decimal1;
  var token1amount =
    (LptokensReceivedtoken1 / totalSupplytoken1) * token1Reserve;
  token1amount = token1amount.toFixed(2);
  if ((token0amount != 0, token1amount != 0)){
    console.log(Symbol0, "+", Symbol1, token0amount, "+", token1amount);
    console.log('rewards:',(rewards/10**Decimal1).toFixed(2))
  }
}

async function getINJdata(address){
  const stakerAddress = "0x8e586D927acE36a3ef7bDDF9f899d2E385d5Fc9b";

  const stakerInstance = new web3.eth.Contract(stakerAbi, stakerAddress);
  const LPToken = await stakerInstance.methods.poolTokens(0).call();
  const tokenInstance = new web3.eth.Contract(tokenAbi, LPToken);
  const decimals = await tokenInstance.methods.decimals().call();
  const symbol = await tokenInstance.methods.symbol().call();

  let userInfo = await stakerInstance.methods.userInfo(LPToken, address).call();
  let balance = userInfo.amount;

  balance = (balance / 10 ** decimals).toFixed(2);

  if(balance!=0)
  console.log("balance:", balance, symbol);

}

async function getREVVdata(address){
  const stakerAddress = "0xb3EA98747440aDDC6A262735E71B5A5cB29edd80";

  const stakerInstance = new web3.eth.Contract(stakerAbi, stakerAddress);
  const LPToken = await stakerInstance.methods.poolTokens(0).call();
  const tokenInstance = new web3.eth.Contract(tokenAbi, LPToken);
  const decimals = await tokenInstance.methods.decimals().call();
  const symbol = await tokenInstance.methods.symbol().call();

  let userInfo = await stakerInstance.methods.userInfo(LPToken, address).call();
  let balance = userInfo.amount;

  balance = (balance / 10 ** decimals).toFixed(2);

  if(balance!=0)
  console.log("balance:", balance, symbol);

}

// let address = readline.question("enter address:");
let address="0x6d16c0252acd30a24c2625f60635cad0ed3f713a";
getSUPERdata(address);
getPoolData(address);
getINJdata(address);
getREVVdata(address);
