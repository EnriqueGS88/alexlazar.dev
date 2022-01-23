---
title: "How I made a Discord bot that rewards users with crypto"
slug: "how-i-made-a-discord-bot-that-rewards-users-with-crypto"
excerpt: "This is a project I have built for Toucan.earth. It took me almost 20 days to build it and I figured documenting it would be helpful to other people."
coverImage:
  url: "/salina-turda.jpg"
  altText: "Turda Salt Mine"
  caption: "Turda Salt Mine"
date: "2022-01-23"
category: "Case Study"
readingTime: "10 min"
---

A while ago I wanted to contribute to [Toucan.earth](https://toucan.earth) in a hope that my contribution will show enough skill to get me [a full-time position](/posts/why-i-quit-freelancing).

The team thought it would be cool if I built a discord bot that rewards users with our own "Praise Token". They also pointed me to [Collab.land](https://collab.land)

## What is Collab.land?

Collab.land is a bot that you can hook up to your discord channel, it requests the users to connect their crypto wallet then, based on the admin's config, it assigns roles based on the user's balance of the currency/token of your choice.

This means that you can make collab.land give admin roles to anyone that has over 10 ETH or you can have it give access to a private channel in the server to anyone that has over 100 of a token made by _you_.

So I got to making my first token. And I used ERC20 as a base.

## What is ERC20? 🪙

I'm assuming you are a programmer.

So, you know that if you code a Class you can have your Class extend another Class. This way it inherits all the properties and methods of the parent Class.

Well, every token you see out there is a smart contract which essentially is a Class. And a LOT of them extend [ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).

Including, but not limited to:

- LINK
- USDT
- SHIB
- and the token I've made

Why do this? For the same reason we extend classes in normal programming. To not reinvent the wheel.

## I did have to customise my token a bit 🧙🏻‍♂️

The contract for the [token I have created](https://github.com/lazaralex98/toucan-discord-praise-bot/blob/main/protocol/contracts/ToucanPraiseToken.sol) is largely quite simple. This token's name is TPT (Toucan Praise Token).

And, we can see the code right here:

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ToucanPraiseToken is ERC20 {
    uint public constant _INITIAL_SUPPLY = 30 * (10**18);
    constructor() ERC20("ToucanPraiseToken", "TPT") {
        _mint(msg.sender, _INITIAL_SUPPLY);
    }

    /**
    * @param _from the address that praises
    * @param _to the address to praise
    * @return true upon success
    *
    * Mints & sends praiseTokens to an address based on the senders balance
    */
    function praise(address _from, address _to) public returns (bool) {
        /**
         * Just making sure ppl can't praise themselves.
         */
        require(_from != _to, "Can't praise yourself");

        /**
        * It's important to think of your praiseToken balance as your reputation.
        */
        uint256 reputation = balanceOf(_from);

        /**
        * This makes the praise have a worth based on who praised.
        * If someone more reputable praises, then the praise will be worth more.
        * But I have also implement a minimum praiseWorth of 1 in case the person that praises has 0 balance.
        */
        uint256 praiseWorth;
        if (reputation < (10 * (10**18))) {
            praiseWorth = 1 * (10**18);
        } else {
            praiseWorth = reputation / 10;
        }


        /**
        * We make sure the person that praises doesn't lose any reputation.
        * Minting more, also lowers the value of each individual token, adding an element similar to 'decaying'
        */
        _mint(_to, praiseWorth);

        // TODO emit an event
        return true;
    }
}
```

I'd like to think that I made a pretty good job of commenting the code (and you also have [the GitHub link where you actually have colored code](https://github.com/lazaralex98/toucan-discord-praise-bot/blob/main/protocol/contracts/ToucanPraiseToken.sol)).

But, the basic idea of what is happening is: I have a token that has one extra custom method.

This method is named `praise()`. It takes 2 parameters (the address that praises and the address that is praised).

Side note: In crypto, your address is like your ID number or your IBAN. It looks like this `0x721F6f7A29b99CbdE1F18C4AA7D7AEb31eb2923B`.

The `praise()` method mints new TPT tokens based on how many the praiser has in his balance and sends them to the praise target.

I [deployed the token with Alchemy and Hardhat](https://docs.alchemy.com/alchemy/tutorials/deploy-your-own-erc20-token) on the Rinkeby Test Network, and that was that.

Now I had to dive deep into discord.js to actually build the discord bot that would call that `praise()` method.

## Building a Discord Bot 101 🤖

You can actually see [the code for the bot in its final form right here](https://github.com/lazaralex98/toucan-discord-praise-bot/tree/main/bot).

I'll explain the basics of building a discord bot, but not every nook and cranny of my bot. This way, you should be able to organize the code as you wish and create the commands you wish to have.

You first need to go the [Discord Dev Portal](https://discord.com/developers/applications). You click on "New Application", give it a name and BAM.

You have a bot. Kinda. There's still a lot to do...

If you go to the Bot tab, you'll see a "Copy" and a "Regenerate" button.

![Discord Bot Token](/discord-bot-token.png)

The "Copy" button will give you your a token which you will use in your code to actually do stuff.

Now you need to invite your bot to your server. I suggest you make a test server first to play with your bot before you deploy it live.

You got to the OAuth2 > URL Generator tab. In the "scopes" area you check "bot" and then you have all these options:

![Discord Bot Permissions](/discord-bot-permissions.png)

Pick the ones that make sense for your bot (depends on what you want the bot to do), but 2 you will most likely need are:

- Read Messages/View Channels
- Send Messages

This will give you a URL that you can use to authorise the bot on your server.

## Now, we can finally start coding this bot 👨🏻‍💻

The one library you will need is [Discord.js](https://discord.js.org/) (or the equivalent for your programming language).

This is the most basic bot you could probably make:

```javascript
const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.content === "Hey bot") {
    msg.reply("Hey friend!");
  }
});

