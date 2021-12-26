const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const { expectRevert } = require('@openzeppelin/test-helpers'); 

const provider = waffle.provider;

// an async function.
describe("Wallet contract", function () {


  let Wallet;
  let wallet;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const oneEther = ethers.utils.parseEther("1.0");

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
    beforeEach(async function () {
       // Send 1 ether to an ens name.
      const tx = await addr1.sendTransaction({
        to: wallet.address,
        value: oneEther
      });
  
    });

    it("Funds can be sent to the contract and balance updated.", async function(){
      //Check balance now
      const balance = await wallet.provider.getBalance(wallet.address);
      expect(balance).to.equal(oneEther)
    });

    it("Check that the user who sent the money gets updated before the withdrawl occurs.", async function(){
        const currentBalance = await wallet.getCurrentDeposits(addr1.address);
        expect(currentBalance).to.equal(oneEther);

        const historialBalance = await wallet.getOverallDeposits(addr1.address);
        expect(historialBalance).to.equal(oneEther);
        
    });

  });
    describe("Withdrawing", function () {
      
      beforeEach(async function () {
        // Send 1 ether to an ens name.
        const tx = await addr1.sendTransaction({
          to: wallet.address,
          value: oneEther
        });
    
      });


      it("Check that withdraw works as intended.", async function(){

        await expect((await wallet.withdrawFunds())).to.emit(wallet, 'withdraw').withArgs(owner.address, oneEther);

      })

      it("Check that withdraw can only be called by owner.", async function(){

        //await expectRevert(wallet.connect(addr1).withdrawFunds(),"Ownable: caller is not the owner");
        const tx = wallet.connect(addr1).withdrawFunds();
        await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");  
      })



      it("Check that withdraw resets the current balances mapping")
    })

    
  
});
