# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
# SmartContractWallet

This project is designed to be a smart contract that holds ether from different users who deposit. The ower 

## Installation

Use the package manager [npm](https://nodejs.org/en/download/) to install SmartContractWallet.

```bash
npm install
```

## Usage
To run tests locally using hardhat run 
```node
npx hardhat test
```

To deploy to local blockchain and deliver contract run
```node
npx hardhat node;
```
Along with this script in a separate terminal
```node
npx hardhat run scripts/deploy.js --network localhost
```