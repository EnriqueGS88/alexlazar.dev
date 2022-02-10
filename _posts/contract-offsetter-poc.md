---
title: "Contract Offsetter POC"
slug: "contract-offsetter-poc"
excerpt: "A proof of concept of a contract that can offset it's own footprint (CO2 emmissions)."
coverImage:
  url: "/alba-iulia.jpg"
  altText: "Cetatea Alba, Alba Iulia"
  caption: "Cetatea Alba, Alba Iulia"
date: "2022-02-10"
category: "Case Study"
readingTime: "20 min"
---

# Carbon Offsetting 101

I won't dive deep in to this, [Toucan.earth](https://toucan.earth) has material explaining this more in depth, but I'll give you the quick explanation:

Whenever you use electricity, you (likely) generate a certain amount of CO2 (or other greenhouse) gas. This happens because a lot of the electricity of the world is generated from coal.

When you offset carbon, in the roughest & simplest of terms, you pay for someone else to emit less so as to cover for the fact that you emited X CO2.

Since blockchain uses computing power (and electricity), whenever you send someone ETH/MATIC or otherwise interact with a smart contract, **that generates CO2**.

Which brings us to the subject at hand...

# How can you offset the CO2 used by a contract

In this article I will present you [a contract that can offset itself](https://github.com/lazaralex98/eco-1/blob/main/contracts/ContractOffsetterPOC.sol). You can extend your contracts with it or inspire yourself from it.

(In a future article I will present a contract that can offset other contracts and will make it infinitely easier for you to offset your footprint)

This contract is still 'rough around the edges' and has a few caveats that I'll address later.

But let's describe it.

Theoretically, the main/first functionality of this contract is to deposit & redeem BCT for TCO2.

As this contract is used, the contract calculates the footprint of each user (meaning the CO2 that was emitted when using this contract).

For the moment, we are using a hardcoded 0,00000036 TCO2 per transaction to calculate the footprint. The goal is to eventually get a real, peer-reviewed, calculation in place.

At any point in time, the user can check the footprint created by his using of this contract. And he can also offset that footprint (by retiring TCO2).

When the user offsets, he can choose between offsetting ALL his footprint or an amount of his choice. He can't offset more than his footprint.

If the user already has TCO2 in his wallet, he has the possibility to deposit that to this contract in order to retire it and offset the footprint.

It should be noted, everytime you deposit, or redeem, or offset or do any interaction with this contract: that adds to the footprint.

## Caveat #1: You must know how many transactions happen with each method

Because, for now, our only means of calculating footprint per usage is going by that 0,00000036 TCO2 per transaction number... we are forced to know how many transactions happen for each method in the contract that we want to offset.

You'll see what that means as we dive into the code.

## Caveat #2: The emmissions factor

The number (0,00000036 TCO2 per transaction) has been reached as follows:

1. Polygon [claims that their average transaction uses 0.0003 kg of CO2](https://blog.polygon.technology/why-eco-friendly-projects-choose-polygon/).
2. Each TCO2 means 1 tonne of CO2 so do the math and you have 0,0000003 TCO2 per transaction.
3. We added 20% on top of that as a safety number and we have 0,00000036 TCO2 per transaction.

They do not cite any research (as far as I know) to prove that number, but we think Polygon should be trustworthy.

And, given that we have nothing better (yet), this number will have to do for now.

# Let's dive into the code

You can go to [the github](https://github.com/lazaralex98/eco-1/blob/main/contracts/ContractOffsetterPOC.sol) and follow along if you prefer that to the blog.

I'd like to believe that the code is pretty well commented that you could figure stuff out there.

Still, let's take each (critical) part one at a time and attempt to further explain everything.

## addFootprint()

```solidity
mapping(address => uint256) public footprints;

function addFootprint(uint256 _transactions) private {
    footprints[msg.sender] += 360000000000 * _transactions;
}
```

First, the mapping, gives us a way to store a number (representing the footprint) for each user. This is the footprint that the user has created when interacting strictly with this contract.

I'm not sure who reads this, but if you are a beginner, a mapping is simply a collection of key:value pairs. When it's initialized, all keys exist and they have a value of 0 or false (technically not correct, but is an easy explanation). And you can assign/update values as you go.

The following method, which can only be used by the contract itself, takes in (as a parameter) the number of transactions that you want to calculate.

(As I said one caveat is that you have to know how many transactions you've done)

Based on the number of transactions, it calculates the footprint (using the number I mentioned above). The reason why you see 360000000000 and not 0,00000036 is because of how Solidity works.

(For beginners: Solidity has no decimals. Each unit represents an 18th of what would be a unit in JavaScript, for example. So, 1 in JavaScript is actually 1 \* 10\*\*18 in Solidity. 1 ETH is actually equal to 1 \* 10\*\*18 ethers in Solidity.)

## checkTokenEligibility()

```solidity
address public bctAddress = 0xf2438A14f668b1bbA53408346288f3d7C71c10a1;
address public contractRegistry = 0x6739D490670B2710dc7E79bB12E455DE33EE1cb6;

// @description checks if token to be deposited is eligible for this pool
// @param _erc20Address address to be checked
function checkTokenEligibility(address _erc20Address)
private
view
returns (bool)
{
// check if token is a TCO2
bool isToucanContract = IToucanContractRegistry(contractRegistry)
    .checkERC20(_erc20Address);
if (isToucanContract) return true;

// check if token is BCT
if (_erc20Address == bctAddress) return true;

// nothing matches, return false
return false;
}
```

First we see that I stored the BaseCarbonTonne contract address and the TCO2 contract registry address.

The function takes 1 parameter which represents the token you want checked for eligibility (to be used by this contract).

In the function, we use the ToucanContractRegistry (a contract that knows all TCO2 contracts) to check if the given token is a TCO2.

Then we check if the token address matches the BaseCarbonTonne address.

If either of these are true, the method returns true signifying that the token is eligible.

Otherwise, we return false.

## deposit()

```solidity
using SafeERC20 for IERC20;

// user => (token => amount)
mapping(address => mapping(address => uint256)) public balances;

// @description deposit tokens from use to this contract
// @param _erc20Address token to be deposited
// @param _amount amount to be deposited
function deposit(address _erc20Address, uint256 _amount) public {
// update footprint to account for this function and its transactions
addFootprint(2);

bool eligibility = checkTokenEligibility(_erc20Address);
require(eligibility, "Can't deposit this token");

// use token's contract to do a safe transfer from the user to this contract
// remember that the user has to approve this in the frontend
IERC20(_erc20Address).safeTransferFrom(msg.sender, address(this), _amount);

// add amount of said token to balance of this user in this contract
balances[msg.sender][_erc20Address] += _amount;

emit Deposited(msg.sender, _erc20Address, _amount);
}
```

In this section of the code, we have a nested mapping used to hold a balance sheet of each user's token balance within this contract.

Simpler terms? Each user (the first address) has a mapping of the token address and the amount he holds in this pool.

You can access it like `balances[user_address][token_address]` and it would return the amount of [insert token] that [insert user] has within this contract.

Next up, the deposit function. This is used so that you, as a user, can deposit tokens to this pool. As params it takes the address of the token you want to deposit and the amount you want deposited.

Let's see how it does that.

We first update the footprint (knowing that this method will have 2 transactions).

We check the eligibility of the token (we discussed how this works above).

And we do a `safeTransferFrom()`. This is a method from the `SafeERC20.sol` contract and it takes in as parameters a from address, a to address and a uint256 representing the value to transfer.

**VERY IMPORTANT!** You should know that for the safeTransferFrom method to work, you need to approve this contract to use your token on the frontend. This is how it could look on the frontend (JS):

```javascript
await (
  await tokenContract.approve(cop.address, ethers.utils.parseEther(amount))
).wait();
```

`tokenContract` being the contract of the token you want to deposit, `cop` being the Contract Offsetter POC, and the `amount` is the amount you want to approve.

Another thing that should be of note is that, in the very beggining I had this line `using SafeERC20 for IERC20;` which I didn't yet explain. This (and importing the contract) is what gives us the safeTransferFrom method.

_Side note_: I'll talk about all the imported contracts later. Don't worry yet.

Once the transfer happens, we update the balance sheet of this contract in this line `balances[msg.sender][_erc20Address] += _amount;` and we emit an event. (I'll also walk through the events later)

## redeemBCT()

```solidity
// @description redeems some BCT from contract balance for a chosen TCO2 token
// @param _desiredTCO2 the address of the TCO2 you want to receive
// @param _amount the amount of BCT you want to redeem for TCO2
function redeemBCT(address _desiredTCO2, uint256 _amount) public {
  // update footprint to account for this function and its transactions
  addFootprint(3);

  require(
    _amount <= balances[msg.sender][bctAddress],
    "You don't have enough BCT in this contract."
  );

  bool eligibility = checkTokenEligibility(_desiredTCO2);
  require(eligibility, "Can't redeem BCT for this token.");

  // prepare/format params for BCT.retireMany() method
  address[] memory tco2Addresses = new address[](1);
  uint256[] memory amounts = new uint256[](1);
  tco2Addresses[0] = _desiredTCO2;
  amounts[0] = _amount;

  // send BCT, receive TCO2
  BaseCarbonTonne(bctAddress).redeemMany(tco2Addresses, amounts);

  // modify balance sheets of this contract
  balances[msg.sender][bctAddress] -= _amount;
  balances[msg.sender][_desiredTCO2] += _amount;

  emit Redeemed(msg.sender, _desiredTCO2, _amount);
}
```

This method is supposed to take the BCT you deposited (an amount of your choice), burn it and give you back (in the contract's balance sheet) TCO2 tokens.

That's called redeeming BCT for TCO2. I think my colleagues at Toucan do a good job of explaining how all the process [here](https://docs.toucan.earth/protocol/pool/pools).

Back to the method, it takes in the address of the TCO2 you want to receive & the amount of BCT you want to redeem as parameters.

Half of this method you'll already understand if you read the rest of the article with attention. You know what `addFootprint()` does, you know how checking token eligibility works and the line requiring that the user has enough BCT in this contract is pretty self explanatory (the person has to deposit BCT first, in order to redeem it).

So, let's explain what's new.

This method takes the parameters and formats them in arrays so they may be passed on to the `redeemMany()` method of the BaseCarbonTonne contract.

We call the `redeemMany()` method to redeem your deposited BCT for the TCO2 of your choice.

_Side note_: Technically, you could adapt `redeemBCT()` of the `ContractOffsetterPOC` contract to be able to redeem BCT for multiple TCO2s types at the same time.

Lastly we update the balance sheet and emit an event.

## selfOffset()

```solidity
// @description retire TCO2 so that you offset ALL the carbon used by this contract
// @param _tco2Address address of the TCO2 you want to retire
function selfOffset(address _tco2Address) public {
  // update footprint to account for this function and its transactions
  addFootprint(2);

  bool eligibility = checkTokenEligibility(_tco2Address);
  require(eligibility, "Can't retire this token.");

  require(
    footprints[msg.sender] <= balances[msg.sender][_tco2Address],
    "You don't have enough of this TCO2 (in the contract)."
  );

  // use the TCO contract to retire TCO2
  ToucanCarbonOffsets(_tco2Address).retire(footprints[msg.sender]);

  // reduce amount of TCO2 in the balance sheet
  balances[msg.sender][_tco2Address] -= footprints[msg.sender];

  uint256 amountOffset = footprints[msg.sender];

  // reset the footprint
  footprints[msg.sender] = 0;

  emit Offset(msg.sender, _tco2Address, amountOffset, footprints[msg.sender]);
}

// @description retire TCO2 so that you offset a certain amount of the carbon used by this contract
// @param _tco2Address address of the TCO2 you want to retire
// @param _amount how much CO2 you want to offset
function selfOffset(address _tco2Address, uint256 _amount) public {
  // update footprint to account for this function and its transactions
  addFootprint(2);

  bool eligibility = checkTokenEligibility(_tco2Address);
  require(eligibility, "Can't retire this token.");

  require(
    _amount <= balances[msg.sender][_tco2Address],
    "You don't have enough of this TCO2 (in the contract)."
  );

  require(
    _amount <= footprints[msg.sender],
    "You can't offset more than your footprint."
  );

  // use the TCO contract to retire TCO2
  ToucanCarbonOffsets(_tco2Address).retire(_amount);

  // reduce amount of TCO2 in the balance sheet
  balances[msg.sender][_tco2Address] -= _amount;

  // reduce the footprint
  footprints[msg.sender] -= _amount;

  emit Offset(msg.sender, _tco2Address, _amount, footprints[msg.sender]);
}
```

The `selfOffset()` method is made to use the `retire()` method of the `ToucanCarbonOffsets` so that it burns TCO2 tokens which equates to offseting CO2 emmissions.

Now, you are seeing 2 methods here because we want the `selfOffset()` to be able to do 2 things:

1. if you only provide a tco2 address and no amount, it will attempt to offset the whole footprint.
2. if you do provide an amount, it will attempt to offset the amount of your choice instead.

Both add to the footprint initially (to account for the footprint you generate when you do these transactions), then they check token eligibility and other basic things like the user having enough TCO2 on the balance sheet or the user not attempting to offset more than his footprint.

Once the checks are passed, the method retires the TCO2 chosen by the user, changes the balance sheet AND resets the footprint.

## imports

These right here are all the contracts used, one way or another, in the making of this contract.

```solidity
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./CO2KEN_contracts/ToucanCarbonOffsets.sol";
import "./CO2KEN_contracts/pools/BaseCarbonTonne.sol";
import "./CO2KEN_contracts/IToucanContractRegistry.sol";
```

## events

And, to finish up, these are the events.

```solidity

  event Deposited(
    address depositor,
    address erc20Address,
    uint256 amountDeposited
  );
  event Redeemed(
    address redeemer,
    address receivedTCO2,
    uint256 amountRedeemed
  );
  event Offset(
    address offsetter,
    address retiredTCO2,
    uint256 amountOffset,
    uint256 remainingFootprint
  );
```

# Conclusion

This is about how it all works.

You can interact with this contract to offset your use of it. You can re-use the code from it in your own contracts, or, even, extend your contracts with this one to help you offset them.

As I mentioned in the beginning, I will make a contract + dapp (and an article) that will make it amazingly easy for you to offset other (your) contracts or even the footprint of your wallet.

What you see here is more of a proof of concept than a fully perfect solution.