client.login(process.env.TOKEN);
```

It just replies with "Hey friend!" whenever someone says "Hey bot".

Every "client.on()" is an event listener that you can use to have your bot run code.

Another library you probably want to use is [discord-command-parser](https://openbase.com/js/discord-command-parser/documentation).

It helps you parse commands like "!help". This is a basic example:

```javascript
import { parse, ParsedMessage } from "discord-command-parser";
const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

const PREFIX = "!";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  const parsed = parse(msg, PREFIX);
  if (!parsed.success) return;

  if (parsed.command === "help") {
    msg.reply("I'm here to help");
  }
});

client.login(process.env.TOKEN);
```

But you could use it to parse a more complex command like `!praise @Alex for making this bot` (which is [exactly what I did](https://github.com/lazaralex98/toucan-discord-praise-bot/blob/main/bot/src/commandHandlers/handlePraiseCommand.ts)).

You'll have to dive into the DOCS, but you can write code where the bot will take this message, understand it's a praise command, extract the praise target (@Alex) and understand the praise reason (for making this bot).

## The first real issue I ran into 💣

After I've coded the bot such that it's able to understand when a praise is happening I had to code the smart contract interaction where the bot would call the praise() method we talked about earlier.

There is a problem though. I thought that after someone connects their wallet to Collab.land I can share their address from that to my bot so I know where to mint & transfer the new tokens upon a praise.

Nope...

After consulting with the guys at Toucan.earth I've decided to simply do away with Collab.land and create [my own auth & wallet connection system](https://github.com/lazaralex98/toucan-discord-praise-bot/tree/main/client).

It's not a very complex thing. It's a Next.js app that uses [Supabase](https://supabase.com/docs) to offer Discord-based authentication.

Then I use [ethers.js](https://docs.ethers.io/v5/) to connect to the users wallet and I save the discord_id - wallet_address connection in a Supabase dB table called "discordToWalletConnections" with the following schema:

![Discord To Wallet Connections Schema](/discordToWalletConnectionSchema.png)

It's all deployed on Vercel.

Side note: [I really like TypeScript + Next.js + Vercel + Supabase](https://www.youtube.com/watch?v=TW6llXub8h4). It makes so many things so easy, especially compared to my days of coding in plain PHP. But you could have used anything else.

## With authentication out of the way

The idea is that people will use the !help or the !connect commands in the discord chat, which will have the bot direct them to [my auth system](https://toucan-discord-praise-bot.vercel.app/).

There they will connect their discord and their wallet, and now my bot can use the Supabase client to access these connections.

Obviously there is a lot of error handling implemented, like:

- you can't praise yourself
- you can't praise if either you or the target haven't connected your wallets/discords
- you haven't used the correct format for the command
- any unexpected errors when querying Supabase, using Discord.js

Side note: Obviously all this is easier said then done as seen by some of my commit messages which include "FML", "x" and even some reverted commits. 😅

But if everything is fine the bot will attempt to call the `praise()` method from the smart contract.

## My second big issue...

... happened when trying to implement [the smart contract interaction](https://github.com/lazaralex98/toucan-discord-praise-bot/blob/main/bot/src/utils/callPraise.ts).

You can take a look at the link above, or here:

```javascript
import { Message, User } from "discord.js";
import { ethers } from "ethers";
import discordToWalletConnection from "./ifcDiscordtoWalletConnection";
import * as artifact from "../utils/ToucanPraiseToken.json";
require("dotenv").config();

