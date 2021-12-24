const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const provider = waffle.provider;

// an async function.
describe("Wallet contract", function () {


  let Wallet;
  let wallet;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let provider;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Wallet = await ethers.getContractFactory("Wallet");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    wallet = await Wallet.deploy();
  });

  describe("Funding", function () {
    it("Funds can be sent to the contract and balance updated.", async function(){
      // Send 1 ether to an ens name.
      const tx = await addr1.sendTransaction({
        to: wallet.address,
        value: ethers.utils.parseEther("1.0")
      });


      //Check balance now
      const balance = await wallet.provider.getBalance(wallet.address);
      console.log(balance);

    })
  

  });

  
});
