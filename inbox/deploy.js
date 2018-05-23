const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
// the api is from infura api keys
const provider = new HDWalletProvider(
    //account mnemonic
    'trigger detect ranch column apology art winner mix tank twin nuclear buffalo',
    'https://rinkeby.infura.io/xOnzjjj8adJh8rkHkNTT');

const web3 =  new Web3(provider);

let inbox;
const deploytask = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const inboxContract = new web3.eth.Contract(
                  JSON.parse(interface))
        .deploy({
            data: '0x' + bytecode,
            arguments : ['Hi there']})

    console.log(inboxContract);
    const inboxTransaction = await inboxContract.send({
        from: accounts[0],
        gas : '1000000'});
    console.log(inboxTransaction);

    console.log('deployed contract to ', inboxTransaction.options.address);
    inboxTransaction;
};


const result =  await deploytask();

/*
https://ethereum.stackexchange.com/questions/47411/unhandled-promise-rejectiongas-limit-when-deploying-contract-to-rinkeby-using



I added '0x' + in front of the bytecode in the .deploy to make it Work.

.deploy({ data: '0x' + bytecode, arguments: ['Hi there!'] })

If there's no '0x' the bytecode will convert the whole string to hexadecimal, which will be double the size and throw the gas error.

I also re-installed truffle wallet provider using

$ sudo uninstall truffle-hdwallet-provider

and then

$ sudo install --save truffle-hdwallet-provider when inside my project folder.

I also updated git by following this tutorial

This answer is inspired from the answer HERE

*/