/**
 * @param msg will be used for the success console.log
 * @param target will be used for the success console.log
 * @param praiserWalletConnection will be used for the address of the praiser
 * @param praiseTargetWalletConnection will be used for the address of the praiseTarget
 * @returns the praiseTxn object (which should have a status === 1 if successful), or null if some error happened
 */
const callPraise = async (
  msg: Message,
  target: User,
  praiserWalletConnection: discordToWalletConnection,
  praiseTargetWalletConnection: discordToWalletConnection
) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.INFURA_RINKEBY_URL,
      4
    );
    let wallet = new ethers.Wallet(
      process.env.RINKEBY_PRIVATE_KEY || "",
      provider
    );
    const signer = provider.getSigner(process.env.OWNER_ADDRESS_RINKEBY);
    wallet = wallet.connect(provider);

    const tptContract = new ethers.Contract(
      process.env.RINKEBY_CONTRACT_ADDRESS || "",
      artifact.abi,
      wallet
    );

    const praiserAddress = praiserWalletConnection.wallet_address;
    const praiseTargetAddress = praiseTargetWalletConnection.wallet_address;
    const praiseTxn = await tptContract.praise(
      praiserAddress,
      praiseTargetAddress,
      {
        value: ethers.utils.parseEther("0"),
        gasLimit: 300000,
      }
    );
    console.log(
      `Sending praise (${msg.author.id} to ${target.id})(these are discord IDs) with transaction hash:`,
      praiseTxn.hash
    );
    return await praiseTxn.wait();
  } catch (error) {
    console.error(`Error interacting with the contract, callPraise():`, error);
    return null;
  }
};

export default callPraise;
```

In it's final form the function uses a JsonRpcProvider with an [Infura](https://infura.io) endpoint.

You see, I was used to interacting with smart contracts on the frontend with ethers which is fairly straight forward.

I never have interacted with a smart contract on the backend before. But after thoroughly reading the [ethers.js documentation](https://docs.ethers.io/v5/), googling around for other people that had similar issues and, just generally, banging my head on the wall...

I figured out how to actually implement a JsonRpcProvider with Infura and interact with the smart contract on the backend.

In hindsight, it's not that complex tbh. 🤷🏻‍♂️

## Where we are at today

After all this (again, easier said than done 😂) I had a real bot with a real token where you could connect your wallet, call "!praise @alex for building this bot" and the target would receive some freshly-minted TPT (Toucan Praise Token).

BTW: I have deployed the bot on [Heroku](https://heroku.com).

I have created my very first, actually used in production (soon), crypto token 🤯😱.

What's next?

Well, the app is well tested and we're soon to deploy it on Polygon for the whole server to actually use which is going to be nice.

Among a bunch of small TODOs (which you can find in the codebase), one bigger thing I'd like to do is have the Discord bot reward people with nicknames, roles or access to private channels based on their TPT balance.

But, we'll see.

The very good thing for me is that the guys at Toucan really liked what I did and I have a call with them tomorrow to discuss a full-time position.

Sooo, the goal I set [here](/posts/why-i-quit-freelancing) might have come to fruition by the time you read this article.

Yay! 🎉
